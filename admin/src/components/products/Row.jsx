import React from "react";

export const Row = ({ id, name, price, category, getInfo, setAction }) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td className="text-center">{category?.name}</td>
      <td className="text-right">${price}</td>
      <td>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-sm btn-primary mx-1"
            style={{ width: "30px" }}
            onClick={() => {
              setAction(null);
              getInfo(id);
            }}
          >
            <i className="fas fa-info"></i>
          </button>
          <button
            className="btn btn-sm btn-success mx-1"
            onClick={() => {
              setAction('update');
              getInfo(id);
            }}
            style={{ width: "30px" }}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            className="btn btn-sm btn-danger mx-1"
            style={{ width: "30px" }}
            data-bs-toggle="modal"
            data-bs-target="#modalDelProduct"
            onClick={() => getInfo(id)}
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  );
};
