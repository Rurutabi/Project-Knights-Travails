export class knightMove {
  //Grid
  allGrid = document.querySelectorAll('.grid-item');

  //button
  placeButton = document.querySelector('.place-knight');
  clearButton = document.querySelector('.clear');
  randomButton = document.querySelector('.random-knight');
  selectButton = document.querySelector('.select-end');
  travailButton = document.querySelector('.travail');

  //Mode
  placeMode = false;
  travailMode = false;
  isKnightOnBoard = false;

  chessboard = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => '')
  );

  globalRow = 0;
  globalCol = 0;

  constructor() {
    this.switchKnight();
    this.switchOff();
    this.placeKnight();
    this.switchTravails();
  }

  //Place Knight on a grid
  placeKnight() {
    this.allGrid.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        if (this.placeMode === true && this.isKnightOnBoard === false) {
          this.createKnight(element);

          this.isKnightOnBoard = true;
          this.placeMode = false;
          //Update array where the horse icon is
          this.updateArray(index);
        } else if (this.travailMode === true && this.isKnightOnBoard === true) {
          if (this.limitMove(index) === true) {
            this.removeKnight();
            //Add before clear?
            this.clearArray();
            //Need to limit how knight move
            this.createKnight(element);
            this.updateArray(index);
            console.log(this.chessboard);
          }
        }
      });
    });
  }

  switchTravails() {
    this.travailButton.addEventListener('click', (e) => {
      this.travailMode = true;
    });
  }

  updateArray(index) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    this.globalRow = row;
    this.globalCol = col;

    console.log('row : ' + row + ' col :' + col);
    this.chessboard[row][col] = 'Icon';
  }

  limitMove(index) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    const isWithinBounds = (r, c) => r >= 0 && r < 8 && c >= 0 && c < 8;

    // Bottom Left
    if (
      isWithinBounds(row - 2, col + 1) &&
      (this.chessboard[row - 2][col + 1] ===
        this.chessboard[this.globalRow][this.globalCol] ||
        this.chessboard[row - 1][col + 2] ===
          this.chessboard[this.globalRow][this.globalCol])
    ) {
      return true;
    }

    // Top Left
    if (
      isWithinBounds(row + 2, col + 1) &&
      (this.chessboard[row + 2][col + 1] ===
        this.chessboard[this.globalRow][this.globalCol] ||
        this.chessboard[row + 1][col + 2] ===
          this.chessboard[this.globalRow][this.globalCol])
    ) {
      return true;
    }

    // Top Right
    if (
      isWithinBounds(row + 2, col - 1) &&
      (this.chessboard[row + 2][col - 1] ===
        this.chessboard[this.globalRow][this.globalCol] ||
        this.chessboard[row + 1][col - 2] ===
          this.chessboard[this.globalRow][this.globalCol])
    ) {
      return true;
    }

    // Bottom Right
    if (
      isWithinBounds(row - 2, col - 1) &&
      (this.chessboard[row - 2][col - 1] ===
        this.chessboard[this.globalRow][this.globalCol] ||
        this.chessboard[row - 1][col - 2] ===
          this.chessboard[this.globalRow][this.globalCol])
    ) {
      return true;
    }

    return false;
  }

  //Click on place knight button to allow placing
  switchKnight() {
    this.placeButton.addEventListener('click', (e) => {
      this.placeMode = true;
    });
  }

  switchOff() {
    this.clearButton.addEventListener('click', (e) => {
      //Create new array, might replace with for loop later
      this.clearArray();
      this.removeKnight();
      this.isKnightOnBoard = false;
      this.placeMode = false;
      console.log(this.chessboard);
    });
  }

  /*Helper Method*/

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
}
