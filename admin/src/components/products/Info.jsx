import React from 'react'

export const Info = ({name,price,description,category,image,color}) => {
  return (
    <div className="card">
        <div className="card-header">
           <h5>Información</h5>
        </div>
    <div className="card-body">
     <ul className="list-group list-group-flush">
        <img className='img-thumbnail' src="" alt="" />
       <li class="list-group-item">
        <label htmlFor="">Nombre:</label>
        <p className='m-0'><b>{name}</b></p>
        </li>
        <li class="list-group-item">
        <label htmlFor="">Categoría:</label>
        <p className='m-0'><b>{category}</b></p>
        </li>
        <li class="list-group-item">
        <label htmlFor="">Precio:</label>
        <p className='m-0'><b>{price}</b></p>
        </li>
        <li class="list-group-item">
        <label htmlFor="">Descripción:</label>
        <p className='m-0'><b>{description}</b></p>
        </li>
     </ul>
    </div>
  </div>
  )
}
