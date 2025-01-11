// other important function
function check_move(start_sq_id, end_sq_id, move) {
    let move_st = move[0] + move[1]
    let move_end = move[2] + move[2]
    if(move_to_index(move_st) == start_sq_id && move_to_index(move_end) == end_sq_id) {
        return true;
    }
    return false;
}

function make_move_computer(sq_id_st, sq_id_end) {
    const st_sq = document.querySelector(`[square_id="${sq_id_st}"]`);
    const end_sq = document.querySelector(`[square_id="${sq_id_end}"]`);

    let piece = st_sq.firstChild;
    end_sq.firstChild = piece; 
}