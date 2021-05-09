import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import useFetch from "./services/useFetch";
import PageNotFound from "./PageNotFound";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function Products() {
  const [size, setSize] = useState("");
  // read category from url parameter
  const { category } = useParams(); // read url parameters after : eg. /:category in App file

  const { data: products, loading, error } = useFetch(
    `products?category=${category}`
  );

  //Moved to useFetch for more generic use
  // const [products, setProducts] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);

  //Call mock API for products
  // useEffect(() => {
  //   async function init() {
  //     try {
  //       const response = await getProducts("shoes"); // Refactored from fetch calls
  //       // call getProducts after each render
  //       setProducts(response);
  //     } catch (error) {
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   init();
  // }, []); // Dependency array - list of reasons that useEffect should re-run

  const renderProduct = (p) => {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  };

  const filteredProducts = size
    ? products.filter((p) => p.skus.find((s) => s.size === parseInt(size)))
    : products;

  if (error) throw error;
  if (loading) return <Spinner />; // render spinner if fetch is still processing
  if (products.length === 0) return <PageNotFound />;
  // to zwraca JSX wszystko przed tym bedzie renderowane wczesniej
  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(event) => {
            setSize(event.target.value);
          }}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
