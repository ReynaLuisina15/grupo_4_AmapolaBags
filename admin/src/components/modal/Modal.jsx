import React from "react";

export const Modal = ({ id, name, urlImgPrimary, onDelete }) => {

  return (
    <div
      class="modal fade"
      id="modalDelProduct"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-3">¿Deseas eliminar el producto?</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div className="alert alert-info text-center" role="alert">
              <h4 class="alert-heading">{name}</h4>
              <img
                src={urlImgPrimary}
                alt=""
                className="img-thumbnail"
                style={{ height: 150 }}
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <form onSubmit={onDelete}>
              <button type="submit" class="btn btn-danger">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
