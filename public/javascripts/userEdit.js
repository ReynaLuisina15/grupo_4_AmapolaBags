console.log("login success!");
// FUNCIONES  PARA ABREVIAR
const $ = (element) => document.getElementById(element);
const qs = (element) => document.querySelector(element);
const qsa = (element) => document.querySelectorAll(element);


//CAPTURO LOS ELEMENTOS DEL FORMULARIO EN FORMA DE ARRAY
const formUserEdit = $('formUserEdit');
const elements = formUserEdit.elements;

//
regExEmail =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

exRegAlfa = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

exRegNum = /^[0-9]+$/;

exRegPass = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,12}$/ ;

  const msgError = (elemento, mensaje, evento) => {
    $(elemento).style.color = "red";
    $(elemento).innerHTML = mensaje;
    evento.target.classList.add('is-invalid');
}


//NOMBRE

$('name').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('nameMsg').innerHTML = null;
});

$('name').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("nameMsg", "El nombre es requerido", e)
            break;
    case this.value.trim().length < 2:
        msgError("nameMsg", "El nombre debe tener como mínimo 2 carácteres", e)
        break;
        case !exRegAlfa.test(this.value):
            msgError("nameMsg", "Sólo se permiten carácteres alfabéticos", e)
        break;
            default:
            $('nameMsg').innerHTML = null;
            this.classList.add('is-valid');
            break;
    }
});

//APELLIDO

$('surname').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('surnameMsg').innerHTML = null;
});


$('surname').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("surnameMsg", "El apellido es requerido", e)
            break;
    case this.value.trim().length < 2:
        msgError("surnameMsg", "El apellido debe tener como mínimo 2 carácteres", e)
        break;
        case !exRegAlfa.test(this.value):
            msgError("surnameMsg","Sólo se permiten carácteres alfabéticos", e)
        break;
            default:
            $('surnameMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});

//CONTRASEÑA

$('pass').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('passMsg').innerHTML = null;
});

$('pass').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("passMsg", "La contraseña es obligatoria", e)
            break;
        case !exRegPass.test(this.value):
            msgError("passMsg", "La contraseña debe tener entre 6 y 12 caracteres, un número, una mayúscula y un carácter especial", e)
            break;
        default:
            $('passMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});

//  CALLE 

$('street').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('streetMsg').innerHTML = null;
});


$('street').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("streetMsg", "El nombre de la calle es requerido", e)
            break;
        case !exRegAlfa.test(this.value):
            msgError("streetMsg","Sólo se permiten carácteres alfabéticos", e)
        break;
            default:
            $('streetMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});

//NUMERO

$('number').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('numberMsg').innerHTML = null;
});

$('number').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("numberMsg", "El número de la calle es requerido", e)
            break;
            case !exRegNum.test(this.value):
            msgError("numberMsg","Sólo se permiten números", e)
        break;
            default:
            $('numberMsg').innerHTML = null;
            this.classList.add('is-valid');
            break;
    }
});

//LOCALIDAD

$('location').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('locationMsg').innerHTML = null;
});


$('location').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("locationMsg", "El nombre de la calle es requerido", e)
            break;
            default:
            $('locationMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});

//PROVINCIA

$('province').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('provinceMsg').innerHTML = null;
});


$('province').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("provinceMsg", "El nombre de la provincia es requerido", e)
            break;
        case !exRegAlfa.test(this.value):
            msgError("provinceMsg","Sólo se permiten carácteres alfabéticos", e)
        break;
            default:
            $('provinceMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});

// CODIGO POSTAL    

$('postalcode').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('postalcodeMsg').innerHTML = null;
});

$('postalcode').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("postalcodeMsg", "El código postal es requerido", e)
            break;
            case !exRegNum.test(this.value):
            msgError("postalcodeMsg","Sólo se permiten números", e)
        break;
            default:
            $('postalcodeMsg').innerHTML = null;
            this.classList.add('is-valid');
            break;
    }
});

//EMAIL

$('form__dates-email').addEventListener('focus', function(e) {
    this.classList.remove('is-invalid')
    this.classList.remove('is-valid')
    $('emailMsg').innerHTML = null;
});

$('form__dates-email').addEventListener('blur', function(e) {
    switch (true) {
        case !this.value.trim():
            msgError("emailMsg", "El email es requerido", e)
            break;
        case !regExEmail.test(this.value):
            msgError("emailMsg", "El email tiene un formato inválido", e)
            break;
        default:
            $('emailMsg').innerHTML = null;
            this.classList.add('is-valid')
            break;
    }
});









