import SudokuCell from './SudokuCell'

export default class Sudoku {
	private rows: SudokuCell[][] // Array of arrays of SudokuCells

	constructor (sudokuData: string) {
		// Input example: sudokuData = "500003000060002401080100095008007600240000900073416002090070360001050208007340000"
		if (sudokuData.length !== 81) {
			throw new Error('Invalid sudoku string')
		}

		const rows = []
		// Populate rows array with arrays of sudokucells
		for (let y = 0; y < 9; y++) {
			// y is the coordinate of a row
			const row: SudokuCell[] = []

			for (let x = 0; x < 9; x++) {
				const value = parseInt(sudokuData[y * 9 + x])

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

	public getAllRows () {
		return this.rows
	}

	public getAllColumns () {
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

	public getAllRowValues () {
		// Gets all the rows, not in SudokuCell[][] form, but in number[][] form
		return this.getAllRows().map(row => {
			return row.map(cell => {
				return cell.getValue()
			})
		})
	}

	public getAllColumnValues () {
		// Gets all columns in number[][] form
		return this.getAllColumns().map(col => {
			return col.map(cell => {
				return cell.getValue()
			})
		})
	}

	public getColumn (x: number) {
		return this.getAllColumns()[x]
	}

	public getRow (y: number) {
		return this.rows[y]
	}

	public getCellFromCoord (x: number, y: number) {
		// Gets a cell from the coordinate x, y
		return this.rows[y][x] // [y][x] because the rows are stored, and a row is a y coord
	}

	public getCellFromIndex (index: number) {
		// An index is a number between 0 and 80, rowCoord = floor(index / 9), colCoord = index - rowCoord * 9
		const yCoord = Math.floor(index / 9)
		const xCoord = index - yCoord * 9

		return this.getCellFromCoord(xCoord, yCoord)
	}

	public toString () {
		// Parses a Sudoku as a sudoku string which can be used to construct a new Sudoku object
		let finalString = ''

		for (const row of this.rows) {
			for (const cell of row) {
				finalString += cell.getValue()
			}
		}

		return finalString
	}

	private getFirstEmptyCell () {
		// Gets first cell of a sudoku that wasn't already given from the beginning
		let index = 0

		while (true) {
			const cell = this.getCellFromIndex(index)

			if (!cell.isClue()) {
				return cell
			}

			index++
		}
	}

	public display () {
		// Displays sudoku in the console
		const rows = this.rows
		let finalString = ''

		for (const row of rows) {
			for (const cell of row) {
				finalString += cell.getValue().toString() + ' '
			}

			finalString += '\n'
		}

		console.log(finalString)
	}

	public toHTMLTable () {
		// Converts sudoku to a html table string
		let table = '<table>'

		for (const row of this.rows) {
			table += '<tr>'
			for (const cell of row) {
				table += `<td><input disabled value="${cell.getValue()}"></td>`
			}
			table += '</tr>'
		}

		table += '</table>'

		return table
	}

	public isSolved () {
		// Iterates through every cell and checks if any values remain empty
		return !this.rows.flat().find(cell => {
			return cell.getValue() === 0
		})
	}

	public solveLoneSingles () {
		// Gets all cells that have only one possibility and fills in that possibility, repeats until all cells have more than 1 possibility or the puzzle is solved
		let solvedAllLoneSingles = false
		let solvedAnyLoneSingle = false

		while (!solvedAllLoneSingles) {
			let solvedAtLeastOne = false

			for (const row of this.rows) {
				for (const cell of row) {
					if (cell.isClue()) continue
					// A candidate is a possible value that can be entered in a certain cell
					const candidates = cell.getAllCandidates()

					if (candidates.length === 1) {
						cell.setValue(candidates[0]) // If there is only 1 candidate, that candidate will always be the first one in the array
						cell.makeImmutable() // Make sure this cell isn't overwritten if we have to backtrack later
						solvedAtLeastOne = true
						solvedAnyLoneSingle = true
					}
				}
			}

			if (!solvedAtLeastOne) {
				solvedAllLoneSingles = true
			}
		}

		return solvedAnyLoneSingle
	}

	public solveHiddenSingles () {
		let solvedAllHiddenSingles = false
		let solvedAnyHiddenSingle = false

		while (!solvedAllHiddenSingles) {
			let solvedAtLeastOne = false

			for (const row of this.rows) {
				for (const cell of row) {
					if (cell.isClue()) continue
					const ownCandidates = cell.getAllCandidates()
					for (const ownCandidate of ownCandidates) {
						const row = cell.getRow()
						const col = cell.getColumn()
						const subgrid = cell.getSubgrid()

						const candidatesFromCell = (inputCell: SudokuCell) => {
							if (!inputCell.isClue() && inputCell !== cell) {
								return inputCell.getAllCandidates()
							}
						}

						const rowCandidates = row.map(candidatesFromCell).flat()
						const colCandidates = col.map(candidatesFromCell).flat()
						const subgridCandidates = subgrid.map(candidatesFromCell).flat()

						const rowHasCandidate = rowCandidates.includes(ownCandidate)
						const colHasCandidate = colCandidates.includes(ownCandidate)
						const subgridHasCandidate = subgridCandidates.includes(ownCandidate)

						if (!rowHasCandidate || !colHasCandidate || !subgridHasCandidate) {
							cell.setValue(ownCandidate)
							cell.makeImmutable()
							console.log('Solved hidden single')
							solvedAtLeastOne = true
							solvedAnyHiddenSingle = true
						}
					}
				}
			}

			if (!solvedAtLeastOne) {
				solvedAllHiddenSingles = true
			}
		}

		return solvedAnyHiddenSingle
	}

	public solveByBacktracking () {
		let foundSolution = false
		let currentCell = this.getFirstEmptyCell()

		// TODO: make nextCell and previousCell methods of SudokuCell instead of defining them here
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

		// Disable because foundSolution is modified in the functions
		// eslint-disable-next-line no-unmodified-loop-condition
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

		console.log('solved')
	}

	public solve () {
		const timeMeasureStart = performance.now()

		// Use hidden singles / lone singles method until we get stuck
		while (true) {
			const foundLoneSingle = this.solveLoneSingles()
			const foundHiddenSingle = this.solveHiddenSingles()

			if (!foundLoneSingle && !foundHiddenSingle) {
				break
			}
		}

		// Use backtracking if the puzzle hasn't been solved yet
		if (!this.isSolved()) {
			console.log('Started backtracking')
			this.display()
			this.solveByBacktracking()
		}

		const timeMeasureEnd = performance.now()
		const time = timeMeasureEnd - timeMeasureStart
		console.log(`Solved in ${time}ms`)
	}
}
