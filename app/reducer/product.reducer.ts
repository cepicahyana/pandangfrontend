export const productReducer = (state = {
  test: null,
  cartItem: 0,
  products: [],
  listProducts: []
}, action) =>{
  switch (action.type){
    case "ADD_TO_CART":
      const check = state.products.find(x => x.id === action.products.id);

      if(check === undefined){
        action.products["qty"] = 1;
        state = {
          ...state,
          cartItem: state.cartItem + 1,
          products: [
            ...state.products,
            action.products

          ]
        }
      }
      else{
        console.log((check.qty + 1));
        //action.products["qty"] = (check.qty + 1);
        state = {
          ...state,
          cartItem: state.cartItem + 1,
          products:[
            ...state.products.filter(p => p !== check),
            {
              ...check,
              qty: (check.qty + 1)
            }
          ]
        }
      }
    break;

    case "ADD_LIST_PRODUCTS":

    break;

    case "UPDATE_QTY_CART_ITEM":
      const getData = state.products.find(x => x.id === action.product.id);
      //console.log(action.oldQty);
      state = {
        ...state,
        cartItem: ((state.cartItem - action.oldQty) + action.newQty),
        products:[
          ...state.products.filter(p => p !== getData),
          {
            ...getData,
            qty: action.newQty
          }
        ]
      }
    break;

    case "DELETE_CART_ITEM":
      state = {
        ...state,
        cartItem: state.cartItem - action.product.qty,
        products: state.products.filter(val => val.id !== action.product.id)
      }
    break;

    case "TEST_PRODUCT":
      state = {
        ...state,
        test: "Hai saya upin"
      }
      //console.log(state);
    break;

    case "RESET_PRODUCT":
      state = {
        ...state,
        test: "Hai saya compare"
      }
      //console.log(state);
    break;
  }

  return state;
}
