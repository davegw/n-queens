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
  var startTime = new Date();
  var solutions = [];
  // New Board is defined in Board.js. It is being used here to create an empty array.
  var emptyBoard = new Board({n: n});

  // SolveBoard recursively creates an array of solutions represented as matrices.
  var solveBoard = function(board, numPieces, usedCols, usedDiags) {
    // Base case is reached when the final piece is placed.
    if (numPieces === n) {
      return solutions.push(board);
    }

    // Only one piece is placed per row. Each row is evaluated separately based on the piece number currently being placed.
    // i.e. If we've placed three pieces we'll be on the fourth row (index position 3).
    var row = numPieces;
    for (var col = 0; col < n; col++) {
      if (usedCols[col] === undefined && usedDiags[[row, col]] === undefined) {
        board[row][col] = 1;
        usedCols[col] = true;
        // Create a copy of the current set of used diagonals to avoid mutation.
        var copyDiags = Object.create(usedDiags);
        updateDiagConflicts(copyDiags, row, col);
        // Make recursive call to next available position in the next row.
        solveBoard(board, numPieces + 1, usedCols, copyDiags);
        // Reset board and usedCols to positions before recursive call.
        board[row][col] = 0;
        delete usedCols[col];
      }
    }
  };

  var updateDiagConflicts = function(copyDiags, row, col) {
    for (var diagPos = 1; diagPos < (n - row); diagPos++) {
      var majorDiag = col + diagPos;
      var minorDiag = col - diagPos;
      // Discard out of bounds conflicts.
      if (minorDiag < n) {
        var majorDiagKey = [(row + diagPos), (majorDiag)];
        copyDiags[majorDiagKey] = true;
      }
      if (minorDiag >= 0) {
        var minorDiagKey = [(row + diagPos), (minorDiag)];
        copyDiags[minorDiagKey] = true;
      }
    }
  };

  solveBoard(emptyBoard.rows(), 0, {}, {});
  // Return an empty n x n board if no solution found.
  var solution = solutions.length || emptyBoard.rows();
  console.log((new Date() - startTime)/1000);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
