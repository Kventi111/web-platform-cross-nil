document.addEventListener('DOMContentLoaded', function (event) {
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let rect = canvas.getClientRects();
  const resetBtn = document.querySelector('.winner_banner__reset__btn');

  const CANVAS_WIDTH = canvas.clientWidth;
  const CANVAS_HEIGHT = canvas.clientHeight;

  const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT, 3, 3, ctx);
  const Ui = new UI(game.pickCross);

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
      game.drawLine(type);
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
