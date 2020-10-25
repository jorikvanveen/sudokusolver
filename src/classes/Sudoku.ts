import SudokuCell from "./SudokuCell"

export default class Sudoku {
    private rows: SudokuCell[][]

    constructor(sudokuData: string) {
        if (sudokuData.length !== 81) {
            throw new Error("Invalid sudoku string")
        }

        const rows = []
        for (let y = 0; y < 9; y++) {
            const row: SudokuCell[] = []

            for (let x = 0; x < 9; x++) {
                const value = parseInt(sudokuData[y*9 + x])

                const cell = new SudokuCell(
                    x,
                    y,
                    value,
                    this
                )

                row.push(cell)
            }

            rows.push(row)
        }

        this.rows = rows
    }

    public getAllRows() {
        return this.rows
    }

    public getAllColumns() {
        const rows = this.rows
        const cols = []

        for (let x = 0; x < 9; x++) {
            const col = []
            for (const row of rows) {
                col.push(row[x])
            }

            cols.push(col)
        }

        return cols
    }

    public getAllRowValues() {
        return this.getAllRows().map(row => {
            return row.map(cell => {
                return cell.getValue()
            })
        })
    }

    public getAllColumnValues() {
        return this.getAllColumns().map(col => {
            return col.map(cell => {
                return cell.getValue()
            })
        })
    }

    public getColumn(x:number) {
        return this.getAllColumns()[x]
    }

    public getRow(y:number) {
        return this.rows[y]
    }

    public getCellFromCoord(x:number, y:number) {
        return this.rows[y][x]
    }

    public getCellFromIndex(index:number) {
        const yCoord = Math.floor(index / 9)
        const xCoord = index - yCoord * 9

        return this.getCellFromCoord(xCoord, yCoord)
    }

    private getFirstEmptyCell() {
        let index = 0

        while (true) {
            const cell = this.getCellFromIndex(index)

            if (!cell.isClue()) {
                return cell
            }

            index++
        }
    }

    public display() {
        const rows = this.rows
        let finalString = ""

        for (const row of rows) {
            for (const cell of row) {
                finalString += cell.getValue().toString() + " "
            }

            finalString += "\n"
        }

        console.log(finalString)
    }

    public solveByBacktracking() {
        let foundSolution = false
        let currentCell = this.getFirstEmptyCell()

        const nextCell = () => {
            while (true) {
                if (currentCell.getIndex() === 80) {
                    foundSolution = true
                    return false
                }

                currentCell = this.getCellFromIndex(currentCell.getIndex() + 1)

                if (!currentCell.isClue()) {
                    return true
                }
            }
        }

        const previousCell = () => {
            currentCell.setValue(0)
            while (true) {
                currentCell = this.getCellFromIndex(currentCell.getIndex() - 1)

                if (!currentCell.isClue()) {
                    return true
                }
            }
        }


        while (!foundSolution) {
            const newValue = currentCell.incrementValue()
            const isNewValueValid = currentCell.testCurrentValue()

            if (newValue > 9) {
                previousCell()
                continue
            }

            if (isNewValueValid && newValue !== 0) {
                nextCell()
            }
            
        }

        console.log("solved")
    }
}