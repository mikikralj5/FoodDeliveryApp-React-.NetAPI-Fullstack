import { createContext, useContext, useState, useReducer } from 'react';
import reducer from './reducer';
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [chosenProducts, setChosenProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //  const [cart, setCart] = useState([]);
  const initialState = {
    cart: [],
    total: 0,
    amount: 0,
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  const addToCart = (id, price, name, ingredients) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { id, price, name, ingredients },
    });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loggedIn,
        setLoggedIn,
        loading,
        setLoading,
        setChosenProducts,
        chosenProducts,
        //  cart,
        //  setCart,
        ...state,
        clearCart,
        addToCart,
        remove,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
