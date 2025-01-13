function createBoard() {
  // Select a random puzzle index
  let randomIndex;
  do {
      randomIndex = Math.floor(Math.random() * 1000);
  } while (done.includes(randomIndex));

  // Retrieve puzzle information and parse FEN
  current_puzzle_info = puzzles[randomIndex];
  current_positions = parseFEN(current_puzzle_info['FEN']);

  // Initialize board pieces
  updatePieces(current_positions['white'], 'W');
  updatePieces(current_positions['black'], 'B');

  // Render the board
  renderBoard();
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

      // Apply board color
      const row = Math.floor(i / 8);
      square.classList.add(
          (row % 2 === 0) ? (i % 2 === 0 ? 'white-square' : 'black-square')
                          : (i % 2 === 0 ? 'black-square' : 'white-square')
      );

      // Apply piece color class
      if (startPiecesColor[i] === 'W') {
          square.firstChild?.classList.add('white-piece');
      } else if (startPiecesColor[i] === 'B') {
          square.firstChild?.classList.add('black-piece');
      }

      // Append square to the board
      gameBoard.append(square);
  });
}
