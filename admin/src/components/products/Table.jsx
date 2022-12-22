import React from 'react'
import { Row } from './Row'

export const Table = ({products, getInfo}) => {
  return (
    <div className='table-responsive'>
    <table className="table table-striped">
    <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col" >Nombre</th>
        <th scope="col"
        className='text-center'>Categoría</th>
        <th scope="col" className='text-right'>Precio</th>
        <th scope="col" className='text-center'>Acciones</th>
      </tr>
    </thead>
    <tbody>       
        
        {
            products.map((product) => <Row getInfo={getInfo} {...product} key={product.id}/>)
        } 

    </tbody>
  </table>
  </div>
  )
}
