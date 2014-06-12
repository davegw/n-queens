/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solutions = [];
  var initialBoard = new Board({n: n});
  var storage = {};
  var solveBoard = function(board, numPieces) {
    // Base case is reached when we hit the number of inputs.
    var boardKey = JSON.stringify(board.rows());
    if (storage[boardKey]) {
      return;
    }
    storage[boardKey] = true;
    if (numPieces === n) {
      if (!board.hasAnyRooksConflicts()) {
        solutions.push(board.rows());
      }
      return;
    }
    for (var row = numPieces; row < numPieces + 1; row++) {
      for (var col = 0; col < board.rows().length; col++) {
        if (board.rows()[row][col] !== 1) {
          // Create a copy of the current board to avoid mutation.
          var copyBoard = _.map(board.rows(), function(item){
            return item.slice();
          });
          var newBoard = new Board(copyBoard);
          newBoard.togglePiece(row, col);
          solveBoard(newBoard, numPieces + 1);
        }
      }
    }
  };
  solveBoard(initialBoard, 0);
  var solution = solutions || null;

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
