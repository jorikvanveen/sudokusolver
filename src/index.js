"use strict";
exports.__esModule = true;
var Sudoku_1 = require("./classes/Sudoku");
function main() {
    var sudoku = new Sudoku_1["default"]("000000900090083450040500280000265300000000000006714000074002030083150040002000000");
    // Lost hele sudoku op, heeft nog geen error handling lmao
    sudoku.solveByBacktracking();
    // Dumpt de hele sudoku in de console
    sudoku.display();
}
main();
