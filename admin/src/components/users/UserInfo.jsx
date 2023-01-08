import React from "react";

export const UserInfo = ({ name, surname, rolId, email, avatar }) => {
  return (
    <div className="card">
      <div className="card-header">
        <h5>Información</h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush">
        <img
            style={{width:'150px',height:'150px',objectFit:'contain',margin:'0 auto 8px',filter:!avatar && 'grayscale(1)'}}
            className={avatar && "img-thumbnail"}
            src={ avatar ||  'https://wpdirecto.com/wp-content/uploads/2017/08/alt-de-una-imagen.png'}
            alt=""
          />
         
          <li className="list-group-item">
            <label htmlFor="">Nombre:</label>
            <p className="m-0">
              <b>{name}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Apellido:</label>
            <p className="m-0">
              <b>{surname}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">E-mail:</label>
            <p className="m-0">
              <b>{email}</b>
            </p>
          </li>
          <li className="list-group-item">
            <label htmlFor="">Rol:</label>
            <p className="m-0">
              <b>{rolId}</b>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
