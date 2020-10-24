const Sudoku = require("./classes/Sudoku")
const FilesystemInterface = require("./classes/FilesystemInterface")
const SquareCoordinate = require('./classes/SquareCoordinate')
const Coordinate = require("./classes/Coordinate")

const filesystem = new FilesystemInterface()

async function main() {
    const sudokuList = await filesystem.promiseBasedRead("./generate/sudokus.txt")
    const allSudokuStrings = sudokuList.split("\n")
    const randomSudokuString = allSudokuStrings[Math.floor(Math.random() * allSudokuStrings.length)]
    const sudoku = new Sudoku(randomSudokuString)
    sudoku.display()
    
    const hrstart = process.hrtime()
    
    sudoku.solveByBacktracking()

    const time = process.hrtime(hrstart)[1] / 1000000
    sudoku.display()
    console.log(`Solved in ${time}ms`)
}

main()