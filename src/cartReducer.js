// export default function cartReducer(cart, action) {
//     console.log(cart, action)
//     switch (action.type) {
//         case 'empty':
//             return [];
//         case 'add':
//             const {id, sku} = action
//               const itemInCart = cart.find((i) => i.sku === sku); // if sku in cart
//               // itemInCart++; // DONT DO THIS !!!!!!!!!!!
//               if (itemInCart) {
//                 //return new array with matching item replaced
//                 return cart.map(
//                   (i) => (i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i) // obsluga dodania obiektu ktory juz jest w koszyku
//                 );
//               } else {
//                 // return new array with new item appended
//                 return [...cart, { id: id, sku: sku, quantity: 1 }]; // dodanie nowego obiektu do listy stanu
//               }
//         case 'updateQuantity': {
//             const {sku, quantity} = action;
//             if (quantity === 0) {
//                 return cart.filter((i) => i.sku !== sku)
//             }
//             return cart.map((i) => i.sku === sku ? {...i, quantity: quantity} : i)
//         }
//         default:
//             throw new Error("Unhandled action " + action.type)
//     }
// }

export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "updateQuantity": {
      const { quantity, sku } = action;
      return quantity === 0
        ? cart.filter((i) => i.sku !== sku)
        : cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    }
    case "add":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        // Return new array with the matching item replaced
        return cart.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        // Return new array with the new item appended
        return [...cart, { id, sku, quantity: 1 }];
      }
    default:
      throw new Error("Unhandled action " + action.type);
  }
}
