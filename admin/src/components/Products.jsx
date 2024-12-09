import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Button,
  Breadcrumbs,
  Grid,
  styled,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import TableProduct2 from "./table/TableProduct2";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/products/productThunks";

import CreateProductDialog from "./CreateProduct";

const Products = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  //const products = useSelector(Product) || [];
  const [productName, setProductName] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clearForm();
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...(theme.palette.mode === "dark" && {
      backgroundColor: "#1A2027",
    }),
  }));

  // const handleEditProduct = (index) => {
  //   const product = products[index];
  //   navigate(`/product/edit/${product.id}`);
  //   setProductName(product.name);
  //   handleOpen();
  // };

  // const handleDeleteProduct = (index) => {
  //   setProducts(products.filter((_, i) => i !== index));
  // };

  const clearForm = () => {
    setProductName("");
  };

  return (
    <Container fixed>
      <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
        <Typography variant="h5" sx={{ fontWeight: 500 }}>
          Product
        </Typography>
        <Button
          variant="contained"
          onClick={handleOpen}
          color="primary"
          sx={{ mt: 5 }}
        >
          + New Product
        </Button>
      </Box>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" to="/">
          Product
        </Link>
        <Typography color="text.primary">List</Typography>
      </Breadcrumbs>
      <CreateProductDialog open={open} handleClose={handleClose} />
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <TableProduct2 />
      </Box>
    </Container>
  );
};

export default Products;
