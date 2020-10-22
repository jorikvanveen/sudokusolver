var cellX;
var cellY;
var cellCoords;

function clickedCell(cell) {
    cellX = parseInt(cell.charAt(1)); //x coord van cell, oftewel de 2e character
    cellY = parseInt(cell.charAt(0)); // y coord
}

document.onkeydown = checkKey;

function checkKey(e) {

    e = e || window.event;

    switch (e.keyCode) {
        case 38: //up
            e.preventDefault();
            moveY(-1);
            break;
        case 40: //down
            e.preventDefault();
            moveY(1);
            break;
        case 37: //left
            moveX(-1);
            break;
        case 39: //right
            moveX(1);
            break;
    }
}

function moveY(direction) {
    cellY = cellY + direction; //1 omhoog
    cellCoords = cellY.toString() + cellX.toString(); //maakt het samen een string
    document.getElementById(cellCoords).focus(); //focused op het id met die coords
}

function moveX(direction) {
    cellX = cellX + direction;
    cellCoords = cellY.toString() + cellX.toString();
    document.getElementById(cellCoords).focus();
}