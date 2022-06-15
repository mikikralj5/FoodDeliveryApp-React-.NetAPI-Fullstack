const reducer = (state, action) => {
  if (action.type === 'CLEAR_CART') {
    return { ...state, cart: [] };
  }
  if (action.type === 'ADD_TO_CART') {
    let tempCart = [
      ...state.cart,
      {
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        ingredients: action.payload.ingredients,
      },
    ];

    return { ...state, cart: tempCart };
  }
  if (action.type === 'REMOVE') {
    return {
      ...state,
      cart: state.cart.filter((item) => item.id !== action.payload),
    };
  }
  return state;
};

export default reducer;
