
function return_piece(piece_in_str) {
    if (piece_in_str == 'king') return king
    else if (piece_in_str == 'queen') return queen
    else if (piece_in_str == 'rook') return rook
    else if (piece_in_str == 'pawn') return pawn
    else if (piece_in_str == 'bishop') return bishop
    else if (piece_in_str == 'knight') return knight
}


// Update pieces based on positions and color
function updatePieces(positions, color) {
    Object.keys(positions).forEach(piece => {
        positions[piece].forEach(pos => {
            const x = char_to_index(pos[0]); // Column (a-h -> 0-7)
            const y = pos[1];               // Row (1-8)

            // Calculate 1D array index
            const index = (8 - y) * 8 + x; // Adjust for board orientation

            // Update piece data
            startPieces[index] = return_piece(piece);
            startPiecesColor[index] = color;
        });
    });
}



// Render the board squares
function renderBoard() {

    startPieces.forEach((startPiece, i) => {
        const square = document.createElement('div');

        square.classList.add('square');
        square.setAttribute('square-id', i);
        square.innerHTML = startPiece;
        square.firstChild?.setAttribute('draggable', 'true');

        // Zero-based: first row = 0, second row = 1, etc...
        const row = Math.floor(i / 8);

        if (row % 2 === 0) {
            square.classList.add(i % 2 === 0 ? 'white-square' : 'black-square');
        } else {
            square.classList.add(i % 2 === 0 ? 'black-square' : 'white-square');
        }

        // Determine the color of the pieces
        if (startPiecesColor[i] == 'W') {
            square.firstChild.firstChild.classList.add('white-piece');
        } else if (startPiecesColor[i] == 'B') {

            square.firstChild.firstChild.classList.add('black-piece');
        }
        gameBoard.append(square);
    });
}

function createBoard() {
    // Create the board squares
    // Process CSV - get details and save in variable puzzle_info
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * 1000);
    } while (done.includes(randomIndex));

    current_puzzle_info = puzzles[randomIndex];

    // Parse FEN from the selected puzzle
    current_positions = parseFEN(current_puzzle_info['FEN']);

    // Initialize board pieces
    updatePieces(current_positions['white'], 'W');
    updatePieces(current_positions['black'], 'B');
    // Log the updated board    
    // Render the board
    renderBoard();

}