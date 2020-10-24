const Coordinate = require("./Coordinate")
const SudokuCell = require("./SudokuCell")
const SudokuSquare = require("./SudokuSquare")
const FilesystemInterface = require('./FilesystemInterface')

const filesystem = new FilesystemInterface()

class Sudoku {
    constructor(sudokuString) {
        if (!sudokuString.length == 81) throw new Error("Invalid sudoku string")
        
        const rows = []
        
        for (let y = 0; y < 9; y++) {
            const row = []
            for (let x = 0; x < 9; x++) {
                const value = sudokuString[y*9 + x]

                const newCell = new SudokuCell(
                    value, // y(row) x(column)
                    new Coordinate(x, y),
                    this,
                    value != 0
                )

                row.push(newCell)
            }
            
            rows.push(row)
        }
        
        this.rows = rows
    }
    
    getAllRows() {
        return this.rows
    }
    
    getRawRows() {
        const rawRows = []

        for (const rawRow of this.rows) {
            rawRows.push(rawRow.map(cell => {
                return cell.value
            }))
        }

        return rawRows
    }

    getColumn(x) {
        const column = []
        
        // Kolommen worden niet apart opgeslagen, haal dus hetzelfde x coordinaat uit elke row(y)
        for (let y = 0; y < 9; y++) {
            column.push(this.rows[y][x])
        }
        
        return column
    }
    
    getRow(y) {
        return this.rows[y]
    }

    getCell(coords) {
        return this.rows[coords.x][coords.y]
    }

    getSquareFromCoord(squareCoord) {
        // [1,2,3] + (y*3 - 1) = y coord array
        // [1,2,3] + (x*3 - 1) = x coord array
        
        const xArray = [0,1,2].map(elem => {return elem + (squareCoord.y * 3)}) // Geen idee waarom ze omgedraaid zijn maar nu klopt het 
        const yArray = [0,1,2].map(elem => {return elem + (squareCoord.x * 3)})
        
        const rows = []

        for (let x of xArray) {
            const row = []

            for (let y of yArray) {
                const cell = this.getCell(new Coordinate(x, y))
                row.push(cell)
            }

            rows.push(row)
        }

        return new SudokuSquare(rows)
    }
    
    getAllCells() {
        const cells = []
        
        for (const row of this.rows) {
            for (const cell of row) {
                cells.push(cell)
            }
        }
        
        return cells
    }
    
    _getFirstEmptyCell() {
        const cells = this.getAllCells()
        return cells.find(cell => {
            return cell.value === 0
        })
    }
    
    _getCellByIndex(index) {
        const xCoord = Math.floor(index/9)
        const yCoord = index - xCoord*9

        // console.log(index, xCoord, yCoord, new Coordinate(xCoord, yCoord), this.getCell(new Coordinate(xCoord, yCoord)))

        return this.getCell(new Coordinate(xCoord, yCoord))
    }

    toString() {
        let finalString = ""
        for (const row of this.rows) {
            for (const cell of row) {
                finalString += cell.value.toString()
            }
        }
        return finalString
    }

    display() {
        for (const row of this.rows) {
            let rowString = ""
            for (const cell of row) {
                rowString += cell.value.toString() + " "
            }
            console.log(rowString)
        }
    }

    solveByBacktracking() {
        let allStatesString = ""
        let iterationCount = 0
        let foundSolution = false

        mainSolveLoop: while (!foundSolution) {
            let currentCell = this._getFirstEmptyCell()

            function previousCell() {
                while (true) {
                    currentCell = this._getCellByIndex(currentCell.getIndex() - 1)
                    if (!currentCell.isClue) {
                        break
                    }
                }
            }

            function nextCell() {
                while (true) {
                    if (currentCell.getIndex() === 80) {
                        iterationCount++
                        foundSolution = true
                        return false
                    }

                    currentCell = this._getCellByIndex(currentCell.getIndex() + 1)

                    if (!currentCell.isClue) {
                        break
                    }
                }

                return true
            }

            previousCell = previousCell.bind(this)
            nextCell = nextCell.bind(this)

            while (true) {
                const valueToTest = currentCell.value + 1

                if (valueToTest > 9) {
                    currentCell.value = 0
                    previousCell()
                    continue
                }

                currentCell.incrementValue()

                if (currentCell.testValue(valueToTest)) {
                    if (!nextCell()) {
                        break
                    }
                }

                allStatesString += this.toString() + "\n"
                iterationCount++
            }
        }

        console.log("Finished in " + iterationCount + " iterations")
    }
}

module.exports = Sudoku