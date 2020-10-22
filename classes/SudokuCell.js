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
    
    getSquareCoords() {
        // [1,2,3] + (y*3 - 1) = y
        // [1,2,3] + (x*3 - 1) = x
        
        // const xArray = [1,2,3] * (this.coords.x * 3 - 1)
        // const yArray = [1,2,3] * (this.coords.y * 3 - 1)
        
        let 
        
        if (this.coords.x <= 9)
        
        return new SquareCoordinate()
    }
}

module.exports = SudokuCell