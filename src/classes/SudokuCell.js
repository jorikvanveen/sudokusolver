const SquareCoordinate = require("./SquareCoordinate.js")

class SudokuCell {
    constructor(cellValue, coords, parentSudoku, isClue) {
        this.value = parseInt(cellValue)
        this.coords = coords
        this.parentSudoku = parentSudoku
        this.isClue = isClue
    }

    _getColumnId() {
        return this.coords.x
    }
    
    _getRowId() {
        return this.coords.y
    }
    
    getColumn() {
        return this.parentSudoku.getColumn(this._getColumnId())
    }
    
    getIndex() {
        return this._getRowId()*9 + this._getColumnId() 
    }

    getRow() {
        return this.parentSudoku.getRow(this._getRowId())
    }
    
    _getSquareCoord() {
        let yCoord = 0
        let xCoord = 0
        
        // TODO: Rekenen ipv lelijk if statement
        if (this.coords.x < 3) {
            xCoord = 0
        } else if (this.coords.x < 6) {
            xCoord = 1
        } else {
            xCoord = 2
        }
        
        if (this.coords.y < 3) {
            yCoord = 0
        } else if (this.coords.y < 6) {
            yCoord = 1
        } else {
            yCoord = 2
        }
        
        return new SquareCoordinate(xCoord, yCoord)
    }

    getSquare() {
        return this.parentSudoku.getSquareFromCoord(this._getSquareCoord())
    }

    incrementValue() {
        this.value = this.value + 1
        return this.value
    }

    testValue(newValue) {
        // Tests if newValue conflicts with any sudoku rules if it was introduced as a candidate
        if (newValue > 9) return false
        const column = this.getColumn()
        const row = this.getRow()
        const squareCells = this.getSquare().getAllCells()

        const ownCoords = this.coords

        function isConflictingCell(cell) {
            return cell.value === newValue && cell.coords !== ownCoords
        }

        const columnValid = !column.find(isConflictingCell)
        const rowValid = !row.find(isConflictingCell)
        const squareValid = !squareCells.find(isConflictingCell)

        // console.log("Testing value " + newValue.toString())
        // console.log("column", column)
        // console.log("row", row)
        // console.log("squareCells", squareCells)

        // function getOccurrences(inputArray) {
        //     const total = 0

        //     inputArray.forEach(value => {
        //         if (value === newValue) {
        //             total++
        //         }
        //     })

        //     return total
        // }

        // const columnValid = getOccurrences(column) > 1
        // const rowValid = getOccurrences(row) > 1
        // const squareValid = getOccurrences(squareCells)

        return columnValid && rowValid && squareValid
    }
}

module.exports = SudokuCell