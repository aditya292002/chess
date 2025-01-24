


/// pieces
const pieces_ = {
    'king': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M224 0c17.7 0 32 14.3 32 32V48h16c17.7 0 32 14.3 32 32s-14.3 32-32 32H256v48H408c22.1 0 40 17.9 40 40c0 5.3-1 10.5-3.1 15.4L368 400H80L3.1 215.4C1 210.5 0 205.3 0 200c0-22.1 17.9-40 40-40H192V112H176c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V32c0-17.7 14.3-32 32-32zM38.6 473.4L80 432H368l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H54.6C42.1 512 32 501.9 32 489.4c0-6 2.4-11.8 6.6-16z"/></svg>',
    'queen': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 0a56 56 0 1 1 0 112A56 56 0 1 1 256 0zM134.1 143.8c3.3-13 15-23.8 30.2-23.8c12.3 0 22.6 7.2 27.7 17c12 23.2 36.2 39 64 39s52-15.8 64-39c5.1-9.8 15.4-17 27.7-17c15.3 0 27 10.8 30.2 23.8c7 27.8 32.2 48.3 62.1 48.3c10.8 0 21-2.7 29.8-7.4c8.4-4.4 18.9-4.5 27.6 .9c13 8 17.1 25 9.2 38L399.7 400H384 343.6 168.4 128 112.3L5.4 223.6c-7.9-13-3.8-30 9.2-38c8.7-5.3 19.2-5.3 27.6-.9c8.9 4.7 19 7.4 29.8 7.4c29.9 0 55.1-20.5 62.1-48.3zM256 224l0 0 0 0h0zM112 432H400l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H86.6C74.1 512 64 501.9 64 489.4c0-6 2.4-11.8 6.6-16L112 432z"/></svg>',
    'knight': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M96 48L82.7 61.3C70.7 73.3 64 89.5 64 106.5V238.9c0 10.7 5.3 20.7 14.2 26.6l10.6 7c14.3 9.6 32.7 10.7 48.1 3l3.2-1.6c2.6-1.3 5-2.8 7.3-4.5l49.4-37c6.6-5 15.7-5 22.3 0c10.2 7.7 9.9 23.1-.7 30.3L90.4 350C73.9 361.3 64 380 64 400H384l28.9-159c2.1-11.3 3.1-22.8 3.1-34.3V192C416 86 330 0 224 0H83.8C72.9 0 64 8.9 64 19.8c0 7.5 4.2 14.3 10.9 17.7L96 48zm24 68a20 20 0 1 1 40 0 20 20 0 1 1 -40 0zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H409.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L384 432H64L22.6 473.4z"/></svg>',
    'bishop': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M128 0C110.3 0 96 14.3 96 32c0 16.1 11.9 29.4 27.4 31.7C78.4 106.8 8 190 8 288c0 47.4 30.8 72.3 56 84.7V400H256V372.7c25.2-12.5 56-37.4 56-84.7c0-37.3-10.2-72.4-25.3-104.1l-99.4 99.4c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6L270.8 154.6c-23.2-38.1-51.8-69.5-74.2-90.9C212.1 61.4 224 48.1 224 32c0-17.7-14.3-32-32-32H128zM48 432L6.6 473.4c-4.2 4.2-6.6 10-6.6 16C0 501.9 10.1 512 22.6 512H297.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L272 432H48z"/></svg>',
    'rook': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M32 192V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V88c0 4.4 3.6 8 8 8h32c4.4 0 8-3.6 8-8V48c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16V192c0 10.1-4.7 19.6-12.8 25.6L352 256l16 144H80L96 256 44.8 217.6C36.7 211.6 32 202.1 32 192zm176 96h32c8.8 0 16-7.2 16-16V224c0-17.7-14.3-32-32-32s-32 14.3-32 32v48c0 8.8 7.2 16 16 16zM22.6 473.4L64 432H384l41.4 41.4c4.2 4.2 6.6 10 6.6 16c0 12.5-10.1 22.6-22.6 22.6H38.6C26.1 512 16 501.9 16 489.4c0-6 2.4-11.8 6.6-16z"/></svg>',
    'pawn': '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.5 224c29.2-18.4 48.5-50.9 48.5-88c0-57.4-46.6-104-104-104S56 78.6 56 136c0 37.1 19.4 69.6 48.5 88H96c-17.7 0-32 14.3-32 32c0 16.5 12.5 30 28.5 31.8L80 400H240L227.5 287.8c16-1.8 28.5-15.3 28.5-31.8c0-17.7-14.3-32-32-32h-8.5zM22.6 473.4c-4.2 4.2-6.6 10-6.6 16C16 501.9 26.1 512 38.6 512H281.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L256 432H64L22.6 473.4z"/></svg></div>'
};



let selectedPiece = null;   
let validMoves = [];


function createBoard() {
    const boardElement = document.getElementById('chess-board');
    boardElement.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const square = document.createElement('div');
            square.className = `square ${(i + j) % 2 === 0 ? 'white' : 'black'}`;
            square.dataset.row = i;
            square.dataset.col = j;

            const piece = board[i][j];
            if(piece.piece != null) {
                let html_to_add = null;
                if(board[i][j]['color'] === 'white')
                    html_to_add = `<span class="piece white_piece">${pieces_[piece.piece]}</span>`;
                if(board[i][j]['color'] === 'black')
                    html_to_add = `<span class="piece black_piece">${pieces_[piece.piece]}</span>`;
                square.innerHTML = html_to_add;
            }

            square.addEventListener('click', handleSquareClick);
            boardElement.appendChild(square);
        }
    }
}

