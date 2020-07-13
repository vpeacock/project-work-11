class Popup {
  constructor(handle){
    this.handle = handle;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.setEventListeners();
  }

  open() {
    this.handle.classList.add('popup_is-opened');
  }

  close() {
    this.handle.classList.remove('popup_is-opened');
  }

  handleForm() {
    return this.handle.querySelector('form');
  }

  setEventListeners() {
    this.handle.querySelector('.popup__close').addEventListener('click', this.close);
    this.handle.addEventListener('keydown', (event) => {

      if (event.key === 'Escape' || event.key === 'Esc') {
        this.close();
      }
    });
  }
}