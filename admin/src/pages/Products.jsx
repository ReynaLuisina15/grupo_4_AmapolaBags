import React, { useEffect, useState } from "react";
import { UseFetch } from "../hooks/UseFetch";
import { Table } from "../components/products/Table";
import { Info } from "../components/products/Info";
import { Modal } from "../components/modal/Modal";
import { useForm } from "../hooks/useForm";

export const Products = () => {
  const [products, setProducts] = useState({
    loading: true,
    data: [],
  });

  const [action, setAction] = useState(null);
  const [product, setProduct] = useState({});

  const [
    inputsValue,
    setInputsValues,
    handleChangeInputsValue,
    resetInputsValue,
  ] = useForm();
  const handleCreate = () => {
    setProduct({});
    setAction("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const img1 = new FormData(e.target).get("img1");
    const img2 = new FormData(e.target).get("img2");
    const formData = new FormData()
    formData.append('img1')
    const data = { img1, img2, ...inputsValue };
    console.log(data);
    
    /*   if (action === "update") {
      UseFetch(`/update/${product.id}`, "PATCH").then(({ meta, data }) => {
        // console.log(data);
        if (meta.ok) {
        }
      });
    } */

    if (action === "create") {
      UseFetch(`/products`, "POST", data).then(({ ok, data }) => {
        console.log(data);
        if (ok) {
        }
      })
      .catch(err=>console.warn(err));
    }
    resetInputsValue();
    e.target.reset();
  };

  const handleDelete = (e) => {
    e.preventDefault();
    UseFetch(`/delete/${product.id}`, "DELETE")
      .then(({ meta, data }) => {
        if (meta.ok) {
        }
      })
      .catch((error) => console.error);
  };

  useEffect(() => {
    UseFetch("/products")
      .then(({ meta: { ok }, data }) => {
        if (ok) {
          setProducts({
            loading: false,
            data,
          });
        }
      })
      .catch((error) => console.error);
  }, []);

  const getInfo = (id) => {
    UseFetch(`/products/${id}`)
      .then(({ ok, data }) => {
        if (ok) {
          setInputsValues({
            ...inputsValue,
            ...data,
          });
        }
      })
      .catch((error) => console.error);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5>Productos</h5>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleCreate}
              >
                Nuevo
              </button>
            </div>
            <div className="card-body">
              {products.loading ? (
                <p>cargando...</p>
              ) : (
                <Table
                  products={products.data.products}
                  getInfo={getInfo}
                  setAction={setAction}
                />
              )}
            </div>
          </div>
        </div>
        <div className="col-4">
          {
            <Info
              {...inputsValue}
              action={action}
              handleChangeInputsValue={handleChangeInputsValue}
              onSubmit={handleSubmit}
            />
          }
        </div>
      </div>
      <Modal
        id={product.id}
        name={product.name}
        urlImgPrimary={product.urlImgPrimary}
        onDelete={handleDelete}
      />
    </div>
  );
};
