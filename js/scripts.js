
$(document).ready(function() {

  board = [[], [], [], [], [], [], []];
  var height = 6;
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

  drawBoard();
  $("form").submit(function(event){
    event.preventDefault();
    var place = $("input:radio[name=col]:checked").val();
    if (ex) {
      board[place].push("x");
    } else {
      board[place].push("o");
    }
    ex = !ex;
    drawBoard();
  });
});
