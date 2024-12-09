// app/store.js
import { configureStore } from '@reduxjs/toolkit';
//import authReducer from './user/authSlice';
//import loginReducer from './user/loginSlice';
import  productReducer   from './products/productSlice';
//import cartReducer from './card/cartSlice';


const store = configureStore({
  reducer: {
    products: productReducer,
  },
});


export default store;