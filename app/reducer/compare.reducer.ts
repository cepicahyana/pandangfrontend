export const compareReducer = (state = {
  products: [],
}, action) =>{
  switch (action.type){
    case "ADD_COMPARE":
      const check = state.products.find(x => x.id === action.products.id);

      if(check === undefined){
        state = {
          ...state,
          products: [
            ...state.products,
            action.products

          ]
        }
      }

    break;

    case "DELETE_COMPARE_ITEM":
      state = {
        ...state,
        products: state.products.filter(val => val.id !== action.product.id)
      }
    break;

  }

  return state;
}
