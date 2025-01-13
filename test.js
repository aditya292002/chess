function char_to_index(x) {
    if (x === 'a') return 1;
    if (x === 'b') return 2;
    if (x === 'c') return 3;
    if (x === 'd') return 4;
    if (x === 'e') return 5;
    if (x === 'f') return 6;
    if (x === 'g') return 7;
    if (x === 'h') return 8;
}

function move_to_index(move) {
    const x = char_to_index(move[0]); // Column (a-h -> 0-7)
    const y = parseInt(move[1], 10);
    let index = (8 * (y - 1)) + x;
    return index;
}


console.log(move_to_index("a1"))
console.log(move_to_index("h8"))
console.log(move_to_index("f7"))