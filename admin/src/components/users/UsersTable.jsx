import React from "react";
import {Row} from "./Row";


export const UsersTable = ({users, getUserInfo}) => {
  return (
    <table className="table">

      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre: </th>
          <th scope="col">Apellido</th>
          <th scope="col">Email</th>
          <th scope="col">Rol ID</th>
        </tr>
      </thead>
      <tbody>
        {
       users.map((user, index) => <Row getUserInfo={getUserInfo} {...user} key={user.name + index} /> )
        }
      </tbody>

    </table>
  )
}