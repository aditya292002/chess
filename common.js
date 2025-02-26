const all_pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];
var puzzle_ind; // denotes the eindex of current puzzle from array in data.js
var solved = [];
var puzzle;
var moves;
var move_ind = 0; // denotes the index on moves array
var currentTurn;
var score = 0;

function algebraic_notation_to_index(x) {
    let ans = [-1, -1] // [x,y]
    ans[1] = x[0].charCodeAt(0) - 97
    ans[0] = 8 - parseInt(x[1])
    return ans
}


// parse FEN
function parseFEN(fen) {
    // Split FEN to get the board layout
    const [position] = fen.split(' '); // Take only the board description
    const rows = position.split('/'); // Split rows by '/'

    // Object to store piece positions
    const board = {
        white: {},
        black: {}
    };

    // Piece type mappings
    const pieces = {
        'p': 'pawn',
        'n': 'knight',
        'b': 'bishop',
        'r': 'rook',
        'q': 'queen',
        'k': 'king'
    };

    // Parse each row of the FEN string
    for (let rank = 8; rank >= 1; rank--) { // Ranks are numbered 8 to 1 (top to bottom)
        let file = 'a'; // Files are labeled 'a' to 'h' (left to right)
        for (const char of rows[8 - rank]) { // Read row from FEN
            if (!isNaN(char)) {
                // If it's a number, skip empty squares
                file = String.fromCharCode(file.charCodeAt(0) + Number(char));
            } else {
                // Determine piece color and type
                const color = char === char.toLowerCase() ? 'black' : 'white';
                const type = pieces[char.toLowerCase()];
                const position = `${file}${rank}`;

                // Store in the board object
                if (!board[color][type]) {
                    board[color][type] = [];
                }
                board[color][type].push(position);

                // Move to the next file
                file = String.fromCharCode(file.charCodeAt(0) + 1);
            }
        }
    }
    return board;
}




var board = [
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
    ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

function initializeBoard() {
    board = [
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    ];
    console.log("InitializeBoard")

    document.getElementById("reset-button").style.display = "none";
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 1000);
    } while (solved.includes(randomNumber));
    puzzle_ind = randomNumber;
    solved.push(puzzle_ind)
    // puzzle_ind = 437  // make the puzzle static for testing
    puzzle = puzzles[puzzle_ind]
    moves = puzzle['Moves'].split(' ')

    
    position = parseFEN(puzzle['FEN'])

    all_pieces.forEach(element => {
        let positions_white = position['white'][element];
        if (positions_white) {
            positions_white.forEach(pos => {
                let index = algebraic_notation_to_index(pos);
                value = {
                    piece: element,
                    color: 'white'
                }
                board[index[0]][index[1]] = value;
            });
        }
        let positions_black = position['black'][element];
        if (positions_black) {
            positions_black.forEach(pos => {
                let index = algebraic_notation_to_index(pos);
                value = {
                    piece: element,
                    color: 'black'
                }
                board[index[0]][index[1]] = value;
            });
        }
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(board[i][j] === null) {
                    board[i][j] = {
                        piece : null, 
                        color: null
                    }
                }
            }
        }
    });

    
    let move1_index_start = algebraic_notation_to_index(moves[0][0] + moves[0][1])
    let move1_index_end = algebraic_notation_to_index(moves[0][2] + moves[0][3])
    currentTurn = board[move1_index_start[0]][move1_index_start[1]]['color']
    if(currentTurn == 'black') currentTurn = 'white'
    else currentTurn = 'black'
    let current_turn_element = document.getElementById('current-turn');
    current_turn_element.innerHTML =  "";
    current_turn_element.innerHTML =  `You play as <b style="color: ${currentTurn === 'white' ? 'white' : 'black'};">${currentTurn}</b>. Solve in <b style="color: green;">${moves.length / 2}</b> moves`;
    console.log("moves: ", moves)

    // for the first move update the baord
    board[move1_index_end[0]][move1_index_end[1]] = board[move1_index_start[0]][move1_index_start[1]] 
    board[move1_index_start[0]][move1_index_start[1]] = {
        piece: null,
        color: null
    }   
    move_ind = 1;
    console.log("curreent_turn : ", currentTurn)
    console.log(board)
    console.log(moves)
}


