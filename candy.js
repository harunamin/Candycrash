var candies = ["Blue", "Green", "orange", "Purple", "Red", "Yellow"];
var board = [];
var rows = 9;
var columns = 9;
var score = 0;

var curreTile;
var otherTile;

window.onload = function() {
    startGame();

    window.setInterval(function() {
        crashCandy();
        slideCnady();
        generateCandy()
    }, 10)
}
function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        let row = [];

        ////// creat img
        for (let c = 0; c < columns; c++) {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            ////DRAG FUNCTION
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("dragend", dragEnd);
            tile.addEventListener("drop", dragDrop);

            document.getElementById("board").appendChild(tile);
            row.push(tile);
        }
        board.push(row);
    }
}
function dragStart() {
    curreTile = this;

}
function dragOver(e) {
    e.preventDefault();

}
function dragEnter(e) {
    e.preventDefault();

}
function dragLeave() {

}
function dragDrop() {
    otherTile = this;

}
function dragEnd() {

    if (curreTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let curreCoords = curreTile.id.split("-");
    let r = parseInt(curreCoords[0]);
    let c = parseInt(curreCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c-1 && r == r2;
    let moveRight = c2 == c+1 && r == r2;

    let moveUp = r2 == r-1 && c == c2;
    let moveDown = r2 == r+1 && c == c2;

    let adjacent = moveLeft || moveRight || moveUp || moveDown;

    if (adjacent) {
        let currImg = curreTile.src;
        let otherImg = otherTile.src;
        curreTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = chechvalid();
        if (!validMove) {
            let currImg = curreTile.src;
            let otherImg = otherTile.src;
            curreTile.src = otherImg;
            otherTile.src = currImg;
        }

    }
}
function crashCandy() {
    crushthree();
    document.getElementById("score").innerText = score
}
function crushthree() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
                score += 3
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./images/blank.png";
                candy2.src = "./images/blank.png";
                candy3.src = "./images/blank.png";
            }

        }
    }
}

function chechvalid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
                return true;
            }

        }
    }
    return false;
}
function slideCnady() {
    for (let c = 0; c < columns; c++) {
        let ind = rows -1;
         for (let r = columns-1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
         }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./images/blank.png"
        }
    }
}
function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = "./images/" + randomCandy() + ".png";
        }
    }
}
