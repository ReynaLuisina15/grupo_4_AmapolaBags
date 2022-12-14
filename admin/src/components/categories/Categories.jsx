import React, { useState } from 'react'
import { useEffect } from 'react';
import { UseFetch } from '../../hooks/UseFetch';
import { Category } from './Category'

export const Categories = () => {

    const [state, setState] = useState({
        loading: true,
        categories: []
    });


    useEffect(() => {
       console.log("holaaaaaa");
        UseFetch('/categories')
            .then(({ data }) => {
                console.log(data);
                setState({
                    loading: false,
                    categories: data
                })
            }).catch(error => console.error(error))

    },[]);



    return (
        <div className="col-lg-6 mb-4">
            <div className="card shadow mb-4">
                <div className="card-header py-3">
                    <h5 className="m-0 font-weight-bold text-gray-800">Genres in Data Base</h5>
                </div>
                <div className="card-body">
                    <div className="row">

                        {
                            state.loading
                                ?
                                <p>Cargando...</p>
                                :
                                state.categories.map((category, index) => (
                                    <Category {...category} key={category.name + index}/>
                                ))


                        }


                    </div>
                </div>
            </div>
        </div>
    )
}
