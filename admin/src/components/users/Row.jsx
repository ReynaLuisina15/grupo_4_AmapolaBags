import React from "react";
import { UserDelete } from "./UserDelete";

export const Row = ({ name, surname, email, id, rolId, getUserInfo }) => {
  return (
    <tr>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{surname}</td>
      <td>{email}</td>
      <td>{rolId}</td>
      <td>
        <button
          className="btn btn-sm btn-primary mx-1"
          style={{ width: "30px" }}
          onClick={() => getUserInfo(id)}
        >
          <i className="fas fa-info"></i>
        </button>
        
        <button
          className="btn btn-sm btn-danger mx-1"
          style={{ width: "30px" }}
          onClick={() => UserDelete(id)}
        >
          <i className="fas fa-trash"></i>
        </button>
      </td>
    </tr>
  );
};
