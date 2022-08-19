class Game {
  constructor(width, height, col, row, ctx) {
    this.width = width;
    this.height = height;
    this.ctx = ctx;

    this.gameGrid = [];
    this.pickCross = true;

    this.col = col || 3;
    this.row = row || 3;

    this.initGrid();
    this.renderGameField();
  }

  drawLine = (type) => {
    const drawLineCords = {
      dioganal1: {
        move: {
          x: 0,
          y: 0,
        },
        pos: {
          x: this.width,
          y: this.height,
        },
      },
      dioganal2: {
        move: {
          x: this.width,
          y: 0,
        },
        pos: {
          x: 0,
          y: this.height,
        },
      },
      col1: {
        move: {
          x: 66,
          y: 0,
        },
        pos: {
          x: 66,
          y: 400,
        },
      },
      col2: {
        move: {
          x: 199,
          y: 0,
        },
        pos: {
          x: 199,
          y: 400,
        },
      },
      col3: {
        move: {
          x: 331,
          y: 0,
        },
        pos: {
          x: 331,
          y: 400,
        },
      },
      row1: {
        move: {
          x: 400,
          y: 66,
        },
        pos: {
          x: 0,
          y: 66,
        },
      },
      row2: {
        move: {
          x: 400,
          y: 199,
        },
        pos: {
          x: 0,
          y: 199,
        },
      },
      row3: {
        move: {
          x: 400,
          y: 331,
        },
        pos: {
          x: 0,
          y: 331,
        },
      },
    };

    this.ctx.beginPath();
    this.ctx.strokeStyle = 'red';
    this.ctx.moveTo(drawLineCords[type].move.x, drawLineCords[type].move.y);
    this.ctx.lineTo(drawLineCords[type].pos.x, drawLineCords[type].pos.y);
    this.ctx.stroke();
    this.ctx.closePath();
  };

  resetGame = () => {
    const banner = document.querySelector('.winner_banner');
    banner.classList.remove('show');

    this.initGrid();
    this.renderGameField();
  };

  initGrid = () => {
    let gameGrid = this.gameGrid;

    for (let i = 0; i < this.col; i++) {
      gameGrid[i] = [];
      for (let j = 0; j < this.row; j++) {
        gameGrid[i][j] = new Cell(
          (i * this.width) / this.col,
          (j * this.height) / this.row,
          this.width / this.col,
          this.height / this.row,
          null
        );
      }
    }

    console.log({ gameGrid });
  };

  renderGameField = () => {
    let gameGrid = this.gameGrid;

    for (let i = 0; i < gameGrid.length; i++) {
      for (let j = 0; j < gameGrid[i].length; j++) {
        gameGrid[i][j].show(this.ctx);
      }
    }

    console.log({ gameGrid });
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
      arr.filter((i) => i !== null).length === gameGrid.length * this.col;

    return isFullGrid;
  };
}
