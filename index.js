const Sudoku = require("./classes/Sudoku")
const FilesystemInterface = require("./classes/FilesystemInterface")

const filesystem = new FilesystemInterface()

async function main() {
    const sudokuList = await filesystem.promiseBasedRead("./generate/sudokus.txt")
    const allSudokuStrings = sudokuList.split("\n")
    const randomSudokuString = allSudokuStrings[Math.floor(Math.random() * allSudokuStrings.length)]
    const sudoku = new Sudoku(randomSudokuString)
    
    console.log(sudoku.rows)
    console.log(sudoku.getColumn(4))
}

main()