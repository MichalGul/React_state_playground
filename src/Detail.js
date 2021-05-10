import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  const { category, id } = useParams(); // var
  const [sku, setSku] = useState("");
  const navigate = useNavigate(); // hook for redirecting !!
  console.log(id);
  console.log(category);

  const { data: product, loading, error } = useFetch(`products/${id}`);

  console.log(product);
  if (loading) return <Spinner />; // render spinner if fetch is still processing
  if (!product) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select
        id="sku"
        value={sku}
        onChange={(event) => {
          setSku(event.target.value);
        }}
      >
        {/* Display all avaliable sizes for skues */}
        <option value="">What size?</option>
        {product.skus.map((s) => (
          <option key={s.sku} value={s.sku}>
            {s.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku ? true : false}
          className="btn btn-primary"
          onClick={() => navigate("/cart")}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
