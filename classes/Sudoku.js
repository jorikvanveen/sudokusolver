class Sudoku {
    constructor(sudokuString) {
        if (!sudokuString.length == 81) throw new Error("Invalid sudoku string")
        
        const rows = []
        
        for (let x = 0; x < 9; x++) {
            const row = []
            for (let y = 0; y < 9; y++) {
                row.push(parseInt(sudokuString[x*9 + y]))
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
        
        for (let y = 0; y < 9; y++) {
            column.push(this.rows[y][x])
        }
        
        return column
    }
    
    getRow(y) {
        return this.rows[y]
    }
    
    _getSquareColumnFromXCoord(xCoord) {
        if (xCoord <= 3) return 0 
        if (xCoord <= 6) return 1 
        if (xCoord <= 9) return 2
    }
    
    _getSquareRowFromYCoord(yCoord) {
        if (yCoord <= 3) return 0 
        if (yCoord <= 6) return 1 
        if (yCoord <= 9) return 2
    }
    
    getSquare(x, y) {
        // [1,2,3] + (y*3 - 1) = y
        // [1,2,3] + (x*3 - 1) = x
        
        const xArray = [1,2,3].map(elem => {return elem + (this.coords.x * 3 - 1)})
        const yArray = [1,2,3] * (this.coords.y * 3 - 1)
        
        
    }
    
    getSquareFromCoord(x, y) {
        const squareCoords = {
            x: this._getSquareColumnFromXCoord(x),
            y: this._getSquareRowFromYCoord(y)
        }
        
        return this.getSquare(squareCoords.x, squareCoords.y)
    }
}

module.exports = Sudoku