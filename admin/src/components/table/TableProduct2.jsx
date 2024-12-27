import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Pagination,
  CircularProgress,
  Stack,
} from "@mui/material";
import EditProduct from "../EditProduct";
import { deleteProduct } from "../../redux/products/productThunks";
import { Product } from "../../redux/products/productSelectors";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector(Product);
  const [open, setOpen] = useState(false); // Quản lý trạng thái dialog
  const [selectedId, setSelectedId] = useState(null); // Lưu ID sản phẩm cần xóa

  const [isEditing, setIsEditing] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Trạng thái đang xóa

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Tính toán các sản phẩm hiển thị
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productList.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(productList.length / productsPerPage);

  const handleEdit = (id) => {
    const productToEdit = productList.find((product) => product.id === id);
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setIsEditing(true);
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedId(id); // Gán ID sản phẩm
    setOpen(true); // Hiển thị dialog
  };

  const handleCloseDialog = () => {
    setOpen(false); // Đóng dialog
    setSelectedId(null); // Xóa ID được chọn
  };

  const handleConfirmDelete = async () => {
    if (selectedId) {
      setIsDeleting(true); // Hiển thị trạng thái chờ
      await dispatch(deleteProduct(selectedId)); 
      setIsDeleting(false); // Tắt trạng thái chờ
      toast.success("Sản phẩm đã được xóa!", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });      
    }
    handleCloseDialog(); 
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
    window.location.reload(); 
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedProduct(null);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Colors</th>
            <th className="border border-gray-300 px-4 py-2">Sizes</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {product.variants.$values.length > 0 ? (
                  <img
                    src={product.image}
                    alt={product.variants.$values.id}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                ) : (
                  <p>No image available</p>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.colors.$values.map((color) => color.name).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.sizes.$values.map((size) => size.name).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleOpenDialog(product.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(product.id)}
                  >
                    Edit
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Xác Nhận Xóa */}
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-delete-dialog-title"
      >
        <DialogTitle id="confirm-delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Có chắc chắn muốn xóa sản phẩm này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            color="secondary"
            disabled={isDeleting}
          >
            {isDeleting ? <CircularProgress size={20} /> : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Hiển thị phân trang */}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        className="mt-4"
      />

      {/* Hiển thị form chỉnh sửa nếu đang chỉnh sửa */}
      {isEditing && selectedProduct && (
        <EditProduct
          product={selectedProduct}
          open={isEditing}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
                <ToastContainer />
    
    </div>
  );
};

export default Products;
