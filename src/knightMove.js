export class knightMove {
  //Grid
  allGrid = document.querySelectorAll('.grid-item');

  //button
  placeButton = document.querySelector('.place-knight');
  clearButton = document.querySelector('.clear');
  randomButton = document.querySelector('.random-knight');

  placeMode = false;
  isKnightOnBoard = false;

  chessboard = Array.from({ length: 8 }, () =>
    Array.from({ length: 8 }, () => '')
  );

  constructor() {
    this.switchKnight();
    this.switchOff();
    this.placeKnight();
  }

  //Place Knight on a grid
  placeKnight() {
    this.allGrid.forEach((element, index) => {
      element.addEventListener('click', (e) => {
        if (this.placeMode === true && this.isKnightOnBoard === false) {
          const img = document.createElement('img');
          img.classList.add('knight-icon');
          img.src = 'images/knighticon.png';

          element.appendChild(img);

          this.isKnightOnBoard = true;
          //Update array where the horse icon is
          this.updateArray(element, index);
        }
      });
    });
  }

  updateArray(element, index) {
    const row = Math.floor(index / 8);
    const col = index % 8;
    this.chessboard[row][col] = 'Icon';
    console.log(this.chessboard);
  }

  //Click on place knight button to allow placing
  switchKnight() {
    this.placeButton.addEventListener('click', (e) => {
      this.placeMode = true;
    });
  }

  switchOff() {
    this.clearButton.addEventListener('click', (e) => {
      this.chessboard = this.chessboard.map((row) => row.map(() => ''));
      this.removeKnight();
      this.isKnightOnBoard = false;
      this.placeMode = false;
      console.log(this.chessboard);
    });
  }

  /*Helper Method*/

  //Remove KnightIcon
  removeKnight() {
    const knightIcon = document.querySelectorAll('.knight-icon');
    knightIcon.forEach((element) => {
      element.remove();
    });
  }
}
