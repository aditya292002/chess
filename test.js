// Move validation lookup object
const validMoves = {
    'pawn': () => {
        let direction = 1;
        // Flip the rows depending on who's playing. 
        if (playerGo === 'black') {
            startRow = width - 1 - startRow;
            targetRow = width - 1 - targetRow;
            direction = -1;
        }
        // Check if the pawn's movement is blocked by any piece
        const blockedByPiece = Boolean(document.querySelector(`[square-id="${startId + direction * width}"]`).firstChild);

        return targetRow > startRow && ((!taken && !blockedByPiece && startRow === 1 && idInterval === 2 * width) || (!taken && idInterval === width) || (takenByOpponent && (idInterval === width - 1 || idInterval === width + 1)));
    },
    'rook': () => {
        // Successful vertical movement or horizontal movement
        if ((rowInterval !== 0 && colInterval === 0) || (rowInterval === 0 && colInterval !== 0)) {
            // Check if the rook's movement is blocked by any piece
            for (let i = Math.abs(rowInterval ? rowInterval : colInterval) - 1; i > 0; --i) {
                const id = rowInterval ? startId + Math.sign(rowInterval) * i * width : startId + Math.sign(colInterval) * i;
                if (Boolean(document.querySelector(`[square-id="${id}"]`).firstChild)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    'bishop': () => {
        // Successful diagonal movement
        if (Math.abs(rowInterval) === Math.abs(colInterval) && rowInterval !== 0) {
            // Check if the bishop's movement is blocked by any piece
            for (let i = Math.abs(rowInterval) - 1; i > 0; --i) {
                if (Boolean(document.querySelector(`[square-id="${startId + Math.sign(rowInterval) * i * width + Math.sign(colInterval) * i
                    }"]`).firstChild)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    },
    'knight': () => {
        // Two steps up or down, one step right or left - Two steps right or left, one step up or down
        return (Math.abs(rowInterval) === 2 && Math.abs(colInterval) === 1) || (Math.abs(colInterval) === 2 && Math.abs(rowInterval) === 1);
    }, 
    'queen': () => {
        // A queen is simply just a rook and a bishop at the same time
        // return this.rook() || this.bishop();
        return (validMoves['rook']() || validMoves['bishop']());
    },
    'king': () => {
        // King moves one step anywhere
        return (idInterval === width || idInterval === width - 1 || idInterval === width + 1 || idInterval === 1);
    }
}