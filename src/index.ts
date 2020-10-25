import Sudoku from "./classes/Sudoku"


function main() {
   const sudoku = new Sudoku("000000900090083450040500280000265300000000000006714000074002030083150040002000000")

   // Lost hele sudoku op, heeft nog geen error handling lmao
   sudoku.solveByBacktracking()

   // Dumpt de hele sudoku in de console
   sudoku.display()
}

main()