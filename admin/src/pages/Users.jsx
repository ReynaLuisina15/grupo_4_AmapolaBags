import React, { useEffect, useState } from "react";
import { UsersTable } from "../components/users/UsersTable";
import { UseFetch } from "../hooks/UseFetch";
import { UserInfo } from "../components/users/UserInfo";

export const Users = () => {
  const [users, setUsers] = useState({
    loading: true,
    data: [],
  });

  const [user, setUser] = useState({});

  useEffect(() => {
    UseFetch("/users")
      .then(({ meta, data }) => {
        console.log(data);
        if (meta.ok) {
          setUsers({
            loading: false,
            data,
          });
        }
      })
      .catch((error) => console.error);
  }, []);

  const getUserInfo = (id) => {
    UseFetch(`/users/${id}`)
      .then(({ ok, data }) => {
        if (ok) {
          setUser(data);
        }
      })
      .catch((error) => console.error);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h5>Lista de usuarios</h5>
            </div>
            <div className="card-body">
              {users.loading ? (
                <p>cargando...</p>
              ) : (
                <UsersTable users={users.data.users} getUserInfo={getUserInfo}/>
              )}
            </div>
          </div>
        </div>
        <div className="col-4">{<UserInfo {...user}/>}</div>
      </div>
    </div>
  );
};
