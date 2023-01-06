import React, { useEffect, useState } from "react";
import { UseFetch } from "../hooks/UseFetch";
import { Table } from "../components/products/Table";
import { Info } from "../components/products/Info";
import { Modal } from "../components/modal/Modal";

export const Products = () => {
  const [products, setProducts] = useState({
    loading: true,
    data: [],
  });
  const [action, setAction] = useState(null);
  const [product, setProduct] = useState({});

  const handleCreate = () => {
    setProduct({});
    setAction("create");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const elements = Array.from(e.target.elements);
    elements.forEach((el) => {
      setProduct((product) => {
        return {
          ...product,
          [el.name]: el.value,
        };
      });
    });

    if (action === "update") {
      UseFetch(`/update/${product.id}`, "PATCH").then(({ meta, data }) => {
        // console.log(data);
        if (meta.ok) {
        }
      });
    }
    
    if (action === "create") {
      UseFetch(`/api/products`, "POST").then(({ meta, data }) => {
        // console.log(data);
        if (meta.ok) {
        }
      });
    }
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
      .then(({ meta, data }) => {
        if (meta.ok) {
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
          setProduct(data);
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
          {<Info {...product} action={action} onSubmit={handleSubmit} />}
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
