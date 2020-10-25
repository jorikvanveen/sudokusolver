import Sudoku from "./classes/Sudoku"

type axis = "x" | "y"

function main() {
   const sudoku = new Sudoku("000000900090083450040500280000265300000000000006714000074002030083150040002000000")

   // Lost hele sudoku op, heeft nog geen error handling lmao
   sudoku.solveByBacktracking()

   // Dumpt de hele sudoku in de console
   sudoku.display()
}

main()

const allCellInputs = document.querySelectorAll(".sudoku-cell-input")

let cellX: number;
let cellY: number;
let cellCoords: string;

function clickedCell(event:Event) {
   const cell = event.target
   if (!(cell instanceof HTMLInputElement)) return

   cell.style.backgroundColor = "rgba(0, 0, 0, 0.07)"

   cellX = parseInt(cell.value.charAt(1)); //x coord van cell, oftewel de 2e character
   cellY = parseInt(cell.value.charAt(0)); // y coord
}

function changeInput(event:InputEvent) {
   const cell = event.target

   if (!(cell instanceof HTMLInputElement)) return
   const number = parseInt(event.data)

   if ((number > 9 || number < 1) || number.toString() === "NaN") {
      cell.value = "";
   } else {
      cell.value = number.toString()
   }

   var output = document.getElementById('output');

   const inputSudoku = new Sudoku(getSudokuString());
   
   alert(inputSudoku.getRow(cellY - 1));
}

function lostFocus(event:Event) {
   const cell = event.target
   if (!(cell instanceof HTMLInputElement)) return
   cell.style.backgroundColor = "rgb(255, 255, 255)"
}

allCellInputs.forEach(cellInput => {
   cellInput.addEventListener("focus", clickedCell)
   cellInput.addEventListener("input", changeInput)
   cellInput.addEventListener("blur", lostFocus)
})

function moveFocus(axis:axis, moveDirection:number) {
   const currentlyFocusedElement = document.activeElement
   if (currentlyFocusedElement.className !== "sudoku-cell-input") return
   if (!(currentlyFocusedElement instanceof HTMLInputElement)) return

   if (axis === "x") {
      const newCoordinate = parseInt(currentlyFocusedElement.id.charAt(0)) + moveDirection
      const idToFocus = newCoordinate.toString() + currentlyFocusedElement.id.charAt(1)
      const elemToFocus = document.getElementById(idToFocus)

      if (elemToFocus instanceof HTMLInputElement) {
         elemToFocus.focus()
      }
   } else if (axis === "y") {
      const newCoordinate = parseInt(currentlyFocusedElement.id.charAt(1)) + moveDirection
      const idToFocus = currentlyFocusedElement.id.charAt(0) + newCoordinate.toString()
      const elemToFocus = document.getElementById(idToFocus)

      if (elemToFocus instanceof HTMLInputElement) {
         elemToFocus.focus()
      }
   }
}

function onKeyDown(event:KeyboardEvent) {
   const key = event.key
   switch (key) {
      case "ArrowLeft":
         moveFocus("y", -1)
         break
      case "ArrowRight":
         moveFocus("y", 1)
         break
      case "ArrowUp":
         event.preventDefault()
         moveFocus("x", -1)
         break
      case "ArrowDown":
         event.preventDefault()
         moveFocus("x", 1)
         break
   }
}

document.addEventListener("keydown", onKeyDown)

document.getElementById('knop').addEventListener("click", getSudokuString)

function getSudokuString() {
    var cellsA = document.querySelectorAll('td > input');
    var sudokuString = '';

    cellsA.forEach(cell => {
        if (!(cell instanceof HTMLInputElement)) return
        if (cell.value == '') {
            sudokuString += "0";
            return
        }
        sudokuString += cell.value;
    })

    return sudokuString;
    document.getElementById('output').innerHTML = sudokuString;
}