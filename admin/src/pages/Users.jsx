import React, { useEffect, useState } from 'react'
import { UsersTable } from '../components/users/UsersTable';
import { UseFetch } from "../hooks/UseFetch";

export const Users = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    UseFetch('/users')
      .then(({meta, data})=> {
        if (meta.ok = true) {
          setState(data)
        }
      })
  },[])
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-body'>
          <UsersTable/>
        </div>
      </div>
    </div>
  )
}
