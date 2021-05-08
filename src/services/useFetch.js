//Single hook to make API Calls (generic function)
import React, { useState, useEffect } from "react";
import { getProducts } from "./productService";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  //Generic call for mock API for some data
  useEffect(() => {
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        setData(response);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [url]); // Jezeli ktos poda nowy url do tej funcji to hook musi sie odpalic dlatego to jest w dependency array

  return { data, error, loading };
}
