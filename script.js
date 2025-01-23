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
                html_to_add = `<span class="piece">${pieces[piece.color][piece.piece]}</span>`;
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