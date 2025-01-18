const showScore = document.querySelector('#score')
const gameBoard = document.querySelector('#gameboard');
const playerDisplay = document.querySelector('#player');
const showCurrentMove = document.querySelector('#current-move')
const opponentMoveShow = document.querySelector('#opponent-move-show')
const infoDisplay = document.querySelector('#info-display');
const refresh_puzzle = document.querySelector('#refresh-puzzle')
const width = 8;


var startPositionId = -1; // denotes square-id of the div the darg action inititted
var endPositionId = -1; // denotes square-id
var startElement; // denotes actual element drag started
var endElement; // denotes actual element
var ind; // denotes index of the moves array of current puzzle 
var allSquares;
var moves;
var playerGo; // actally denotes player color

// checks current move with the - move made by the player
function check_current_move(move) {
    console.log("check_move : ", move)
    let move_st = move[0] + move[1]
    let move_end = move[2] + move[3]
    if(move_to_index(move_st) == startPositionId && move_to_index(move_end) == endPositionId) {
        return true;
    }
    return false;
}

function init() {
    refresh_puzzle.style.display = 'none';
    ind = 0; // Initialize ind to 0
    // if(done.length == 1) {
        createBoard();
    // }
    // make the first move and update the index and wait for the 


    let moves_str = current_puzzle_info['Moves'];
    moves = moves_str.split(' ');
    first_move = moves[0];
    first_move_start = first_move[0] + first_move[1];
    console.log("first_move_start : ", first_move_start)
    console.log(move_to_index(first_move_start))
    console.log(startPiecesColor[move_to_index(first_move_start) - 1])

    if (startPiecesColor[move_to_index(first_move_start) - 1] == 'W') {
        playerGo = 'black';
    } else {
        playerGo = 'white';
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



    let start_id = move_to_index(moves[ind][0] + moves[ind][1])
    let end_id = move_to_index(moves[ind][2] + moves[ind][3])
    let start_element = document.querySelector('[square-id="' + start_id + '"]');
    let end_element = document.querySelector('[square-id="' + end_id + '"]');
    end_element.innerHTML = '';
    end_element.append(start_element.firstChild);
    // mention the emode made
    infoDisplay.innerHTML = '';
    infoDisplay.innerHTML = "Move " + moves[ind] + " is made";
    infoDisplay.style.color = 'blue';
    infoDisplay.style.fontSize = '1.5em';
    infoDisplay.style.fontWeight = 'bold';
    infoDisplay.style.backgroundColor = 'lightgrey';
    infoDisplay.style.padding = '5px';
    infoDisplay.style.border = '1px solid blue';
    infoDisplay.style.borderRadius = '3px';
    ind = 1;
}

function dragStart(e) {
    startElement = e.target;
    startPositionId = startElement.parentNode.getAttribute('square-id');
    console.log("square id start : ", startPositionId)
}

function dragOver(e) {
    console.log("dragOver start")
    console.log(e.target.getAttribute('square-id'))
    e.preventDefault();
}

function dragDrop(e) {
    e.stopPropagation();
    console.log("drop function")
    console.log(e)
    endElement = e.target;
    if (endElement.classList.contains('piece')) {
        endElement = endElement.parentNode;
    }
    endPositionId = endElement.getAttribute('square-id');
    console.log("square id end : ", endPositionId);

    if(check_current_move(moves[ind])) {
        endElement.innerHTML = '';
        endElement.appendChild(startElement);
        showCurrentMove.innerHTML = "Move " + moves[ind] + " is correct";
        showCurrentMove.style.color = 'darkgreen';


        // ind += 1
        ind += 1
        // show player win
        if(ind == moves.length) {
            showCurrentMove.innerHTML = "Win";
            showCurrentMove.style.color = 'darkgreen';
            showCurrentMove.style.fontSize = '2em';
            showCurrentMove.style.fontWeight = 'bold';
            showCurrentMove.style.backgroundColor = 'lightyellow';
            showCurrentMove.style.padding = '10px';
            showCurrentMove.style.border = '2px solid darkgreen';
            showCurrentMove.style.borderRadius = '5px';


            // after the player wins
            
            // update the score
            let earlier_score = parseInt(showScore.innerHTML, 10);
            console.log(typeof earlier_score)
            console.log(earlier_score)
            showScore.innerHTML = "";
            let newScore = earlier_score  + parseInt(current_puzzle_info['RatingDeviation']);
            console.log("new score : ", newScore);
            console.log(typeof newScore)

            showScore.innerHTML = newScore;
            // shoe the next button
            refresh_puzzle.style.display = 'block';

            // refresh the puzzle
            refreshBoard()
            // init()
            // refreshInit()
            refresh_puzzle.addEventListener('click', refreshRenderBoard);
        } 
        else {
            // computer will make move moves[i]
            let start_id = move_to_index(moves[ind][0] + moves[ind][1])
            let end_id = move_to_index(moves[ind][2] + moves[ind][3])
            let start_element = document.querySelector('[square-id="' + start_id + '"]');
            let end_element = document.querySelector('[square-id="' + end_id + '"]');
            end_element.innerHTML = '';
            end_element.append(start_element.firstChild);
            ind += 1
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
function refreshInit() {
    refresh_puzzle.style.display = 'none';
    ind = 0;

    moves_str = current_puzzle_info['Moves'];
    moves = moves_str.split(' ');
    first_move = moves[0];
    first_move_start = first_move[0] + first_move[1];
    console.log("first_move_start : ", first_move_start)
    console.log(move_to_index(first_move_start))
    console.log(startPiecesColor[move_to_index(first_move_start) - 1])

    if (startPiecesColor[move_to_index(first_move_start) - 1] == 'W') {
        playerGo = 'black';
    } else {
        playerGo = 'white';
    }
    console.log("playergo : ", playerGo)
    playerDisplay.textContent = playerGo;
    console.log(moves)
    showCurrentMove.innerHTML = "";
    showCurrentMove.style = null;
    opponentMoveShow.innerHTML = "";
    opponentMoveShow.style = null;
}



// Render the board squares
function refreshRenderBoard() {
    startPieces.forEach((startPiece, i) => {
        let sq_id = i + 1
        square = document.querySelector('[square-id="' + sq_id + '"]');
        square.innerHTML = ''
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', 'true');

        // Determine the color of the pieces
        if (startPiecesColor[i] == 'W') {
            square.firstChild.firstChild.classList.add('white-piece');
        } else if (startPiecesColor[i] == 'B') {
            square.firstChild.firstChild.classList.add('black-piece');
        }
    });
    refreshInit()
}

function refreshBoard() {
    // reset the start pieces
    startPieces = Array(64).fill('');
    // rest startPiecesColor
    startPiecesColor = Array(64).fill('');

    // Create the board squares
    // Process CSV - get details and save in variable puzzle_info
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 1000);
    } while (done.includes(randomIndex));

    done.push(randomIndex)
    current_puzzle_info = puzzles[randomIndex];

    // Parse FEN from the selected puzzle
    current_positions = parseFEN(current_puzzle_info['FEN']);

    // Initialize board pieces
    updatePieces(current_positions['white'], 'W');
    updatePieces(current_positions['black'], 'B');
    // Render the board
}






init();
