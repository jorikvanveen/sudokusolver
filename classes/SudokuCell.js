const SquareCoordinate = require("./SquareCoordinate.js")

class SudokuCell {
    constructor(cellValue, coords) {
        this.cellValue = parseInt(cellValue)
        this.coords = coords
    }
    
    getColumnId() {
        return this.coords.x
    }
    
    getRowId() {
        return this.row.y
    }
    
    getSquare() {
        let yCoord = 0
        let xCoord = 0
        
        if (this.coords.x <= 9) {
            xCoord = 2
        } else if (this.coords.x <= 6) {
            xCoord = 1
        } else {
            this.coords = 0
        }
        
        if (this.coords.y <= 9) {
            yCoord = 2
        } else if (this.coords.y <= 6) {
            yCoord = 1
        } else {
            this.coords = 0
        }
        
        return new SquareCoordinate(xCoord, yCoord)
    }
    
    
}

module.exports = SudokuCell