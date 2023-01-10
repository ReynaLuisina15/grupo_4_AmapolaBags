import React, { useEffect, useState } from "react";
import { UseFetch } from "../../hooks/UseFetch";
export const Info = ({
  name,
  price,
  description,
  category,
  images = [],
  urlImgPrimary,
  action,
  onSubmit,
  handleChangeInputsValue,
}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    UseFetch("/categories")
      .then(({ ok, data }) => {
        if (ok) {
          setCategories(data);
        }
      })
      .catch((error) => console.error);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h5>Información</h5>
      </div>
      <form
        onSubmit={onSubmit}
        className="card-body"
        encType="multipart/form-data"
      >
        <ul className="list-group list-group-flush">
          <div className="d-flex gap-1">
          <img
            style={{
              width: "50%",
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
          <img
            style={{
              width: "50%",
              height: "150px",
              objectFit: "contain",
              margin: "0 auto 8px",
              filter: !urlImgPrimary && "grayscale(1)",
            }}
            className={urlImgPrimary && "img-thumbnail"}
            src={
              (images.length && images[0].file) ||
              "https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png"
            }
            alt=""
          />
          </div>
          {(action === "update" || action === "create") && (
            <>
              <label for="img1">Imagen 1</label>
              <input
                id="img1"
                className="form-control form-control-sm mb-3"
                type="file"
                name="img1"
              />

              <label className="form-label" for="img2">Imagen 2</label>
              <input
                id="img2"
                className="form-control form-control-sm"
                type="file"
                name="img2"
              />
            </>
          )}
          <li className="list-group-item">
            <label htmlFor="">Nombre:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <input
                  className="form-control"
                  type="text"
                  value={name}
                  name="name"
                  onChange={handleChangeInputsValue}
                />
              ) : (
                <b>{name}</b>
              )}
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Categoría:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <select
                  className="form-select"
                  name="categoryId"
                  onChange={handleChangeInputsValue}
                  defaultValue=""
                >
                  <option value="" key="">
                    Seleccionar
                  </option>
                  {categories.map(({ id, name }) => {
                    return (
                      <option
                        value={id}
                        key={id}
                        selected={category?.name === name}
                      >
                        {name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <b>{category?.name}</b>
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
                  name="price"
                  onChange={handleChangeInputsValue}
                />
              ) : (
                <b>{price}</b>
              )}
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Descripción:</label>
            <p className="m-0">
              {action === "update" || action === "create" ? (
                <textarea
                  className="form-control"
                  value={description || ""}
                  style={{ height: "150px" }}
                  name="description"
                  onChange={handleChangeInputsValue}
                />
              ) : (
                <b>{description}</b>
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
