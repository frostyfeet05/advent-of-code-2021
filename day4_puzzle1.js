const input = '';

processInput = (input) => {
    const [movesStr, ...boardsInput] = input.split('\n\n');
    const moves = movesStr.split(',').map(x => parseInt(x));
    const boards = boardsInput
        .map(x => x.split('\n')
            .map(x => x.split(/\s/)
                .filter(x => x.length)
                .map(x => {
                    return {value: parseInt(x), marked: false}
                })
            ));
    return {moves, boards};
}

checkForWin = (board) => {
    let win = checkForWinningLines(board);
    if (!win) {
        win = checkForWinningLines(transpose(board));
    }
    return win;
}

checkForWinningLines = (board) => {
    return board.some(line => line.every(x => x.marked));
}

transpose = (arr) => {
    return arr[0].map((_, colIndex) => arr.map(row => row[colIndex]));
}

sumUnmarked = (board) => {
    return board.flatMap(line => line)
        .filter(x => !x.marked)
        .map(x => x.value)
        .reduce((x, sum) => x + sum, 0);
}

mark = (value, boards) => {
    boards.forEach(board => {
        board.forEach(line => {
            line.filter(x => x.value === value).forEach(x => x.marked = true);
        })
    });
}

doPuzzle = (input) => {
    const {moves, boards} = processInput(input);

    return moves.map(move => {
        mark(move, boards);
        const winningBoard = boards.find(board => checkForWin(board));
        if (winningBoard) {
            const sum = sumUnmarked(winningBoard);
            return sum * move;
        }
    }).find(x => x);
}

const result = doPuzzle(input);
console.log(`Result is ${result}`);