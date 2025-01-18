const pieces = {
    'white': {
        'king': '♔',
        'queen': '♕',
        'rook': '♖',
        'bishop': '♗',
        'knight': '♘',
        'pawn': '♙'
    },
    'black': {
        'king': '♚',
        'queen': '♛',
        'rook': '♜',
        'bishop': '♝',
        'knight': '♞',
        'pawn': '♟'
    }
};

puzzle =     {
    "PuzzleId": "00008",
    "FEN": "r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24",
    "Moves": "f2g3 e6e7 b2b1 b3c1 b1c1 h6c1",
    "Rating": "1902",
    "RatingDeviation": "76",
    "Popularity": "95",
    "NbPlays": "7226",
    "Themes": "crushing hangingPiece long middlegame",
    "GameUrl": "https://lichess.org/787zsVup/black#48",
    "OpeningTags": ""
}

let board = [];
let selectedPiece = null;
let currentTurn = 'white';
let validMoves = [];

function initializeBoard() {
    const initialSetup = [
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
        ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
    ];

    board = initialSetup.map((row, i) => 
        row.map((piece, j) => ({
            piece: piece,
            color: i < 2 ? 'black' : i > 5 ? 'white' : null
        }))
    );
}

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
            if (piece.piece) {
                square.innerHTML = `<span class="piece">${pieces[piece.color][piece.piece]}</span>`;
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
            selectedPiece = null;
            validMoves = [];
            currentTurn = currentTurn === 'white' ? 'black' : 'white';
            document.getElementById('current-turn').textContent = `Current Turn: ${currentTurn.charAt(0).toUpperCase() + currentTurn.slice(1)}`;
        } else {
            selectedPiece = null;
        }
    } else {
        const piece = board[row][col];
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
                const newRow = row + dRow;
                const newCol = col + dCol;
                
                if (isValidPosition(newRow, newCol)) {
                    const target = board[newRow][newCol];
                    if (!target.piece || target.color !== piece.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                }
            });
            break;

        // Add other piece move patterns here
        // This is a simplified version - you might want to add more complex move patterns
        // for other pieces like bishop, rook, queen, and king
    }

    return moves;
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
        square.classList.remove('selected', 'valid-move');
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
    currentTurn = 'white';
    selectedPiece = null;
    validMoves = [];
    document.getElementById('current-turn').textContent = 'Current Turn: White';
}

document.getElementById('reset-button').addEventListener('click', resetBoard);

// Initialize the game
initializeBoard();
createBoard();