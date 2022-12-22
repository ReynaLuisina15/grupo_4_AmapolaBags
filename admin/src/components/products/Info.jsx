import React from "react";

export const Info = ({ name, price, description, category, urlImgPrimary }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Información</h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
          <img
            style={{width:'150px',height:'150px',objectFit:'contain',margin:'0 auto 8px',filter:!urlImgPrimary && 'grayscale(1)'}}
            className={urlImgPrimary && "img-thumbnail"}
            src={urlImgPrimary || 'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'}
            alt=""
          />
          <li className="list-group-item">
            <label htmlFor="">Nombre:</label>
            <p className="m-0">
              <b>{name}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Categoría:</label>
            <p className="m-0">
              <b>{category?.name}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Precio:</label>
            <p className="m-0">
              <b>{price}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Descripción:</label>
            <p className="m-0">
              <b>{description}</b>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
