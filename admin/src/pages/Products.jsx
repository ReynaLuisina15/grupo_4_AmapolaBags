import React, { useEffect, useState } from 'react'
import { UseFetch } from '../hooks/UseFetch';
import { Table } from "../components/products/Table";
import { Info } from '../components/products/Info';

export const Products = () => {
  const [products, setProducts] = useState({
    loading : true,
    data : []
  });

  const [product, setProduct] = useState({});

  useEffect(() => {
   UseFetch("/products")
   .then(({meta, data}) => {
    console.log(data);
    if (meta.ok) {
      setProducts({
        loading : false,
        data
      })
    }
   }).catch(error => console.error)
  }, []);

  const getInfo = (id) => {
    UseFetch(`/products/${id}`)
    .then(({ok, data}) => {
      if (ok) {
        setProduct(data)
     }
    }).catch(error => console.error)
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-8'>
          <div className='card'>
          <div className="card-header">
              <h5>Productos</h5>
          </div>
           <div className='card-body'>
        
          {
        products.loading
        ?
        <p>cargando...</p>
        :
       <Table products={products.data.products} getInfo={getInfo}/>
      }
          </div>
        </div>
      </div>
          <div className='col-4'>
            {
              <Info {...product}/>
            }
           
          </div>
        </div>    
    </div>
  )
}
