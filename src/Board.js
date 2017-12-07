// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //this._currentAttributes; // the chess board object
      var result = this._currentAttributes[rowIndex].slice(); // 1 row of the chess board
      //[1, 0, 0]
      if (result.indexOf(1) !== -1) {
        result.splice(result.indexOf(1), 1);
        //[0, 0]
        if (result.indexOf(1) !== -1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      for (var i = 0; i < this._currentAttributes.n; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //console.log(this._currentAttributes);
      var chessBoard = this._currentAttributes;
      //[row][colIndex]
      var found = false;
      
      for (var i = 0; i < chessBoard.n; i++) {
        if (chessBoard[i][colIndex] === 1 && found === false) {
          found = true;
        } else if (chessBoard[i][colIndex] === 1 && found === true) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this._currentAttributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // console.log(majorDiagonalColumnIndexAtFirstRow);
      var chessBoard = this._currentAttributes;
      var column = majorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diagonalValues = [];
      if (majorDiagonalColumnIndexAtFirstRow < 0) {
        column = 0;
        row = Math.abs(majorDiagonalColumnIndexAtFirstRow);
      }
      // console.log(majorDiagonalColumnIndexAtFirstRow, '. Row: ', row, '. Column: ', column);
      while (row < chessBoard.n && column < chessBoard.n) {
        diagonalValues.push(chessBoard[row][column]);
        column++;
        row++;
      }
      // console.log(diagonalValues);
      if (diagonalValues.indexOf(1) !== -1) {
        diagonalValues.splice(diagonalValues.indexOf(1), 1);
        //[0, 0]
        if (diagonalValues.indexOf(1) !== -1) {
          return true;
        }
      }
      return false; // fixme
      // console.log('Parameter: ', majorDiagonalColumnIndexAtFirstRow, 
      //             '. Starting Position column: ', column, 
      //             '. Starting Position row: ', row,
      //             '. Value', chessBoard[column][row]);
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (var i = 1 - this._currentAttributes.n; i < this._currentAttributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      console.log('MinorD Column:', minorDiagonalColumnIndexAtFirstRow);
      var chessBoard = this._currentAttributes;
      var column = minorDiagonalColumnIndexAtFirstRow;
      var row = 0;
      var diagonalValues = [];
      
      // Convert the right most column, except the top most block
      if (minorDiagonalColumnIndexAtFirstRow > 3) {
        row = minorDiagonalColumnIndexAtFirstRow - chessBoard.n + 1;
        column = chessBoard.n - 1;
      }
      // console.log(minorDiagonalColumnIndexAtFirstRow, ' . row: ', row, ' . column: ', column);
      // console.log(minorDiagonalColumnIndexAtFirstRow, '. Row: ', row, '. Column: ', column);
      while (row < chessBoard.n && column > -1) {
        // console.log(minorDiagonalColumnIndexAtFirstRow, '. row: ', row, '. column: ', column);
        diagonalValues.push(chessBoard[row][column]);
        column--;
        row++;
      }
      // console.log(diagonalValues);
      if (diagonalValues.indexOf(1) !== -1) {
        diagonalValues.splice(diagonalValues.indexOf(1), 1);
        if (diagonalValues.indexOf(1) !== -1) {
          return true;
        }
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (var i = 0; i < this._currentAttributes.n + this._currentAttributes.n - 1; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
