/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, 
// with n rooks placed such that none of them can attack each othe9r
window.findNRooksSolution = function(n) {
  // console.log('this:', this);
  var solution = []; //fixme
  //build cheesboard
  for (var j = 0; j < n; j++) {
    var rowArray = [];
    for (var i = 0; i < n; i++) {
      rowArray.push(0);
    }
    solution.push(rowArray);
  }
  //add rooks to chessboard so they don't conflict
  for (var i = 0; i < n; i++) {
    solution[i][i] = 1;
  }

  //return that solution
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such 
// that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1; //fixme
  var firstSolution = this.findNRooksSolution(n);
  var solutionFinder = function() {
    for (var x = n - 1; x >= 0; x--) {
      //start in bottom row
      var currentRow = firstSolution[x];
      //find 1
      var rookLocation = currentRow.indexOf(1);
      //try to move over 1 until out of board
      if (rookLocation !== (n - 1)) {
        //keep doing things
        //if there is a solution increase the count
      } 
      //else continue the loop at the previous level
      currentRow[rookLocation] = 0;
    }
    //find a solution
    //solutionCount++;
    //adjust the board and recursively call function until no more moves left
  };
  solutionFinder();
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
