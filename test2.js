let puzzle_ind;
let solved = []
let puzzle;
let moves;
let move_ind = 0;
let currentTurn;


const board = [
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
    let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 1000);
    } while (solved.includes(randomNumber));
    puzzle_ind = randomNumber;
    solved.push(puzzle_ind)
    puzzle = puzzles[puzzle_ind]
    moves = puzzle['Moves'].split(' ')
    // select the player color
    let move1_index_start = algebraic_notation_to_index(moves[0][0] + moves[0][1])
    currentTurn = board[move1_index_start[0]][move1_index_start[1]]['color']
    if(currentTurn == 'black') currentTurn = 'white'
    else currentTurn = 'black'
    console.log(currentTurn)
    
    
    position = parseFEN()

    all_pieces.forEach(element => {
        let positions_white = chessPieces['white'][element];
        if (positions_white) {
            positions_white.forEach(pos => {
                let index = algebraic_notation_to_index(pos);
                value = {
                    piece: element,
                    color: 'white'
                }
                initialSetup[index[0]][index[1]] = value;
            });
        }
        let positions_black = chessPieces['black'][element];
        if (positions_black) {
            positions_black.forEach(pos => {
                let index = algebraic_notation_to_index(pos);
                value = {
                    piece: element,
                    color: 'black'
                }
                initialSetup[index[0]][index[1]] = value;
            });
        }
        for(let i = 0; i < 8; i++) {
            for(let j = 0; j < 8; j++) {
                if(initialSetup[i][j] === null) {
                    initialSetup[i][j] = {
                        piece : null, 
                        color: null
                    }
                }
            }
        }
    });
    console.log(board)
}


