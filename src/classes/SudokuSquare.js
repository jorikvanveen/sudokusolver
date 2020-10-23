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
}

module.exports = SudokuSquare