const SquareCoordinate = require("./SquareCoordinate.js")

class SudokuCell {
    constructor(cellValue, coords, parentSudoku) {
        this.value = parseInt(cellValue)
        this.coords = coords
        this.parentSudoku = parentSudoku
    }
    
    _getColumnId() {
        return this.coords.x
    }
    
    _getRowId() {
        return this.row.y
    }
    
    getColumn() {
        return this.parentSudoku.getColumn(this._getColumnId())
    }
    
    getRow() {
        return this.parentSudoku.getRow(this._getRowId())
    }
    
    getSquareCoord() {
        let yCoord = 0
        let xCoord = 0
        
        if (this.coords.x <= 3) {
            xCoord = 0
        } else if (this.coords.x <= 6) {
            xCoord = 1
        } else {
            xCoord = 2
        }
        
        if (this.coords.y <= 3) {
            yCoord = 0
        } else if (this.coords.y <= 6) {
            yCoord = 1
        } else {
            yCoord = 2
        }
        
        return new SquareCoordinate(xCoord, yCoord)
    }
    
    testValue(newValue) {
        
    }
}

module.exports = SudokuCell