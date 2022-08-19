class Game {
  constructor(width, height, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.gameGrid = [];
    this.pickCross = true;

    this.initGrid(3, 3);
    this.renderGameField(3, 3);
  }

  resetGame = () => {
    const banner = document.querySelector('.winner_banner');
    let gameGrid = this.gameGrid;

    banner.classList.remove('show');

    this.initGrid(3, 3);
    this.renderGameField(gameGrid);
  };

  initGrid = (a, b) => {
    let gameGrid = this.gameGrid;

    for (let i = 0; i < a; i++) {
      gameGrid[i] = [];
      for (let j = 0; j < b; j++) {
        gameGrid[i][j] = new Cell(
          (i * this.width) / 3,
          (j * this.height) / 3,
          this.width / 3,
          this.height / 3,
          null
        );
      }
    }
  };

  renderGameField = () => {
    let gameGrid = this.gameGrid;

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        gameGrid[i][j].show(this.ctx);
      }
    }
  };

  checkWinner = () => {
    let arr = [];
    let gameGrid = this.gameGrid;

    // check dioganal 1
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[i][i].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'dioganal1',
      };
    }
    arr = [];

    // check dioganal 2
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[gameGrid.length - 1 - i][i].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'dioganal2',
      };
    }
    arr = [];

    // check 1 col
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[0][i].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'col1',
      };
    }
    arr = [];

    // check 2 col
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[1][i].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'col2',
      };
    }
    arr = [];

    // check 3 col
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[2][i].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'col3',
      };
    }
    arr = [];

    // check 1 row
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[i][0].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'row1',
      };
    }
    arr = [];

    // check 2 row
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[i][1].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'row2',
      };
    }
    arr = [];

    // check 3 row
    for (let i = 0; i < gameGrid.length; i++) {
      arr.push(gameGrid[i][2].pickType);
    }

    if (arr.every((i) => i === 'x') || arr.every((i) => i === 'o')) {
      return {
        win: true,
        type: 'row3',
      };
    }
    arr = [];

    return {
      win: false,
      type: null,
    };
  };

  checkGameGridIsFull = () => {
    const arr = [];
    let gameGrid = this.gameGrid;

    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        arr.push(gameGrid[i][j].pickType);
      }
    }

    const isFullGrid =
      arr.filter((i) => i !== null).length === gameGrid.length * 3;

    return isFullGrid;
  };
}
