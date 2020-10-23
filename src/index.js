const Sudoku = require("./classes/Sudoku")
const FilesystemInterface = require("./classes/FilesystemInterface")
const SquareCoordinate = require('./classes/SquareCoordinate')

const filesystem = new FilesystemInterface()

async function main() {
    const sudokuList = await filesystem.promiseBasedRead("./generate/sudokus.txt")
    const allSudokuStrings = sudokuList.split("\n")
    const randomSudokuString = allSudokuStrings[Math.floor(Math.random() * allSudokuStrings.length)]
    const sudoku = new Sudoku(randomSudokuString)

    const square = sudoku.getSquareFromCoord(new SquareCoordinate(1, 0))

    const solvedSudoku = sudoku.solve()
}

main()