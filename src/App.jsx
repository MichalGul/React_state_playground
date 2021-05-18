import React, { useState, useEffect} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
import Detail from "./Detail";
import Cart from "./Cart";
import Checkout from "./Checkout";

// Główny layout aplikacji App Layout
export default function App() { // jest w funkcji zeby tylko raz sie zainicjolizowalo a nie za kazdym renderem
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? []; // jezeli na lewo od ?? ejst null to daj []
    } catch (e) {
      console.error("The cart could not be parsed into JSON")
      return [];
    }
  });

  //Gdy cart sie zmieni odpal use Effect i zapisz cart pod kluczem cart to local storage
  useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])

  const addToCart = (id, sku) => {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku); // if sku in cart
      // itemInCart++; // DONT DO THIS !!!!!!!!!!!
      if (itemInCart) {
        //return new array with matching item replaced
        return items.map(
          (i) => (i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i) // obsluga dodania obiektu ktory juz jest w koszyku
        );
      } else {
        // return new array with new item appended
        return [...items, { id: id, sku: sku, quantity: 1 }]; // dodanie nowego obiektu do listy stanu
      }
    }); // Cokolwiek zwrocimy w metodzie setCart zostanie nowym stanem dla cart!!!!!
  };

  const updateQuantity = (sku, quantity) => {
    setCart((items) => {
      if( quantity === 0) {
        return items.filter((i) => i.sku !== sku)
      }
      return items.map ((i) => i.sku === sku ? {...i, quantity:quantity} : i)
    })

  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome to our SHOP</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            />
            <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} />} />
            <Route path="/checkout" element={<Checkout cart={cart} emptyCart={emptyCart} />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
