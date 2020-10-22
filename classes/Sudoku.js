const Coordinate = require("./Coordinate")
const SudokuCell = require("./SudokuCell")
const SudokuSquare = require("./SudokuSquare")

class Sudoku {
    constructor(sudokuString) {
        if (!sudokuString.length == 81) throw new Error("Invalid sudoku string")
        
        const rows = []
        
        for (let y = 0; y < 9; y++) {
            const row = []
            for (let x = 0; x < 9; x++) {
                row.push(
                    new SudokuCell(
                        sudokuString[y*9 + x], // y(row) x(column)
                        new Coordinate(x, y)
                    )
                )
            }
            
            rows.push(row)
        }
        
        this.rows = rows
    }
    
    getAllRows() {
        return this.rows
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
        
        const xArray = [1,2,3].map(elem => {return elem + (squareCoord.x * 3 - 1)})
        const yArray = [1,2,3].map(elem => {return elem + (squareCoord.y * 3 - 1)})
        
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
}

module.exports = Sudoku