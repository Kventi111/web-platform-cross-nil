document.addEventListener('DOMContentLoaded', function (event) {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let rect = canvas.getClientRects();
  const resetBtn = document.querySelector('.winner_banner__reset__btn');

  const CANVAS_WIDTH = canvas.clientWidth;
  const CANVAS_HEIGHT = canvas.clientHeight;

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, ctx);
  const Ui = new UI(game.pickCross);

  function drawLine(type) {
    const drawLineCords = {
      dioganal1: {
        move: {
          x: 0,
          y: 0,
        },
        pos: {
          x: 400,
          y: 400,
        },
      },
      dioganal2: {
        move: {
          x: 400,
          y: 0,
        },
        pos: {
          x: 0,
          y: 400,
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

    ctx.beginPath();
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;

    console.log(drawLineCords[type]);

    ctx.moveTo(drawLineCords[type].move.x, drawLineCords[type].move.y);
    ctx.lineTo(drawLineCords[type].pos.x, drawLineCords[type].pos.y);
    ctx.stroke();
    ctx.closePath();
  }

  resetBtn.addEventListener('click', game.resetGame);
  canvas.addEventListener('click', (event) => {
    for (let i = 0; i < game.gameGrid.length; i++) {
      for (let j = 0; j < game.gameGrid[i].length; j++) {
        let currentCell = game.gameGrid[i][j];

        if (
          currentCell.isIntersected(
            event.clientX - rect[0].left,
            event.clientY - rect[0].top,
            ctx
          )
        ) {
          currentCell.pick(game.pickCross ? 'x' : 'o', ctx);
          currentCell.pickType = game.pickCross ? 'x' : 'o';
          game.pickCross = !game.pickCross;
        }
      }
    }

    Ui.updatePanelText(game.pickCross);

    const { win, type } = game.checkWinner();

    if (win) {
      drawLine(type);
      Ui.showWinnerBanner(game.pickCross ? 'Победил Крестик' : 'Победил Нолик');
      console.log('win', { type });
    }

    if (game.checkGameGridIsFull()) {
      if (!win) {
        Ui.showWinnerBanner('Победила дружба');
        console.log('nit', { type });
      }
    }
  });
});
