export default class FormValidator {
    constructor(form, errorMessages)  {
        this.form = form; 
        this.errorMessages = errorMessages;
        this.inputs = [...this.form.querySelectorAll('input')];
        this.buttonSubmit = this.form.querySelector('.button');
        this.checkInputValidity = this.checkInputValidity.bind(this);
        this.handlerInputForm = this.handlerInputForm.bind(this);
        this.isValidate = this.isValidate.bind(this);
        this.setEventListeners();
    }    
    
    checkInputValidity() {
        let valid = true;
        this.inputs.forEach((input) => {
            if (input.type !== 'button') {
                if (!this.isFieldValid(input)) valid = false;
            }
        });
        return valid;
    };
 
    isValidate(input) {
        input.setCustomValidity('');
        if (input.validity.valueMissing) {
            input.setCustomValidity(this.errorMessages.empty);
            return false;
        }
        if (input.validity.tooShort || input.validity.tooLong) {
            input.setCustomValidity(this.errorMessages.wrongLength);
            return false;
        }

        if (input.validity.typeMismatch && input.type === 'url') {
            input.setCustomValidity(this.errorMessages.wrongUrl);
            return false;
        }

        if (input.validity.rangeOverflow) {
            const max = input.getAttribute('max');
            input.setCustomValidity(`${this.errorMessages.maxLength} ${max}`);
            return false;
        }
        return input.checkValidity();

    };

    isFieldValid(input) {
        const errorElem = input.parentNode.querySelector(`#${input.id}-error`);
        const valid = this.isValidate(input);

        if (errorElem !== null) {
            errorElem.textContent = input.validationMessage;
        }
        return valid;
    };
    
    clearErrors() {
        const errors = this.form.querySelectorAll('.error');
          errors.forEach((item) => {
            item.textContent = '';
          });
      }

    setSubmitButtonState(state) {
        if (state) {
            this.buttonSubmit.removeAttribute('disabled');
            this.buttonSubmit.classList.add('popup__button_valid');
            this.buttonSubmit.classList.remove('popup__button_invalid');
        } else {
            this.buttonSubmit.setAttribute('disabled', true);
            this.buttonSubmit.classList.add('popup__button_invalid');
            this.buttonSubmit.classList.remove('popup__button_valid');
        }
    };

    handlerInputForm(event) {
        this.isFieldValid(event.target);
        if (this.inputs.every(this.isValidate)) {
            this.setSubmitButtonState(true);
        } else {
            this.setSubmitButtonState(false);
        }
    };

    setEventListeners() {
        this.inputs.forEach((input) => {
            input.addEventListener('input', this.handlerInputForm, true);
            input.addEventListener('blur', this.handlerInputForm, true);
        });
    }   
}