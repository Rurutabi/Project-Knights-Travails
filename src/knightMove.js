export class knightMove {
  //Grid
  allGrid = document.querySelectorAll('.grid-item');

  //button
  placeButton = document.querySelector('.place-knight');
  clearButton = document.querySelector('.clear');
  randomButton = document.querySelector('.random-knight');
  endButton = document.querySelector('.select-end');
  searchButton = document.querySelector('.travail');

  //Mode
  placeMode = false;
  isKnightOnBoard = false;
  isBoardRed = false;
  selectendMode = false;

  //Knight movement
  knightMovementRows = [-2, -1, 1, 2, 2, 1, -1, -2];
  knightMovementCols = [-1, -2, -2, -1, 1, 2, 2, 1];
  //Array chessboard
  chessboard = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => [])
  );

  //Global col and row
  starterPosition = null;
  destinationIndex = null;

  //Path
  pathArr = [];

  constructor() {
    this.switchKnight();
    this.switchOff();
    this.placeKnight();
    this.findPath();
    this.adjacencyList();
    this.switchEnd();
    this.placeRandomKnight();
  }

  //Place Knight on a grid
  placeKnight() {
    this.allGrid.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        this.handleGridClick(element, index);
      });
    });
  }

  placeRandomKnight() {
    this.randomButton.addEventListener('click', () => {
      if (this.isKnightOnBoard === false) {
        const randomNumber = Math.floor(Math.random() * 64);

        for (let index = 0; index < this.allGrid.length; index++) {
          if (index === randomNumber) {
            this.createKnight(this.allGrid[index]);
            this.isKnightOnBoard = true;
            this.starterPosition = index;
          }
        }
      }
    });
  }

  handleGridClick(element, index) {
    if (this.placeMode === true && this.isKnightOnBoard === false) {
      this.createKnight(element);

      this.isKnightOnBoard = true;
      this.placeMode = false;
      //Update starter location of the horse
      this.starterPosition = index;
    } else if (
      this.isKnightOnBoard === true &&
      this.selectendMode === true &&
      this.isBoardRed === false
    ) {
      element.classList.add('red');
      this.isBoardRed = true;
      this.destinationIndex = index;
    }
  }

  findPath() {
    this.searchButton.addEventListener('click', (e) => {
      if (this.destinationIndex !== null && this.isKnightOnBoard === true) {
        //Record movement predecessor
        let chessboardInfo = [];
        let cellNumber = 0;

        for (let i = 0; i < this.chessboard.length; i++) {
          chessboardInfo[i] = [];
          for (let j = 0; j < this.chessboard[i].length; j++) {
            chessboardInfo[i][j] = {
              distance: null,
              predecessor: null,
              number: cellNumber++,
            };
          }
        }

        let startRow = this.getRow(this.starterPosition);
        let startCol = this.getCol(this.starterPosition);

        let isVisited = new Set();
        chessboardInfo[startRow][startCol].distance = 0;

        let queue = [this.starterPosition];

        while (queue.length) {
          const current = queue.shift();

          if (!isVisited.has(current)) {
            //Turn current into current row and col
            let currentRow = this.getRow(current);
            let currentCol = this.getCol(current);

            //////////////////////Value found
            if (current === this.destinationIndex) {
              let firstDistance =
                chessboardInfo[currentRow][currentCol].distance;

              // console.log(chessboardInfo[currentRow][currentCol]);
              if (chessboardInfo[currentRow][currentCol].distance !== null) {
                for (let i = 0; i < firstDistance; i++) {
                  let reverseIndex =
                    chessboardInfo[currentRow][currentCol].predecessor;

                  currentRow = this.getRow(reverseIndex);
                  currentCol = this.getCol(reverseIndex);

                  this.pathArr.push(reverseIndex);
                  this.pathArr.reverse();
                  // console.log(this.pathArr);
                }
              }

              this.moveKnight(this.pathArr, current, firstDistance);
            }

            for (
              let i = 0;
              i < this.chessboard[currentRow][currentCol].length;
              i++
            ) {
              let neighbour = this.chessboard[currentRow][currentCol][i];
              let neighbourRow = this.getRow(neighbour);
              let neighbourCol = this.getCol(neighbour);

              if (
                chessboardInfo[neighbourRow][neighbourCol].distance === null
              ) {
                chessboardInfo[neighbourRow][neighbourCol].distance =
                  chessboardInfo[currentRow][currentCol].distance + 1;

                chessboardInfo[neighbourRow][neighbourCol].predecessor =
                  current;
                queue.push(neighbour);
              }
            }
            isVisited.add(current);
          }
        }
      }
    });
  }

  moveKnight(pathArr, target, distance) {
    this.removeKnight();

    //Show in console
    for (let i = 0; i < pathArr.length; i++) {
      if (pathArr[i + 1] !== undefined) {
        console.log('We move from', pathArr[i], 'to', pathArr[i + 1]);
      } else {
        console.log('We move from', pathArr[i], 'to', target);
      }
    }

    console.log('The total distance is ', distance);

    // Simple knight move to target
    for (let i = 0; i < this.allGrid.length; i++) {
      if (i === target) {
        this.createKnight(this.allGrid[i]);
        this.pathArr.length = 0;
      }
    }
    this.starterPosition = target;
    this.removeRed();
    this.isBoardRed = false;
    this.destinationIndex = null;
  }

  //Click on place knight button to allow placing
  switchKnight() {
    this.placeButton.addEventListener('click', (e) => {
      this.placeMode = true;
    });
  }

  switchEnd() {
    this.endButton.addEventListener('click', () => {
      this.selectendMode = true;
    });
  }

  switchOff() {
    this.clearButton.addEventListener('click', (e) => {
      //Create new array, might replace with for loop later
      this.pathArr.length = 0;
      this.removeKnight();
      this.removeRed();
      this.isKnightOnBoard = false;
      this.placeMode = false;
      this.isBoardRed = false;
      this.destinationIndex = null;
    });
  }

  /*Helper Method*/

  removeRed() {
    this.allGrid.forEach((value) => {
      if (value.classList.contains('red')) {
        value.classList.remove('red');
      }
    });
  }

  getRow(index) {
    return Math.floor(index / 8);
  }

  getCol(index) {
    return index % 8;
  }

  getIndex(row, col, numCols) {
    return row * numCols + col;
  }

  createKnight(element) {
    const knightImg = document.createElement('img');
    knightImg.classList.add('knight-icon');
    knightImg.src = 'images/knighticon.png';
    element.appendChild(knightImg);
  }

  //Remove KnightIcon
  removeKnight() {
    document.querySelector('.knight-icon').remove();
  }

  clearArray() {
    this.chessboard = this.chessboard.map((row) => row.map(() => ''));
  }

  isWithinBound(row, col) {
    if (row >= 0 && row < 8 && col >= 0 && col < 8) {
      return true;
    } else {
      return false;
    }
  }

  adjacencyList() {
    const numRows = this.chessboard.length;
    const numCols = this.chessboard[0].length;

    for (let currentRow = 0; currentRow < numRows; currentRow++) {
      for (let currentCol = 0; currentCol < numCols; currentCol++) {
        for (let i = 0; i < this.knightMovementRows.length; i++) {
          const row = currentRow;
          const col = currentCol;

          const newRow = row + this.knightMovementRows[i];
          const newCol = col + this.knightMovementCols[i];

          if (this.isWithinBound(newRow, newCol)) {
            const index = this.getIndex(newRow, newCol, numCols);
            this.chessboard[currentRow][currentCol].push(index);
          }
        }
      }
    }
  }
}
