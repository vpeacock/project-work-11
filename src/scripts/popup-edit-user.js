import Popup from "./popup.js";

export default class PopupEditUser extends Popup {
  constructor(handle, userInfo, api) {
    super(handle);
    this.api = api;
    this.userInfo = userInfo;
  }

  open() {
    super.open();
    this._focusInput();
    this.userInfo.editUserInfo();
  }

  _focusInput() {
    this.handle.querySelector('input').focus();
  }

  
}