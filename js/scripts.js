
$(document).ready(function() {

  // board = [[], [], [], [], [], [], []];
  // var height = 5;
  // var ex = true;

function Board(cols, rows, winNumber) {
  this.height = parseInt(rows) - 1;    //?????
  this.board = [];
  for (var i = 0; i < parseInt(cols); i++) {
    this.board.push([]);
  }
  this.winStringX = "";
  this.winStringO = "";
  for (var i = 0; i < parseInt(winNumber); i++) {
    this.winStringX = this.winString.concat("x");
    this.winStringO = this.winString.concat("o");
  }
  this.ex = true;
}

  Board.prototype.drawBoard = function() {
    $("#board").empty();
    var appendedText = "<p>";
    for (var row = 0; row <= this.height; row++) {
      for (var col = 0; col < this.board.length; col++) {
        if (this.board[col][this.height-row] != undefined) {
          appendedText = appendedText.concat("| " + this.board[col][this.height-row] + " ");
        } else {
          appendedText = appendedText.concat("| - ");
        }
      }
      appendedText = appendedText.concat("| <br>");
    }
    appendedText = appendedText.concat("</p>");
    $("#board").append(appendedText);
  }

  Board.prototype.placePiece = function(position) {
    if (this.board[position].length <= this.height) {
      if (this.ex) {
        this.board[position].push("x");
      } else {
        this.board[position].push("o");
      }
    } else {
      alert("Invalid Move");
    }
  }

  Board.prototype.checkForWin = function(x, y) {
    console.log("NEW TURN");
    //check horizontal
    var horizontal = "";
    for (var row = x-3; row <= x+3; row++) {
      if (this.board[row] != undefined && this.board[row][y] != undefined) {
        horizontal = horizontal.concat(this.board[row][y]);
      } else {
        horizontal = horizontal.concat("-");
      }
    }
    console.log(horizontal);
    //check vertical
    var vertical = "";
    for (var col = y-3; col <= y+3; col++) {
      if (this.board[x] != undefined && this.board[x][col] != undefined) {
        vertical = vertical.concat(this.board[x][col]);
      } else {
        vertical = vertical.concat("-");
      }
    }
    console.log(vertical);
    //check diagonal up and down
    var diagonalUp = "";
    var diagonalDown = "";
    for (var num = -3; num <= 3; num++) {
      //diagonal up
      if (this.board[x+num] != undefined && this.board[x+num][y+num] != undefined) {
        diagonalUp = diagonalUp.concat(this.board[x+num][y+num]);
      } else {
        diagonalUp = diagonalUp.concat("-");
      }
      // diagonal down
      if (this.board[x+num] != undefined && this.board[x+num][y-num] != undefined) {
        diagonalDown = diagonalDown.concat(this.board[x+num][y-num]);
      } else {
        diagonalDown = diagonalDown.concat("-");
      }
    }
    console.log(diagonalUp);
    console.log(diagonalDown);

    if (vertical.search("xxxx") != -1 || vertical.search("oooo") != -1) {
      alert("Vertical Win");
      return true;
    } else if (horizontal.search(this.winStringX) != -1 || horizontal.search(this.winStringO) != -1) {
      alert("Horizontal Win");
      return true;
    } else if (diagonalUp.search(this.winStringX) != -1 || diagonalUp.search(this.winStringO) != -1) {
      alert("Diagonal-Up Win");
      return true;
    } else if (diagonalDown.search(this.winStringX) != -1 || diagonalDown.search(this.winStringO) != -1) {
      alert("Diagonal-Down Win");
      return true;
    }
    return false;
  }

  Board.prototype.isTie = function() {
    for (var i = 0; i < this.board.length; i++) {
      if (this.board[i].length <= this.height) {
        return false;
      }
    }
    return true;
  }

  Board.prototype.getPlayer = function() {
    if (this.ex) {
      return "X"
    } else {
      return "O"
    }
  }

  var gameBoard = new Board(7, 6, 4);
  console.log(gameBoard.board);
  gameBoard.drawBoard();
  $("#message").text(gameBoard.getPlayer() + "'s Turn");

  $("form").submit(function(event){
    event.preventDefault();
    var place = parseInt($("input:radio[name=col]:checked").val());
    gameBoard.placePiece(place);
    gameBoard.drawBoard();
    if (gameBoard.checkForWin(place, gameBoard.board[place].length-1)) {
      $("#message").text(gameBoard.getPlayer() + " Wins!");
    } else if (gameBoard.isTie()) {
      $("#message").text("Tie Game!");
    } else {
      $("#message").text(gameBoard.getPlayer() + "'s Turn");
    }
    gameBoard.ex = !gameBoard.ex;
  });
});
