import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts,deleteProduct } from "./productThunks"

// Async thunk để thêm sản phẩm


const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [], // Danh sách sản phẩm
    status: 'idle', // idle | loading | succeeded | failed
    error: null, // Lỗi nếu có
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.error = action.payload;
      });;
  },
});

export default productSlice.reducer;
