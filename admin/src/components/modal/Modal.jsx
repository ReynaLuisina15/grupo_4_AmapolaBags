import React from "react";

export const Modal = ({ id, name, urlImgPrimary, onDelete }) => {

  return (
    <div
      className="modal fade"
      id="modalDelProduct"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-3">¿Deseas eliminar el producto?</h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="alert alert-info text-center" role="alert">
              <h4 className="alert-heading">{name}</h4>
              <img
                src={urlImgPrimary}
                alt=""
                className="img-thumbnail"
                style={{ height: 150 }}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancelar
            </button>
            <form onSubmit={onDelete}>
              <button type="submit" className="btn btn-danger">
                Confirmar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
