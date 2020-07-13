export default class UserInfo {
  constructor(userInfoName, userInfoJob, inputName, inputAbout, api, closePopup) {
    this.userInfoName = userInfoName;
    this.userInfoJob = userInfoJob; 
    this.api = api;
    this.inputName = inputName;
    this.inputAbout = inputAbout;
    this.closePopup = closePopup;
    this.userInfo = {};
  }
 
  setUserInfo(data) {
  
    this.userInfo = data;
    this.api.setUserInfo(this.userInfo)
      .then((data) => {
        this.render(data);
        this.closePopup();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render(data) {
    this.inputName.value = data.name;
    this.inputAbout.value = data.about;
    this.userInfoName.textContent = data.name;
    this.userInfoJob.textContent = data.about;   
  }

  getUserInfo() {  
    this.api.getUserInfo()
      .then((data) => {
        this.render(data);
      })
      .catch((error) => {
        console.log(error);
      });
   }

  editUserInfo() {
    this.inputName.value = this.userInfoName.textContent ;
    this.inputAbout.value = this.userInfoJob.textContent;
  }  
 
}