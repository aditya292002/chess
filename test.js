function index_to_char(i) {
    if (i === 1) return 'a';
    if (i === 2) return 'b';
    if (i === 3) return 'c';
    if (i === 4) return 'd';
    if (i === 5) return 'e';
    if (i === 6) return 'f';
    if (i === 7) return 'g';
    if (i === 8) return 'h';
}
function get_Move(index) {
    let row = Math.ceil(index / 8);
    let col = index % 8 || 8;
    return index_to_char(col) + row;
}


for(let i = 1; i <= 64; i++) {
    console.log(get_Move(i))
}
// console.log(get_Move(64))