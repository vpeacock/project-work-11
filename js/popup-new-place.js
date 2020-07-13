class PopupNewPlace extends Popup  {
  constructor(handle, cardList) {
    super(handle);
    this.formNewPlace = handle;
    this.cardList = cardList;
    this.inputName = this.formNewPlace.querySelector('input[name="name"]');
    this.inputLink = this.formNewPlace.querySelector('input[name="link"]');
    this.addCardUser = this.addCardUser.bind(this);
  }

  open() {
    this.handle.querySelector('form').reset();
    super.open();
    this._focusInput();
    this._reset();
  }
  
   _focusInput() {
      this.handle.querySelector('input').focus();
   }

   _reset() {
      this.inputName.value = '';
      this.inputLink.value = '';
      this.formNewPlace.querySelector('form').reset();
   }
  
   addCardUser() {
    this.cardList.addCard({ name: this.inputName.value, link: this.inputLink.value });
    super.close();
  }

}