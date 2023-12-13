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
  isKnightOnBoard = false;

  //Knight movement
  knightMovement = [
    [-2, -1],
    [-1, -2],
    [1, -2],
    [2, -1],
    [2, 1],
    [1, 2],
    [-1, 2],
    [-2, 1],
  ];

  //Array chessboard
  chessboard = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => '')
  );

  //Global col and row
  globalRow = 0;
  globalCol = 0;

  constructor() {
    this.switchKnight();
    this.switchOff();
    this.placeKnight();
    this.checkGridLocation();
    this.findPath();
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

          console.log(this.globalRow, this.globalCol);
        }

        const row = Math.floor(index / 8);
        const col = index % 8;
        console.log('row: ' + row + ' col ' + col);
      });
    });
  }

  findPath() {
    this.travailButton.addEventListener('click', (e) => {
      if (this.chessboard === null) return;

      let queue = [this.chessboard];

      const current = queue.shift();
      console.log();
      // while (queue.length) {
      //   const
      // }
    });
  }

  checkGridLocation() {
    this.travailMode = true;
  }
  updateArray(index) {
    const row = Math.floor(index / 8);
    const col = index % 8;

    this.globalRow = row;
    this.globalCol = col;

    // console.log('row : ' + row + ' col :' + col);
    this.chessboard[row][col] = 'Icon';
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

  //Delete it later help me find grid number

  checkGridLocation() {
    let temp = -1;
    this.allGrid.forEach((value) => {
      temp++;
      value.textContent = value.textContent + temp;
    });
  }
}
