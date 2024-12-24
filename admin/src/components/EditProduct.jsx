import React, { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { fetchProducts } from "../redux/products/productThunks";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  Box,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Autocomplete,
  Grid,
  Checkbox,
  FormControlLabel,
  Radio,  
  Backdrop, CircularProgress,

  RadioGroup,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import { Link } from "react-router-dom";

import {
  mockColors,
  mockSizes,
  mockMaterials,
  mockCategories,
  mockGenders,
} from "./CreateProduct";

const EditProduct = ({ product, open, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

  const [formData, setFormData] = useState({
    productname: "",
    category: "",
    material: "",
    description: "",
    colors: [],
    sizes: [],
    gender: "",
    price: 0,
    sellingprice: 0,
    Image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        productname: product.name || "",
        category: product.category?.id || "",
        material: product.material || "",
        description: product.description || "",
        colors: product.colors?.$values.map((color) => color.id) || [],
        sizes: product.sizes?.$values.map((size) => size.id) || [],
        gender: product.gender || "",
        price: product.originPrice || 0,
        sellingprice: product.price || 0,
        Image:  null,
      });
    }
  }, [product]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ ...formData, Image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.productname ||
      !formData.material ||
      !formData.category ||
      formData.sellingprice <= 0
    ) {
      toast.error("Please fill in all required fields correctly.");
     // return;
    }

    try {
      setIsLoading(true); // Hiển thị trạng thái tải

      const formDataToSend = new FormData();
      formDataToSend.append("id", product.id);
      formDataToSend.append("name", formData.productname);
      formDataToSend.append("material_Id", formData.material);
      formDataToSend.append("image", formData.Image);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("status", "active");
      formDataToSend.append("price", formData.price);
      formDataToSend.append("sellingPrice", formData.sellingprice);
      formDataToSend.append("gender_Id", parseInt(formData.gender) || 0);
      formDataToSend.append("category_Id", formData.category);

      if (formData.Image ) {
        console.log(formData.Image  );

        formDataToSend.append("imageFile", formData.Image);
      }else {
        console.error("Image file is required");
      }

      const productResponse = await fetch(
        `http://localhost:5224/api/product/${product.id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );

      if (!productResponse.ok) {
        const errorText = await productResponse.text();
        throw new Error(`Product update failed: ${errorText}`);
      }

      const deleteVariantsResponse = await fetch(
        `http://localhost:5224/api/variant/deleteByProduct/${product.id}`,
        { method: "DELETE" }
      );

      if (!deleteVariantsResponse.ok) {
        const errorText = await deleteVariantsResponse.text();
        throw new Error(`Failed to delete variants: ${errorText}`);
      }

      const variantRequests = formData.colors.flatMap((colorId) =>
        formData.sizes.map((sizeId) =>
          fetch("http://localhost:5224/api/variant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: 0,
              product_Id: product.id,
              color_Id: colorId,
              size_Id: sizeId,
              description_Id: 1,
              category_Id: formData.category,
            }),
          })
        )
        
        
      );
      
      await Promise.all(variantRequests);
      toast.success("Sản phẩm đã được xóa!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });      
      onSave();
    } catch (error) {
      console.error(error);
      toast.error("Sửa sản phẩm thất bại", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });    }finally {
      setIsLoading(false); // Tắt trạng thái tải
    }
  };

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onCancel}>
      <DialogTitle>
      <Typography variant="h6" component="h3" >Create Product</Typography>
      <Breadcrumbs aria-label="breadcrumb">
          <Link to="/">Home</Link>
          <Typography color="text.primary">Edit Product</Typography>
        </Breadcrumbs>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Product Name"
                fullWidth
                value={formData.productname}
                onChange={(e) => handleInputChange("productname", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                options={mockCategories}
                getOptionLabel={(option) => option.label}
                value={mockCategories.find((cat) => cat.id === formData.category) || null}
                onChange={(e, value) =>
                  handleInputChange("category", value ? value.id : "")
                }
                renderInput={(params) => <TextField {...params} label="Category" />}
              />
            </Grid>
            <Grid item xs={6}>
            <Autocomplete
              options={mockMaterials}
              getOptionLabel={(option) => option.label} // Hiển thị tên chất liệu
              value={
                mockMaterials.find((material) => material.id === formData.material) || null
              } // Giá trị hiện tại của Material_Id
              onChange={(e, value) =>
                setFormData({ ...formData, material: value ? value.id : null })
              } // Cập nhật Material_Id khi chọn
              renderInput={(params) => <TextField {...params} label="Material" />}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />

            </Grid>
          </Grid>

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />

          <input type="file" accept="image/*" onChange={handleFileChange}  />

          <Autocomplete
            multiple
            options={mockColors}
            getOptionLabel={(option) => option.label}
            value={mockColors.filter((color) => formData.colors.includes(color.id))}
            onChange={(e, value) =>
              handleInputChange("colors", value.map((item) => item.id))
            }
            renderInput={(params) => <TextField {...params} label="Colors" />}
          />

          <Autocomplete
            multiple
            options={mockSizes}
            getOptionLabel={(option) => option.label}
            value={mockSizes.filter((size) => formData.sizes.includes(size.id))}
            onChange={(e, value) =>
              handleInputChange("sizes", value.map((item) => item.id))
            }
            renderInput={(params) => <TextField {...params} label="Sizes" />}
          />

          <RadioGroup
            row
            value={formData.gender}
            onChange={(e) => handleInputChange("gender", e.target.value)}
          >
            {mockGenders.map((gender) => (
              <FormControlLabel
                key={gender.id}
                value={gender.id}
                control={<Radio />}
                label={gender.label}
              />
            ))}
          </RadioGroup>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Origin Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Selling Price"
                type="number"
                fullWidth
                value={formData.sellingprice}
                onChange={(e) => handleInputChange("sellingprice", e.target.value)}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </DialogActions>
            <ToastContainer />
      
    </Dialog>
    
  );
};

export default EditProduct;
