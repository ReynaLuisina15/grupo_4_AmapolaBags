console.log("login success!");

// SELECTOR DE ID
const $ = (e) => document.getElementById(e);

// LLAMADA AL FORMULARIO
const formLogin = $("formLogin");
const elements = formLogin.elements;

// FUNCIÓN DE ERRORES
const msgError = (element, msg, event) => {
  $(element).style.color = "red";
  $(element).innerHTML = msg;
  event.target.classList.add("is-invalid");
};

const cleanError = (element, { target }) => {
  target.classList.remove("is-invalid");
  target.classList.remove("is-valid");
  $(element).innerHTML = null;
};

const validField = (element, { target }) => {
  $(element).innerHTML = null;
  target.classList.remove("is-invalid");
  target.classList.add("is-valid");
};

// EXPRECIÓN REGULAR
regExEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

$("email").addEventListener("blur", function (e) {
  switch (true) {
    case !this.value === regExEmail:
        msgError("emailMsg", "Debes ingresar un email válido", e)
      break;

    default:
      break;
  }
});

$("password").addEventListener("blur", function (e) {
  switch (key) {
    case value:
      break;

    default:
      break;
  }
});
