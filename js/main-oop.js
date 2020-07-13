(function() { 
// ==================== global variables ============================ 

const containerCard =  document.querySelector('.places-list');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const inputName = document.querySelector('input[name="fullname"]');
const inputAbout = document.querySelector('input[name="about"]');
const popupNewPlace = document.querySelector('.popup-newplace');
const popupEditUser = document.querySelector('.popup__edit-user');
const popupShowImage = document.querySelector('.popup-showimage');
const formPlace = document.forms.newplace;
const formUser = document.forms.newuser;

const parameters = {
  url: 'https://praktikum.tk/cohort11',
  headers: {
    authorization: 'c3377a60-f8c1-4472-a3ff-3c97c31e1d0c',
    'Content-Type': 'application/json' 
  }
}

const errorMessages = {
  empty: 'Это обязательное поле',
  wrongLength: 'Должно быть от 2 до 30 символов',
  wrongUrl: 'Здесь должна быть ссылка',
  maxLength: 'Максимальное значение'
};

const api = new Api(parameters);

const instanceShowImage = new PopupShowImage(popupShowImage);

function cbShowImage(link) {
  instanceShowImage.open(link);
} 

function cbCreateCard(name, link) {
  return new Card(name, link, cbShowImage);
}

function closePopup() {
  instanceEditUser.close();
}

const cardList = new CardList(containerCard, cbCreateCard, api);
cardList.initLoad();

const instanceNewPlace = new PopupNewPlace(popupNewPlace, cardList);

const formValidatorNewPlace = new FormValidator(formPlace, errorMessages);

const userInfo =  new UserInfo(userInfoName, userInfoJob, inputName, inputAbout, api, closePopup);
userInfo.getUserInfo();

const instanceEditUser = new PopupEditUser(popupEditUser, userInfo, api);
const formValidatorUserEdit = new FormValidator(formUser, errorMessages);

const addCardUser= (event) => {
  event.preventDefault();
  if (formValidatorNewPlace.checkInputValidity()) {
    instanceNewPlace.addCardUser();
  }
};

const saveDataUserForm= (event) => {
  event.preventDefault();
  if (formValidatorUserEdit.checkInputValidity()) {
    userInfo.setUserInfo({name: inputName.value, about: inputAbout.value});
  }
};

document.querySelector('.user-info__button').addEventListener('click', () => { 
   formValidatorNewPlace.clearErrors();
   formValidatorNewPlace.setSubmitButtonState(false);
   instanceNewPlace.open();
});

document.querySelector('.user-info__button-edit').addEventListener('click', () => { 
  formValidatorUserEdit.clearErrors();
  formValidatorUserEdit.setSubmitButtonState(true);
  instanceEditUser.open();
});


document.forms.newuser.addEventListener('submit', saveDataUserForm);
document.forms.newplace.addEventListener('submit', addCardUser);

//========================== end ============================
}());

/*
  Неплохая работа, класс Api создан, запросы отправляются и данные пользователя сохраняются на сервере
  Но есть несколько замечаний:

  Надо исправить:
  + - при сохранении профиля страница не должна перезагружаться
  + - поместить блок catch только в самом конце цепочки
  + - попап нужно закрывать только если сервер ответил подтверждением
  + - не вызывать getUserInfo в конструкторе класса

  Можно лучше: 
  + - никак не преобразовывать данные приходящие с сервера, они уже имеют необходимый формат, а удаление из 
    них остальный данных не позволит сделать дополнительное задание
  + - проверка ответа сервера и преобразование из json
    дублируется во всех методах класса Api, лучше вынести в отдельный метод

*/

/*
  Отлично, часть замечаний исправлена, но некоторые места ещё остались
  Надо исправить:
  + - при сохранении данных пользователя попап не закрывается и данные на странице не обновляются
  + - у запроса к серверу в классе PopupEditUser отсутствует обработка ошибок
  + - в методе addNewUser проверка if (result.ok) {
  + - в методе addNewUser при ответе сервера вызывается метод setUserInfo который ещё раз отправляет данные
  такого быть не должно

*/



/*
  Все замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
