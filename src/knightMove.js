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
  selectendMode = false;

  //Knight movement
  knightMovementRows = [-2, -1, 1, 2, 2, 1, -1, -2];
  knightMovementCols = [-1, -2, -2, -1, 1, 2, 2, 1];
  //Array chessboard

  chessboard = Array.from({ length: 8 }, (_, row) =>
    Array.from({ length: 8 }, (_, col) => [])
  );

  //Global col and row
  starterPosition = 0;
  destinationIndex = null;

  constructor() {
    this.switchKnight();
    this.switchOff();
    this.placeKnight();
    this.checkGridLocation();
    this.findPath();
    this.adjacencyList();
    this.switchEnd();
  }

  //Place Knight on a grid
  placeKnight() {
    this.allGrid.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        if (this.placeMode === true && this.isKnightOnBoard === false) {
          this.createKnight(element);

          this.isKnightOnBoard = true;
          this.placeMode = false;
          //Update starter location of the horse
          this.starterPosition = index;
        } else if (
          this.isKnightOnBoard === true &&
          this.selectendMode === true
        ) {
          this.destinationIndex = index;
          console.log(this.destinationIndex);
        }

        const row = this.getRow(index);
        const col = index % 8;
        console.log(this.destinationIndex);
        console.log('Row : ', row, 'Col ', col);
        console.log('-----------------------------------------------');
      });
    });
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

            console.log(
              'Predecessor',
              chessboardInfo[currentRow][currentCol].predecessor
            );
            console.log('We visited', current);

            //Value found
            if (current === this.destinationIndex) {
              console.log(chessboardInfo[currentRow][currentCol]);

              console.log(chessboardInfo);
              console.log('Destination found');
              return;
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

  checkGridLocation() {
    this.travailMode = true;
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
      this.clearArray();
      this.removeKnight();
      this.isKnightOnBoard = false;
      this.placeMode = false;
    });
  }

  /*Helper Method*/

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

  //Delete it later help me find grid number

  checkGridLocation() {
    let temp = -1;
    this.allGrid.forEach((value) => {
      temp++;
      value.textContent = value.textContent + temp;
    });
  }
}

// const row = this.getRow(index);
// const col = index % 8;
// console.log(row, col);
// console.log('-----------------------------------------------');

//Knight movement
// knightMovement = [
//   [-2, -1],
//   [-1, -2],
//   [1, -2],
//   [2, -1],
//   [2, 1],
//   [1, 2],
//   [-1, 2],
//   [-2, 1],
// ];

// knightMovementRows = [-2, -1, 1, 2, 2, 1, -1, -2];
// knightMovementCols = [-1, -2, -2, -1, 1, 2, 2, 1];
