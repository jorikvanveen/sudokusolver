class SudokuSquare {
    constructor(inputArray) {
        this.rows = inputArray
    }

    valueDump() {
        const finalArray = []
        for (let x of this.rows) {
            const row = []
            for (let y of x) {
                row.push(y.value)
            }
            finalArray.push(row)
        }
        console.log(finalArray)
    }

    getAllCells() {
        const cells = []

        for (const row of this.rows)  {
            for (const cell of row) {
                cells.push(cell)
            }
        }

        return cells
    }

    getAllValues() {
        const cells = this.getAllCells()
        return cells.map(cell => {
            return cell.value
        })
    }
}

module.exports = SudokuSquare