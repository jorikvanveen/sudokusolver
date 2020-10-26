import Coordinate from './Coordinate'
import Sudoku from './Sudoku'

export default class SudokuCell {
	private coords: Coordinate
	private value: number
	private clue: boolean
	private parentSudoku: Sudoku

	constructor (x: number, y: number, value: number, parentSudoku: Sudoku) {
		this.coords = new Coordinate(x, y)
		this.value = value
		this.clue = value !== 0
		this.parentSudoku = parentSudoku
	}

	public getValue ():number {
		return this.value
	}

	public setValue (newValue:number) {
		this.value = newValue
	}

	public getCoords () {
		return this.coords
	}

	// No set method for coords

	public isClue () {
		return this.clue
	}

	// No set method for clue

	public getParentSudoku () {
		return this.parentSudoku
	}

	// No set method for parent

	public getRow () {
		return this.parentSudoku.getRow(this.coords.y)
	}

	public getColumn () {
		return this.parentSudoku.getColumn(this.coords.x)
	}

	public getSubgrid () {
	// Get square coordinate
		const squareYCoord = Math.floor(this.coords.x / 3) // X and Y are switched around because this.rows[y][x]
		const squareXCoord = Math.floor(this.coords.y / 3)
		const squareCoord = new Coordinate(squareXCoord, squareYCoord)

		// Calculate the x and y ranges that will return the cells cells in the square when combined
		const xIndexes = [0, 1, 2].map(baseIndex => (baseIndex + squareCoord.x * 3))
		const yIndexes = [0, 1, 2].map(baseIndex => (baseIndex + squareCoord.y * 3))

		// First y because only rows are stored, colums are not (rows[y][x] -> correct | rows[x][y] -> incorrect)
		const rows = this.parentSudoku.getAllRows()
		const validRows:SudokuCell[][] = []

		// Get all rows that are in the range (xIndexes)
		for (const index in rows) {
			if (xIndexes.includes(parseInt(index))) {
				validRows.push(rows[index])
			}
		}

		const validCells:SudokuCell[] = []

		// Get all cells that are in valid rows and are in the y range (yIndexes)
		for (const validRow of validRows) {
			for (const cellIndex in validRow) {
				if (yIndexes.includes(parseInt(cellIndex))) {
					validCells.push(validRow[cellIndex])
				}
			}
		}

		return validCells
	}

	public incrementValue () {
		this.value = this.value + 1
		return this.value
	}

	public testValue (valueToTest:number = this.value) {
		let mapper = (cell:SudokuCell) => {
			return cell.value === valueToTest && cell.coords !== this.coords
		}

		mapper = mapper.bind(this)

		// [SudokuCell, SudokuCell, SudokuCell] -> [4, 6, 0]
		const row = this.getRow()
		const col = this.getColumn()
		const subgrid = this.getSubgrid()

		const foundInRow = typeof row.find(mapper) !== 'undefined'
		const foundInCol = typeof col.find(mapper) !== 'undefined'
		const foundInSubgrid = typeof subgrid.find(mapper) !== 'undefined'

		// console.log(valueToTest, foundInRow, foundInCol, foundInSubgrid)
		// console.log(row, col, subgrid)

		const isValidCandidate = !foundInRow && !foundInCol && !foundInSubgrid

		// console.log(this.getIndex(), this.coords, valueToTest, this.value, isValidCandidate)

		return isValidCandidate
	}

	public testCurrentValue () {
		return this.testValue()
	}

	public getAllCandidates () {
		const candidates:number[] = []

		for (let i = 1; i <= 9; i++) {
			const isValidCandidate = this.testValue(i)
			if (isValidCandidate) {
				if (candidates.includes(i)) continue
				candidates.push(i)
			}
		}

		return candidates
	}

	public getIndex () {
		return this.coords.y * 9 + this.coords.x
	}

	public makeImmutable () {
		this.clue = true
	}
}
