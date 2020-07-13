export default class CardList {
  constructor(container, cbCreateCard, api) {
    this.container = container;
    this.cbCreateCard = cbCreateCard;
    this.api = api;
    this.initLoad = this.initLoad.bind(this);
    this.addCard = this.addCard.bind(this);
  }

  render(cards) {
    this.cards = cards;
    this.cards.forEach(item => {
      this.addCard(item);
    });
  }

  initLoad() {
    this.api.getCards()
      .then((data) => {
        this.render(data);
      })
      .catch((error) => {
        console.log(error);
      });
   }

  addCard(data) {
    this.container.appendChild(this.cbCreateCard(data.name, data.link).render());
  }
}