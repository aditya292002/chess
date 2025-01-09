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

// // Example usage
// const fen = 'r6k/pp2r2p/4Rp1Q/3p4/8/1N1P2R1/PqP2bPP/7K b - - 0 24';
// const result = parseFEN(fen);
// console.log(JSON.stringify(result, null, 2)); // Pretty-print the result
