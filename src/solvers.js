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
  var a = new Date();
  var solutions = [];
  var initialBoard = new Board({n: n});
  var solveBoard = function(board, numPieces, usedCols) {
    // Base case is reached when we hit the number of inputs.
    if (numPieces === n) {
      solutions.push(board.rows());
      return;
    }
    for (var row = numPieces; row < numPieces + 1; row++) {
      for (var col = 0; col < n; col++) {
        if (board.rows()[row][col] !== 1 && usedCols[col] === undefined) {
          // Create a copy of the current board to avoid mutation.
          var copyBoard = _.map(board.rows(), function(item){
            return item.slice();
          });
          var newBoard = new Board(copyBoard);
          newBoard.togglePiece(row, col);
          var copyCol = Object.create(usedCols);
          copyCol[col] = true;
          solveBoard(newBoard, numPieces + 1, copyCol);
        }
      }
    }
  };
  solveBoard(initialBoard, 0, {});
  var solution = solutions[0] || null;
  console.log((new Date() - a)/1000);
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
