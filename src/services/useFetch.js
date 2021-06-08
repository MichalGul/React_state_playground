//Single hook to make API Calls (generic function)
import React, { useState, useEffect, useRef } from "react";
import { getProducts } from "./productService";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // function loading api data from url
  async function init() {
    try {
      const response = await fetch(baseUrl + url);
      if (response.ok) {
        const json = await response.json();
        if (isMounted.current) setData(json);
      } else {
        throw response;
      }
    } catch (error) {
      if (isMounted.current) setError(error);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  }

  //Generic call for mock API for some data
  useEffect(() => {
    isMounted.current = true;
    init();
    //cleanup function run when component is unmounted
    return () => {
      isMounted.current = false;
    };
  }, [url]); // Jezeli ktos poda nowy url do tej funcji to hook musi sie odpalic dlatego to jest w dependency array

  return { data, error, loading };
}


  //Render prop pattern
  // 1. Create component that accepts a prop called render
  // 2. The component passes data/funcs to the render function
export function  Fetch({url, render}) {
  const {data, loading, error} = useFetch(url)
  return render(data, loading, error);
}

//Function as child pattern
export function  FetchAsChild({url, children}) {
  const {data, loading, error} = useFetch(url)
  return children(data, loading, error);
}