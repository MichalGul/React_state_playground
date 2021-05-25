import React, {useEffect, useReducer, useContext} from "react";
import cartReducer from "./cartReducer";

export const CartContext = React.createContext(null);

//Context config - jeżeli opakujemy jakiś komponent w CartProvider to bedzie miał dostęp do stanu - patrz index.js

let initialCart;
try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);
    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart])
    const contextValue = {
        cart,
        dispatch
    }
    return <CartContext.Provider value={contextValue}>
        {props.children}
    </CartContext.Provider>
}

//Przykładowy hook wykorzystujący context dzieki niemu unikami niepotrzebnych importów
export function useCart() {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within CartProvider. Wrap a parant componeney in <CartProvider to fix this error")
    }

    return context;
}