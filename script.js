const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');
const width = 8;

var lives_left = 5;
let playerGo; // denotes player turn
let startPositionId = -1;
let draggedElement;

let taken, takenByOpponent;
let targetId, startId, idInterval;
let startRow, startCol, targetRow, targetCol;
let rowInterval, colInterval;

let allSquares;

function move_to_index(move) {
    const x = char_to_index(move[0]); // Column (a-h -> 0-7)
    const y = parseInt(move[1], 10);
    index = (8 * (y - 1)) + x;
    return index;
}

function init() {
    createBoard();

    moves_str = current_puzzle_info['Moves'];
    moves = moves_str.split(' ');
    first_move = moves[0];
    first_move_start = first_move[0] + first_move[1];
    if (startPiecesColor[move_to_index(first_move_start)] == 'W') {
        playerGo = 'white';
    } else {
        playerGo = 'black';
    }

    playerDisplay.textContent = playerGo;

    allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', dragDrop);
    });
}

function dragStart(e) {
    draggedElement = e.target;
    startPositionId = draggedElement.parentNode.getAttribute('square-id');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();

    correctGo = draggedElement.firstChild.classList.contains(playerGo + '-piece');
    opponentGo = playerGo === 'black' ? 'white' : 'black';
    taken = e.target.classList.contains('piece');
    takenByOpponent = e.target.firstChild?.classList.contains(opponentGo + '-piece');

    if (correctGo) {
        if (isValidMove(e.target)) {
            notifyPlayer('', false);
            if (!taken) {
                e.target.append(draggedElement);
                if (!checkWin()) changePlayer();
            } else if (takenByOpponent) {
                document.getElementById(`${playerGo}-captures`).innerHTML += `<div class="captured-piece">${e.target.innerHTML}</div>`;
                e.target.parentNode.append(draggedElement);
                e.target.remove();
                if (!checkWin()) changePlayer();
            } else notifyPlayer('You can not go there!');
        } else notifyPlayer('You can not go there!');
    }
}

function notifyPlayer(message, useTimer = true) {
    infoDisplay.textContent = message;
    if (useTimer) setTimeout(() => { infoDisplay.textContent = '' }, 2000);
}

function changePlayer() {
    playerGo = playerGo === 'black' ? 'white' : 'black';
    playerDisplay.textContent = playerGo;
}

const validMoves = {
    'pawn': () => {
        let direction = 1;
        if (playerGo === 'black') {
            startRow = width - 1 - startRow;
            targetRow = width - 1 - targetRow;
            direction = -1;
        }
        const blockedByPiece = Boolean(document.querySelector(`[square-id="${startId + direction * width}"]`).firstChild);

        return targetRow > startRow && ((!taken && !blockedByPiece && startRow === 1 && idInterval === 2 * width) || (!taken && idInterval === width) || (takenByOpponent && (idInterval === width - 1 || idInterval === width + 1)));
    },
    'rook': () => {
        if ((rowInterval !== 0 && colInterval === 0) || (rowInterval === 0 && colInterval !== 0)) {
            for (let i = Math.abs(rowInterval ? rowInterval : colInterval) - 1; i > 0; --i) {
                const id = rowInterval ? startId + Math.sign(rowInterval) * i * width : startId + Math.sign(colInterval) * i;
                if (Boolean(document.querySelector(`[square-id="${id}"]`).firstChild)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    'bishop': () => {
        if (Math.abs(rowInterval) === Math.abs(colInterval) && rowInterval !== 0) {
            for (let i = Math.abs(rowInterval) - 1; i > 0; --i) {
                if (Boolean(document.querySelector(`[square-id="${startId + Math.sign(rowInterval) * i * width + Math.sign(colInterval) * i}"]`).firstChild)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    'knight': () => {
        return (Math.abs(rowInterval) === 2 && Math.abs(colInterval) === 1) || (Math.abs(colInterval) === 2 && Math.abs(rowInterval) === 1);
    },
    'queen': () => {
        return (validMoves['rook']() || validMoves['bishop']());
    },
    'king': () => {
        return (idInterval === width || idInterval === width - 1 || idInterval === width + 1 || idInterval === 1);
    }
}

function isValidMove(target) {
    targetId = Number(target.getAttribute('square-id') || target.parentNode.getAttribute('square-id'));
    startId = Number(startPositionId);
    idInterval = Math.abs(targetId - startId);

    startRow = Math.floor(startId / width);
    startCol = startId % width;
    targetRow = Math.floor(targetId / width);
    targetCol = targetId % width;

    rowInterval = targetRow - startRow;
    colInterval = targetCol - startCol;

    return validMoves[draggedElement.id]();
}

function checkWin() {
    const kings = document.querySelectorAll('#gameboard #king');

    if (kings.length < 2) {
        notifyPlayer(`${playerGo} player wins`, false);
        playerDisplay.parentElement.textContent = '';
        playerGo = '';
        document.querySelectorAll('.piece').forEach(piece => {
            piece.setAttribute('draggable', false);
        });

        return true;
    }

    return false;
}

init();
