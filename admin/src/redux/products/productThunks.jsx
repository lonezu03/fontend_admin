// features/products/productThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk gọi API để lấy danh sách sản phẩm
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axios.get('http://localhost:5224/api/product/GetAllWithVariants'); 
      return response.data.$values;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axios.get('http://localhost:5224/api/product/GetAllWithVariants'); 
      return response.data.$values;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:5224/api/product/${id}`);
      return id; // Trả về ID để slice xóa khỏi danh sách
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);