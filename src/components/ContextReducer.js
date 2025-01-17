import React, { createContext, useContext, useReducer } from "react";

// Cart State Context and Dispatch Context
const CartStateContext = createContext();
const CartDispatchContext = createContext();

// Reducer to handle cart actions
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      // Adding item to the cart
      return [
        ...state,
        {
          id: new Date().getTime(), // Generate unique id based on timestamp
          name: action.payload.foodName,
          price: action.payload.totalPrice,
          qty: action.payload.quantity,
          size: action.payload.portion,
          img: action.payload.imgSrc,
        },
      ]
      case "REMOVE":
        let newArr =[...state , ]
        newArr.splice(action.index , 1);
        return newArr;
      // Removing item from the cart
      case "DROP":
            let empArray = []
            return empArray
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
        
            return arr
    default:
      console.error("Unknown action type:", action.type);
      return state;
  }
};

// CartProvider to provide state and dispatch context
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

// Custom hooks to access the state and dispatch
export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
