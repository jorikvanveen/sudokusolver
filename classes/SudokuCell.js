const SquareCoordinate = require("./SquareCoordinate.js")

class SudokuCell {
    constructor(cellValue, coords) {
        this.value = parseInt(cellValue)
        this.coords = coords
    }
    
    getColumnId() {
        return this.coords.x
    }
    
    getRowId() {
        return this.row.y
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
    
    
}

module.exports = SudokuCell