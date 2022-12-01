
// SELECTOR DE ID
const namee = document.getElementById("name");
const surname = document.getElementById("surname");
const email = document.getElementById("email");
const password = document.getElementById("password");
const terms = document.getElementById("terms");
const nameMsgBack = document.getElementById("nameMsgBack");
const surnameMsgBack = document.getElementById("surnameMsgBack");
const emailMsgBack = document.getElementById("emailMsgBack");
const passwordMsgBack = document.getElementById("passwordMsgBack");
const termsdMsgBack = document.getElementById("termsMsgBack");

// FUNCIÓN DE ERRORES
const msgError = (input, error, msg) => {
  error.style.color = "red";
  error.innerHTML = msg;
  input.style.boxShadow = "0 0 5px red";
  input.style.borderColor = "red";
};

const cleanErrorBack = (error) => {
  error.innerHTML = "";
};

// FUNCIÓN DE VERIFICACIÓN
const validField = (input, error) => {
  error.innerHTML = null;
  input.style.boxShadow = "0 0 5px green";
  input.style.borderColor = "green";
  error.innerHTML = "";
};


// EXPRESIÓN REGULAR PARA VALIDAR EMAIL
regExEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
// EXPRESIÓN REGULAR PARA VALIDAR CARACTERES ALFANUMÉRICOS
exRegAlfa = 
/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;


// VALIDACIÓN NAME
namee.addEventListener('blur', function() {
  cleanErrorBack(nameMsgBack);
  switch (true) {
      case !this.value.trim():
          msgError(namee, nameMsgBack,'el nombre es obligatorio')
        break;
      case this.value.length < 2:
          msgError(namee, nameMsgBack, 'Como mínimo 2 caracteres')
        break;
      case !exRegAlfa.test(this.value.trim()):
          msgError(namee, nameMsgBack, 'solo letras!!!')
          break;
      default:
        validField(namee, nameMsgBack);
        break;

  }
});

// VALIDACIÓN SURNAME
surname.addEventListener('blur', function() {
  cleanErrorBack(surnameMsgBack);
  switch (true) {
      case !this.value.trim():
          msgError(surname, surnameMsgBack,'El apellido es obligatorio')
        break;
      case this.value.trim().length < 2 :
          msgError(surname, surnameMsgBack, 'Como mínimo 2 caracteres')
        break;
      case !exRegAlfa.test(this.value):
          msgError(surname, surnameMsgBack, 'Solo letras!!!')
        break;
      default:
          validField(surname, surnameMsgBack);
        break;
  }
});

// VALIDACIÓN EMAIL
email.addEventListener('blur', function(e) {
  switch (true) {
      case !this.value.trim():
          msgError(email, emailMsgBack, 'El email es obligatorio')
        break;
      case !regExEmail.test(this.value.trim()):
          msgError(email, emailMsgBack, 'Debe ser un email válido')
        break;
      default:
          validField(email, emailMsgBack)
        break;
  }
});

// VALIDACIÓN PASSWORD
password.addEventListener('blur', function(e) {
  switch (true) {
      case !this.value.trim():
          msgError(password, passwordMsgBack, 'la contraseña es obligatoria')
        break;
      case this.value.trim().length < 6 || this.value.trim().length > 12 :
          msgError(password, passwordMsgBack, 'La contraseña debe tener entre 6 y 12 caracteres')
        break;
      default:
          validField(password, passwordMsgBack)
        break;
  }
});

// VALIDACIÓN TÉRMINOS
terms.addEventListener('change', function(e) {
  switch(true) {
    case !this.checked :
        msgError(terms, termsMsgBack, 'debes aceptar las bases y condiciones')
      break;
    default:
          validField(terms, termsMsgBack)
      break;
  }
}); 