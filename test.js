const chessPieces = {
    white: {
        rook: ['e6', 'g3'],
        queen: ['h6'],
        knight: ['b3'],
        pawn: ['d3', 'a2', 'c2', 'g2', 'h2'],
        king: ['h1']
    },
    black: {
        rook: ['a8', 'e7'],
        king: ['h8'],
        pawn: ['a7', 'b7', 'h7', 'f6', 'd5'],
        queen: ['b2'],
        bishop: ['f2']
    }
};

function algebraic_notation_to_index(x) {
    let ans = [-1, -1] // [x,y]
    ans[1] = x[0].charCodeAt(0) - 97
    ans[0] = 8 - parseInt(x[1])
    return ans
}

const initialSetup = [
    [
      { piece: 'rook', color: 'black' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'king', color: 'black' }
    ],
    [
      { piece: 'pawn', color: 'black' },
      { piece: 'pawn', color: 'black' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'rook', color: 'black' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'pawn', color: 'black' }
    ],
    [
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'rook', color: 'white' },
      { piece: 'pawn', color: 'black' },
      { piece: null, color: null },
      { piece: 'queen', color: 'white' }
    ],
    [
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'pawn', color: 'black' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null }
    ],
    [
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null }
    ],
    [
      { piece: null, color: null },
      { piece: 'knight', color: 'white' },
      { piece: null, color: null },
      { piece: 'pawn', color: 'white' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'rook', color: 'white' },
      { piece: null, color: null }
    ],
    [
      { piece: 'pawn', color: 'white' },
      { piece: 'queen', color: 'black' },
      { piece: 'pawn', color: 'white' },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'bishop', color: 'black' },
      { piece: 'pawn', color: 'white' },
      { piece: 'pawn', color: 'white' }
    ],
    [
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: null, color: null },
      { piece: 'king', color: 'white' }
    ]
  ];
  

const all_pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'pawn'];

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

console.log(initialSetup);