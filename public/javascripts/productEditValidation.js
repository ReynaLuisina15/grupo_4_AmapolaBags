const qs = (e) => document.querySelector(e)
const $ = e => document.getElementById(e);

// LLAMADA AL FORMULARIO
const formProductEdit = $("formProductEdit");
const elements = formProductEdit.elements;


let totalCharacters = 200;
let numberCharacters = 200;

// FUNCIÓN DE ERRORES
const msgError = (element, msg, event) => {
    $(element).style.color = "red";
    $(element).innerHTML = msg;
    event.target.classList.add("is-invalid");
}

const cleanError = (element, {target}) => {
    target.classList.remove("is-invalid");
    target.classList.remove("is-valid");
    $(element).innerHTML = null;
};

const validField = (element, {target}) => {
    $(element).innerHTML = null;
    target.classList.remove("is-invalid");
    target.classList.add("is-valid");
};

// FUNCIO HABILITAR BOTON AGREGAR PRODUCTO

/* const checkFields = () => {
    let error = false
for (let i = 0; i < elements.length - 2; i++) {
    if (!elements[i].value || elements[i].classList.contains("is-invalid")) {
        error = true;
    }
    console.log(error);
}
if (!error) {
    $("btn-submit").disabled = false;
}else{
    $("btn-submit").disabled = true;
}
}

checkFields() */


$("name").addEventListener("focus", function (e) { 
    cleanError ("nameMsg", e)
   });
   $("name").addEventListener("blur", function (e) {
       switch (true) {
           case !this.value.trim():
               msgError("nameMsg", "el nombre de producto es obligatorio", e)
               break;
           case this.value.length < 3 || this.value.length > 10:
               msgError("nameMsg", "el nombre debe tener entre 3 y 10 caracteres", e)
               break;
           default:
               validField("nameMsg", e)
               break;
       } 
   });

   // VALIDACIÓN CATEGORIA
$("category").addEventListener("blur", function (e) {  
    switch (true) {
        case !this.value:
            msgError("categoryMsg", "la categoria del producto es obligatoria", e)
            break;
        default:
            validField("categoryMsg", e)
            break;
    }
});

// VALIDACIÓN IMAGEN
$("img1").addEventListener("change", function (e) {

    let tipoArchivo = /(.jpg|.jpeg|.png|.gif)$/i


    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
        $("image1Prev").src = reader.result
       
       
    }
});
$("img2").addEventListener("change", function (e) {
    let reader = new FileReader();

    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
        $("image2Prev").src = reader.result
                  
    }
});

// VALIDACIÓN DESCRIPCIÓN
$("description").addEventListener("focus", function (e) {  
    $("descriptionInfo").hidden = false;
    $("numberCharacters").innerHTML = numberCharacters;

    cleanError("descriptionMsg", e)
});
$("description").addEventListener("blur", function (e) {  
    $("descriptionInfo").hidden = true;
    switch (true) {
        case !this.value:
            msgError("descriptionMsg", "la descripcion del producto es obligatorio", e)
            break;
        case this.value.length < 20 :
            msgError("descriptionMsg", "la descripcción debe tener como mínimo 20 caracteres", e)
            break;
        case this.value.length > 200 :
            msgError("descriptionMsg", "la descripcción debe tener como maximo 200 caracteres", e)
            break;
        default:
            validField("descriptionMsg", e)
            break;
    }

});
$("description").addEventListener("keyup", function (e) {   
    numberCharacters = totalCharacters - +this.value.length
    $("numberCharacters").innerHTML = numberCharacters;

    if (numberCharacters <= 0 ) {
        $("descriptionInfo").hidden = true   
        msgError("descriptionMsg", "la descripcción debe tener como maximo 200 caracteres", e)    
    }else{
        $("numberCharacters").hidden = false  
        cleanError("descriptionMsg", e) 
    }
});

// VALIDACIÓN PRECIO
$("price").addEventListener("focus", function (e) {
    cleanError ("priceMsg", e)
});
$("price").addEventListener("blur", function (e) {
    switch (true) {
        case !this.value.trim():
            msgError("priceMsg", "el precio del producto es obligatorio", e)
            break;
        case this.value < 0 :
            msgError("priceMsg", "solo números positivos", e)
            break;
        default:
            $("priceMsg").innerHTML = null;
            validField("priceMsg", e)
            break;
    }   

});

console.log(elements);
