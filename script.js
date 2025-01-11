const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const infoDisplay = document.querySelector('#info-display');
const showScore = document.querySelector('#score')
const showCurrentMove = document.querySelector('#current-move')
const opponentMoveShow = document.querySelector('#opponent-move-show')
const width = 8;

var lives_left = 5;
let playerGo; // denotes player turn
let startPositionId = -1;
let draggedElement;
let endPositionId = -1;
let startElement;
let endElement;
let computer_turn = false;
let score = 0;
let ind = 0

let taken, takenByOpponent;
let targetId, startId, idInterval;
let startRow, startCol, targetRow, targetCol;
let rowInterval, colInterval;

let allSquares;

function move_to_index(move) {
    const x = char_to_index(move[0]); // Column (a-h -> 0-7)
    const y = parseInt(move[1], 10);
    let index = (8 * (y - 1)) + x;
    return index;
}

function get_Move(index) {
    let row = Math.ceil(index / 8);
    let col = index % 8 || 8;
    return index_to_char(col) + row;
}


function check_move(move) {
    console.log("check_move : ", move)
    let move_st = move[0] + move[1]
    let move_end = move[2] + move[3]
    if(move_to_index(move_st) == startPositionId && move_to_index(move_end) == endPositionId) {
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function init() {
    createBoard();

    moves_str = current_puzzle_info['Moves'];
    let moves = moves_str.split(' ');
    first_move = moves[0];
    first_move_start = first_move[0] + first_move[1];
    console.log("first_move_start : ", first_move_start)
    console.log(move_to_index(first_move_start))
    console.log(startPiecesColor[move_to_index(first_move_start) - 1])

    if (startPiecesColor[move_to_index(first_move_start)] == 'W') {
        playerGo = 'white';
    } else {
        playerGo = 'black';
    }
    console.log("playergo : ", playerGo)
    playerDisplay.textContent = playerGo;

    allSquares = document.querySelectorAll('.square');
    allSquares.forEach(square => {
        square.addEventListener('dragstart', dragStart);
        square.addEventListener('dragover', dragOver);
        square.addEventListener('drop', dragDrop);
    });
    console.log(moves)
}

function dragStart(e) {
    draggedElement = e.target;
    startElement = e.target;
    startPositionId = draggedElement.parentNode.getAttribute('square-id');
    console.log("square id start : ", startPositionId)
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    // console.log(e.target)
    // console.log(e.target.getAttribute('square-id'))
    endPositionId = e.target.getAttribute('square-id');
    console.log("start index : ", startPositionId);
    console.log("end index : ", endPositionId);
    endElement = e.target;
    moves_str = current_puzzle_info['Moves'];
    let moves = moves_str.split(' ');
    if(check_move(moves[ind])) {
        // Make the move
        console.log("inside")
        console.log(startElement)
        console.log(endElement)
        // let piece = move_from.firstChild;
        // console.log("piece",piece)
        // move_to.firstChild = piece;
        console.log("asasasasas")
        console.log(startPositionId, endPositionId)
        // move_to.innerHTML = piece;
        endElement.appendChild(draggedElement);
        showCurrentMove.innerHTML = "Move " + moves[ind] + " is correct";
        showCurrentMove.style.color = 'darkgreen';

        sleep(2000)

        // ind += 1
        ind += 1
        // computer will make move moves[i]
        let start_id = move_to_index(moves[ind][0] + moves[ind][1])
        let end_id = move_to_index(moves[ind][2] + moves[ind][3])
        let start_element = document.querySelector('[square-id="' + start_id + '"]');
        let end_element = document.querySelector('[square-id="' + end_id + '"]');
        end_element.append(start_element.firstChild)
        ind += 1
        // show player win
        if(ind == moves.length) {
            showCurrentMove.innerHTML = "Win";
            showCurrentMove.style.color = 'darkgreen';
        } 
        else {
            opponentMoveShow.innerHTML = "Make the next move"
        }
    }
    else {
        // donot make the move
        console.log("not valid move")
        let move_made = get_Move(startPositionId) + get_Move(endPositionId)
        showCurrentMove.innerHTML = "Move " + move_made + " is incorrect";
        showCurrentMove.style.color = 'red'; 
    }
}

init();