function handleSquareClick(event) {
    const row = parseInt(event.currentTarget.dataset.row);
    const col = parseInt(event.currentTarget.dataset.col);
    clearHighlights();

    if (selectedPiece) {
        if (validMoves.some(move => move.row === row && move.col === col)) {
            movePiece(selectedPiece, { row, col });
            move_ind += 1;

            if (move_ind < moves.length) {
                const compMoveStart = algebraic_notation_to_index(moves[move_ind].slice(0, 2));
                const compMoveEnd = algebraic_notation_to_index(moves[move_ind].slice(2, 4));
                computerMakeMove(compMoveStart, compMoveEnd);

                const htmlElementComputer = document.getElementById("computer-move-show");
                htmlElementComputer.innerHTML = `Computer made the move ${moves[move_ind]}`;

                const square_start = document.querySelector(`[data-row="${compMoveStart[0]}"][data-col="${compMoveStart[1]}"]`);
                square_start.classList.add('computer-move');
                
                const square_end = document.querySelector(`[data-row="${compMoveEnd[0]}"][data-col="${compMoveEnd[1]}"]`);
                square_end  .classList.add('computer-move');
                
                move_ind += 1;
            }
            else {
                const htmlElementComputer = document.getElementById("computer-move-show");
                htmlElementComputer.innerHTML = "Solved"
                document.getElementById('reset-button').style.display = 'block';
                let score_p = document.getElementById('score');
                score += parseInt(puzzle['RatingDeviation'], 10);
                score_p.innerHTML = ""
                score_p.innerHTML = "Score : " + score
            }

            selectedPiece = null;
            validMoves = [];
            // currentTurn = currentTurn === 'black' ? 'white' : 'black';
            document.getElementById('current-turn').textContent = `Current Turn: ${currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)}`;
        } else {
            selectedPiece = null;
        }
    } else {
        console.log("else")
        console.log(currentTurn)
        const piece = board[row][col];
        console.log(piece)
        if (piece.piece && piece.color === currentTurn) {
            selectedPiece = { row, col };
            event.currentTarget.classList.add('selected');
            validMoves = getValidMoves(row, col);
            highlightValidMoves();  
        }
    }
}

function getValidMoves(row, col) {
    const piece = board[row][col];
    const moves = [];

    function addMove(newRow, newCol) {
        if (isValidPosition(newRow, newCol)) {
            const target = board[newRow][newCol];
            if (!target.piece || target.color !== piece.color) {
                moves.push({ row: newRow, col: newCol });
                return !target.piece; // return true if space is empty (for continuing sliding moves)
            }
        }
        return false;
    }

    function addSlidingMoves(directions) {
        directions.forEach(([dRow, dCol]) => {
            let currRow = row + dRow;
            let currCol = col + dCol;
            while (isValidPosition(currRow, currCol)) {
                if (!addMove(currRow, currCol)) break;
                currRow += dRow;
                currCol += dCol;
            }
        });
    }

    switch (piece.piece) {
        case 'pawn':
            const direction = piece.color === 'white' ? -1 : 1;
            const startRow = piece.color === 'white' ? 6 : 1;

            // Forward move
            if (isValidPosition(row + direction, col) && !board[row + direction][col].piece) {
                moves.push({ row: row + direction, col: col });
                
                // Double move from starting position
                if (row === startRow && !board[row + 2 * direction][col].piece) {
                    moves.push({ row: row + 2 * direction, col: col });
                }
            }

            // Capture moves
            [-1, 1].forEach(offset => {
                if (isValidPosition(row + direction, col + offset)) {
                    const target = board[row + direction][col + offset];
                    if (target.piece && target.color !== piece.color) {
                        moves.push({ row: row + direction, col: col + offset });
                    }
                }
            });
            break;

        case 'knight':
            const knightMoves = [
                [-2, -1], [-2, 1], [-1, -2], [-1, 2],
                [1, -2], [1, 2], [2, -1], [2, 1]
            ];
            
            knightMoves.forEach(([dRow, dCol]) => {
                addMove(row + dRow, col + dCol);
            });
            break;

        case 'bishop':
            addSlidingMoves([
                [-1, -1], [-1, 1], [1, -1], [1, 1]
            ]);
            break;

        case 'rook':
            addSlidingMoves([
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ]);
            break;

        case 'queen':
            addSlidingMoves([
                [-1, -1], [-1, 1], [1, -1], [1, 1],
                [-1, 0], [1, 0], [0, -1], [0, 1]
            ]);
            break;

        case 'king':
            const kingMoves = [
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 1],
                [1, -1], [1, 0], [1, 1]
            ];
            
            kingMoves.forEach(([dRow, dCol]) => {
                addMove(row + dRow, col + dCol);
            });
            break;
    }

    return moves;
}


function computerMakeMove(st, end) {
    rS = st[0]
    cS = st[1]
    rE = end[0]
    cE = end[1]
    board[rE][cE] = board[rS][cS]
    board[rS][cS] = {
        pieces: null,
        color: null
    }
    createBoard();
}

function isValidPosition(row, col) {
    return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function highlightValidMoves() {
    validMoves.forEach(move => {
        const square = document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`);
        square.classList.add('valid-move');
    });
}

function clearHighlights() {
    document.querySelectorAll('.square').forEach(square => {
        square.classList.remove('selected', 'valid-move', 'computer-move');
    });
}

function movePiece(from, to) {
    board[to.row][to.col] = board[from.row][from.col];
    board[from.row][from.col] = { piece: null, color: null };
    createBoard();
}

function resetBoard() {
    initializeBoard();   
    createBoard();
    selectedPiece = null;
    validMoves = [];
    document.getElementById('current-turn').textContent = 'Current Turn: White';
}

document.getElementById('reset-button').addEventListener('click', resetBoard);

// Initialize the game
initializeBoard();
createBoard();