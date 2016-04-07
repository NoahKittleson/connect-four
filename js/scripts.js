
$(document).ready(function() {

  board = [[], [], [], [], [], [], []];
  var height = 5;
  var ex = true;

  function drawBoard() {
    $("#board").empty();
    var appendedText = "<p>";
    for (var row = 0; row <= height; row++) {
      for (var col = 0; col < board.length; col++) {
        if (board[col][height-row] != undefined) {
          appendedText = appendedText.concat("| " + board[col][height-row] + " ");
        } else {
          appendedText = appendedText.concat("| - ");
        }
      }
      appendedText = appendedText.concat("| <br>");
    }
    appendedText = appendedText.concat("</p>");
    $("#board").append(appendedText);
  }

  function placePiece(position) {
    if (board[position].length <= height) {
      if (ex) {
        board[position].push("x");
      } else {
        board[position].push("o");
      }
    } else {
      alert("Invalid Move");
    }
  }

  function checkForWin(x, y) {
    console.log("NEW TURN");
    //check horizontal
    var horizontal = "";
    for (var row = x-3; row <= x+3; row++) {
      if (board[row] != undefined && board[row][y] != undefined) {
        horizontal = horizontal.concat(board[row][y]);
      } else {
        horizontal = horizontal.concat("-");
      }
    }
    console.log(horizontal);
    //check vertical
    var vertical = "";
    for (var col = y-3; col <= y+3; col++) {
      if (board[x] != undefined && board[x][col] != undefined) {
        vertical = vertical.concat(board[x][col]);
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
      if (board[x+num] != undefined && board[x+num][y+num] != undefined) {
        diagonalUp = diagonalUp.concat(board[x+num][y+num]);
      } else {
        diagonalUp = diagonalUp.concat("-");
      }
      // diagonal down
      if (board[x+num] != undefined && board[x+num][y-num] != undefined) {
        diagonalDown = diagonalDown.concat(board[x+num][y-num]);
      } else {
        diagonalDown = diagonalDown.concat("-");
      }
    }
    console.log(diagonalUp);
    console.log(diagonalDown);

    if (vertical.search("xxxx") != -1 || vertical.search("oooo") != -1) {
      alert("Vertical Win");
      return true;
    } else if (horizontal.search("xxxx") != -1 || horizontal.search("oooo") != -1) {
      alert("Horizontal Win");
      return true;
    } else if (diagonalUp.search("xxxx") != -1 || diagonalUp.search("oooo") != -1) {
      alert("Diagonal-Up Win");
      return true;
    } else if (diagonalDown.search("xxxx") != -1 || diagonalDown.search("oooo") != -1) {
      alert("Diagonal-Down Win");
      return true;
    }
    return false;
  }

  function getPlayer() {
    if (ex) {
      return "X"
    } else {
      return "O"
    }
  }

  drawBoard();
  $("#message").text(getPlayer() + "'s Turn");

  $("form").submit(function(event){
    event.preventDefault();
    var place = parseInt($("input:radio[name=col]:checked").val());
    placePiece(place);
    drawBoard();
    if (checkForWin(place, board[place].length-1)) {
      $("#message").text(getPlayer() + " Wins!");
    } else {
      $("#message").text(getPlayer() + "'s Turn");
    }
    ex = !ex;
  });
});
