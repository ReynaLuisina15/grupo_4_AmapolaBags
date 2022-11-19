// SELECTOR DE ID
const email = document.getElementById("email");
const password = document.getElementById("password");
const emailError = document.getElementById("emailMsg");
const passwordError = document.getElementById("passwordMsg");
const emailMsgBack = document.getElementById("emailMsgBack");
const passwordMsgBack = document.getElementById("passwordMsgBack");

// FUNCIÓN DE ERRORES
const msgError = (input, error, msg) => {
  error.style.color = "red";
  error.innerHTML = msg;

  input.style.boxShadow = "0 0 5px red";
  input.style.borderColor = "red";
};

const cleanError = (error) => {
  error.innerHTML = null;
};

const validField = (input, error) => {
  error.innerHTML = null;
  input.style.boxShadow = "0 0 5px green";
  input.style.borderColor = "green";
  error.innerHTML = "";
};

const cleanErrorBack = (error) => {
  error.innerHTML = "";
};

// EXPRESIÓN REGULAR
regExEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// VALIDACIÓN EMAIL
email.addEventListener("blur", function () {
  cleanErrorBack(emailMsgBack);
  switch (true) {
    case !this.value.trim():
      msgError(email, emailError, "Debes ingresar un email ");
      break;
    case !regExEmail.test(this.value.trim()):
      msgError(email, emailError, "debe ser un email valido");
      break;
    default:
      validField(email, emailError);
      break;
  }
});

// VALIDACIÓN PASSWORD
password.addEventListener("blur", function () {
  cleanErrorBack(passwordMsgBack);
  switch (true) {
    case !this.value.trim():
      msgError(password, passwordError, "la contraseña es obligatoria");
      break;
    default:
      validField(password, passwordError);
      break;
  }
});
