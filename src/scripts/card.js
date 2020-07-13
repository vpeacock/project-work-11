export default class Card {
  constructor(name, link, callShowImage) {
	  this.callShowImage = callShowImage;
    this.name = name;
    this.link = link;
    this.like = this.like.bind(this);
    this.remove = this.remove.bind(this);
    this.showImage = this.showImage.bind(this);
  }

  create() {
    const markup = 
    `<div class="place-card__image">
        <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <button class="place-card__like-icon"></button>
     </div>`;

    const element = document.createElement('div');

    element.classList.add('place-card');
    element.insertAdjacentHTML('beforeend', markup.trim());

    return element;
  }

  render() {
    this.card = this.create();
    this.setEventListeners();
    this.card.querySelector('.place-card__name').textContent = this.name;
    this.card.querySelector('.place-card__image').setAttribute('style', `background-image: url(${this.link})`);    
    return this.card;
  }

  like() {
    this.card.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');   
  }

  showImage() {
    this.callShowImage(this.link);
  
   }

  remove() {
    this.removeEventListeners();
    this.card.remove();
	  this.card = null;
  }

  setEventListeners() {
    this.card.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.card.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
    this.card.querySelector('.place-card__image').addEventListener('click', this.showImage);
  }
  
  removeEventListeners() {
    this.card.querySelector('.place-card__like-icon').removeEventListener('click', this.like);
    this.card.querySelector('.place-card__delete-icon').removeEventListener('click', this.remove);
    this.card.querySelector('.place-card__image').removeEventListener('click', this.showImage);
  }
  
}  