import React, { useEffect, useState } from 'react';
import { Metrics } from '../components/metricas/Metrics'
import { Categories } from '../components/categories/Categories';
import { UseFetch } from '../hooks/UseFetch';

export const Home = () => {
    const [lastProduct, setLastProduct] = useState(null);

    useEffect(() => {
        UseFetch("/products?sortBy=newest&limit=1")
            .then(({ data }) => {
                if (data.products) {
                    setLastProduct(data.products[0])
                }
            }).catch(error => console.error)
    }, []);

    return (
        <div className="container-fluid ">
            <div className="d-sm-flex align-items-center justify-content-between mb-4" id='title'>
                <h1 className="h3 mb-0 text-gray-800">AMAPOLA BAGS</h1>
            </div>

            <Metrics />


            <div className="row">

                <div className="col-lg-6 mb-4">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h5 className="m-0 font-weight-bold text-gray-800">Último producto agregado</h5>
                        </div>
                        {
                            lastProduct && (
                                <div className="card-body">
                                    <div className="text-center">
                                        <img id="imgProduct" className="img-fluid px-3 px-sm-4 mt-3 mb-4" style={{ heigth: "100%" }} src={lastProduct.urlImgPrimary} alt={lastProduct.name} />
                                    </div>
                                    <p>{lastProduct.name}</p>
                                    <p>{lastProduct.description}</p>
                                    {/* TODO: cambiar localhost por url que venga desde la api */}
                                    <a className="btn btn-danger" target="_blank" rel="noreferrer" href={`http://localhost:4000/products/productDetail/${lastProduct.id}`}>Detalle producto</a>
                                </div>
                            )
                        }
                    </div>
                </div>

                <Categories />

            </div>
        </div>
    )
}
