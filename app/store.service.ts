import { createStore, combineReducers } from 'redux';
import { productReducer } from './reducer/product.reducer';
import { compareReducer } from './reducer/compare.reducer';
import { wishlistReducer } from './reducer/wishlist.reducer';

declare var window: any;

const reducers = combineReducers({
  product: productReducer,
  compare: compareReducer,
  wishlist: wishlistReducer
});

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export { store };
