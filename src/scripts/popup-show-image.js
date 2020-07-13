import Popup from "./popup.js";

export default class PopupShowImage extends Popup {
    constructor(handle) {
      super(handle);
      this.handle = handle;
      this.open = this.open.bind(this);
    }

    open(pathImage) {
      this.handle.firstElementChild.setAttribute('style', `background-image: url(${pathImage})`);
      super.open(); 
    }

}