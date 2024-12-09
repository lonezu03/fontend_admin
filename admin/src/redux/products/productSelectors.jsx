// features/products/productSelectors.js

// Lấy toàn bộ danh sách sản phẩm
export const Product = (state) => state.products.items;

// Lấy trạng thái tải của sản phẩm
export const selectProductStatus = (state) => state.products.status;

// Lấy lỗi của sản phẩm nếu có
export const selectProductError = (state) => state.products.error;
