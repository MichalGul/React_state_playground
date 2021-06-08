import React, { useEffect, useReducer} from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./Products";
import { Routes, Route } from "react-router-dom";
// import Detail from "./Detail";
import Detail from "./Detail.class";
import Cart from "./Cart";
// import Checkout from "./Checkout"; function component Checkout
import Checkout from "./Checkout.class"
import cartReducer from "./cartReducer";
import {CartContext} from "./cartContext"
import {useCart} from "./cartContext"

// let initialCart;
// // Call once on initial page load
//     try {
//       initialCart = JSON.parse(localStorage.getItem("cart")) ?? []; // jezeli na lewo od ?? ejst null to daj []
//     } catch (e) {
//       console.error("The cart could not be parsed into JSON")
//       initialCart = []
//     }
// Moved to cart provider
// let initialCart;
// try {
//   initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
// } catch {
//   console.error("The cart could not be parsed into JSON.");
//   initialCart = [];
// }


// Główny layout aplikacji App Layout
export default function App() { // jest w funkcji zeby tylko raz sie zainicjolizowalo a nie za kazdym renderem
  // const [cart, setCart] = useState(() => {
  //   try {
  //     return JSON.parse(localStorage.getItem("cart")) ?? []; // jezeli na lewo od ?? ejst null to daj []
  //   } catch (e) {
  //     console.error("The cart could not be parsed into JSON")
  //     return [];
  //   }
  // });

  //moved to cart context provider
  // const [cart, dispatch] = useReducer(cartReducer, initialCart);

  //Gdy cart sie zmieni odpal use Effect i zapisz cart pod kluczem cart to local storage
  //moved to cartCOntext
  // useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])

  /////// Replaced with use reducer
  // const addToCart = (id, sku) => {
  //   setCart((items) => {
  //     const itemInCart = items.find((i) => i.sku === sku); // if sku in cart
  //     // itemInCart++; // DONT DO THIS !!!!!!!!!!!
  //     if (itemInCart) {
  //       //return new array with matching item replaced
  //       return items.map(
  //         (i) => (i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i) // obsluga dodania obiektu ktory juz jest w koszyku
  //       );
  //     } else {
  //       // return new array with new item appended
  //       return [...items, { id: id, sku: sku, quantity: 1 }]; // dodanie nowego obiektu do listy stanu
  //     }
  //   }); // Cokolwiek zwrocimy w metodzie setCart zostanie nowym stanem dla cart!!!!!
  // };
  //
  // const updateQuantity = (sku, quantity) => {
  //   setCart((items) => {
  //     if( quantity === 0) {
  //       return items.filter((i) => i.sku !== sku)
  //     }
  //     return items.map ((i) => i.sku === sku ? {...i, quantity:quantity} : i)
  //   })
  //
  // }
  //
  // function emptyCart() {
  //   setCart([]);
  // }

  const {dispatch} = useCart()

  return (
      // dodanie contextu stworzonego w cartContext value określa co ma być dzielone, te warości mogą być użytę teraz przez cartContext
      // <CartContext.Provider value={{cart, dispatch}}> nie potrzebne bo korzystamy z CartProvidera w index.js
      <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<h1> Welcome to our SHOP</h1>} />
            <Route path="/:category" element={<Products />} />
            <Route
              path="/:category/:id"
              element={<Detail />}
            />
            {/*<Detail dispatch={dispatch} /> propsy juz nie potrzebne bo przez context sa dane przekazywane*/}
            <Route path="/cart" element={<Cart/>} /> {/*<Cart cart={cart} dispatch={dispatch} /> juz nie trzeba bo jest context*/}
            <Route path="/checkout" element={<Checkout dispatch={dispatch} />} />
          {/* <Checkout cart={cart} dispatch={dispatch} /> zamiast przez propsy parametry ida przez context*/}
          </Routes>
        </main>
      </div>
      <Footer />
      </>
    // </CartContext.Provider>
  );
}
