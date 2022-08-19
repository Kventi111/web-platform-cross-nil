class UI {
  constructor(pickCross) {
    this.banner = document.querySelector('.winner_banner');
    this.bannerText = document.querySelector('.winner_banner__text');
    this.panel = document.querySelector('.panel');
    this.pickCross = pickCross;

    this.initPanel();
  }

  showWinnerBanner = (text) => {
    this.banner.classList.add('show');

    this.bannerText.innerHTML = text;
  };

  initPanel() {
    this.panel.innerHTML = `Ходит ${!this.pickCross ? 'Х - тик' : '0 - лик'}`;
  }

  updatePanelText(pickCross) {
    this.panel.innerHTML = `Ходит ${!pickCross ? 'Х - тик' : '0 - лик'}`;
  }
}
