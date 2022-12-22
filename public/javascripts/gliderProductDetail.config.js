
new Glider(document.querySelector('.glider'), {
    slidesToShow: 5,
    slidesToScroll: 3,
    draggable: true,
    dots: '.dots',
    arrows: {
      prev: '.glider-prev',
      next: '.glider-next'
    }
  });

  function mostrar() {
    Swal.fire({
     title: "PRODUCTO AGREGADO AL CARRITO",
     icon: "success",
     confirmButtonText:"Aceptar",
     backdrop: "true",
     timer: "1500",
     showConfirmButton: false,
     
     closeButtonAriaLabel: "Cerrar alerta"
    });
  }

