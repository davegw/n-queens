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
      solutions.push(board);
      return;
    }
    for (var row = numPieces; row < numPieces + 1; row++) {
      for (var col = 0; col < n; col++) {
        if (board[row][col] !== 1 && usedCols[col] === undefined) {
          // Create a copy of the current board to avoid mutation.
          var newBoard = _.map(board, function(item){
            return item.slice();
          });
          newBoard[row][col] = 1;
          var copyCol = Object.create(usedCols);
          copyCol[col] = true;
          solveBoard(newBoard, numPieces + 1, copyCol);
        }
      }
    }
  };
  solveBoard(initialBoard.rows(), 0, {});
  var solution = solutions[0] || initialBoard.rows();
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
  var a = new Date();
  var solutions = [];
  var initialBoard = new Board({n: n});
  var solveBoard = function(board, numPieces, usedCols, usedDiags) {
    // Base case is reached when we hit the number of inputs.
    if (numPieces === n) {
      solutions.push(board);
      return;
    }
    for (var row = numPieces; row < numPieces + 1; row++) {
      for (var col = 0; col < n; col++) {
        if (board[row][col] !== 1 && usedCols[col] === undefined && usedDiags[[row, col]] === undefined) {
          // Create a copy of the current board to avoid mutation.
          var newBoard = _.map(board, function(item){
            return item.slice();
          });
          newBoard[row][col] = 1;
          var copyCol = Object.create(usedCols);
          copyCol[col] = true;
          var copyDiags = Object.create(usedDiags);
          for (var diagPos = 1; diagPos < (n - row); diagPos++) {
            var majorDiag = col + diagPos;
            var minorDiag = col - diagPos;
            if (minorDiag < n) {
              var majorDiagKey = [(row + diagPos), (majorDiag)];
              copyDiags[majorDiagKey] = true;
            }
            if (minorDiag >= 0) {
              var minorDiagKey = [(row + diagPos), (minorDiag)];
              copyDiags[minorDiagKey] = true;
            }
          }
          solveBoard(newBoard, numPieces + 1, copyCol, copyDiags);
        }
      }
    }
  };
  solveBoard(initialBoard.rows(), 0, {}, {});
  var solution = solutions.length || initialBoard.rows();
  console.log((new Date() - a)/1000);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
