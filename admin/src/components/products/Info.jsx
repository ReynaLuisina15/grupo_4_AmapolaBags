import React from "react";
export const Info = ({
  name,
  price,
  description,
  category,
  urlImgPrimary,
  action,
  onSubmit,
}) => {

  return (
    <div className="card">
      <div className="card-header">
        <h5>Información</h5>
      </div>
      <form onSubmit={onSubmit} className="card-body">
        <ul className="list-group list-group-flush">
          <img
            style={{
              width: "150px",
              height: "150px",
              objectFit: "contain",
              margin: "0 auto 8px",
              filter: !urlImgPrimary && "grayscale(1)",
            }}
            className={urlImgPrimary && "img-thumbnail"}
            src={
              urlImgPrimary ||
              "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
            }
            alt=""
          />
          {(action === "update" || action === "create") && (
            <input class="form-control form-control-sm" type="file"  />
          )}
          <li className="list-group-item">
            <label htmlFor="">Nombre:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  name='name'
                />
              ) : (
                <b>{name || ""}</b>
              )}
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Categoría:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <input
                  className="form-control"
                  type="text"
                  value={category?.name}
                  name='categoryId'
                />
              ) : (
                <b>{category?.name || ""}</b>
              )}
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Precio:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <input
                  className="form-control"
                  type="number"
                  value={price}
                  name='price'
                />
              ) : (
                <b>{price || ""}</b>
              )}
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Descripción:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <textarea
                  className="form-control"
                  value={description}
                  style={{ height: "150px" }}
                  name='description'
                ></textarea>
              ) : (
                <b>{description || ""}</b>
              )}
            </p>
          </li>
          {action && (
            <li className="list-group-item">
              <button
                type="submit"
                className={`btn btn-block ${
                  action === "create"
                    ? "btn-outline-success"
                    : "btn-outline-info"
                }`}
              >
                {action === "create" ? "Guardar" : "Actualizar"}
              </button>
            </li>
          )}
        </ul>
      </form>
    </div>
  );
};
