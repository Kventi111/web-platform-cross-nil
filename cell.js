class Cell {
  constructor(x, y, width, height, pickType) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pickType = pickType;
    this.color = '#2378ad';
    this.picked = false;
  }

  show(ctx) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.clearRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
  }

  drawCross(ctx) {
    ctx.beginPath(); // Начинает новый путь
    ctx.strokeStyle = '#0A9DFA';
    ctx.lineWidth = 2;

    ctx.moveTo(this.x + 10, this.y + 10); // Передвигает перо в точку (30, 50)
    ctx.lineTo(this.x + this.width - 10, this.y + this.height - 10); // Рисует линию до точки (150, 100)

    ctx.moveTo(this.x + this.width - 10, this.y + 10); // Передвигает перо в точку (30, 50)
    ctx.lineTo(this.x + 10, this.y + this.height - 10); // Рисует линию до точки (150, 100)
    ctx.stroke(); // Отображает путь
    ctx.closePath(); // Начинает новый путь
  }

  drawCircle(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = '#0A9DFA';
    ctx.lineWidth = 2;

    ctx.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      this.width / 2 - 10,
      0,
      2 * Math.PI,
      false
    );
    ctx.stroke();
  }

  pick(type, ctx) {
    if (this.picked) return;

    if (type === 'o') {
      this.drawCross(ctx);
    }
    if (type === 'x') {
      this.drawCircle(ctx);
    }

    this.picked = true;
  }

  isIntersected(x, y) {
    const intersected =
      x < this.x ||
      x > this.x + this.width ||
      y < this.y ||
      y > this.y + this.height;

    return !intersected;
  }
}
