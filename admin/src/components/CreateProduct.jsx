import React, { useState } from "react";
import {
  Avatar, // Thêm thành phần Avatar từ Material-UI
  RadioGroup, // Thêm RadioGroup
  Radio,
} from "@mui/material";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  Typography,
  Breadcrumbs,
  Autocomplete,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TestFieldSmall from "../Input/TestFieldSmall";
import TestFiedComponent from "../Input/TestFiedComponent";
import TestArial from "../Input/TestArial";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { CreateProduct } from "../Redux/Product";
import { toast } from "react-toastify";

// Mock Data (Replace with Redux selectors if necessary)
export const mockMaterials = [
  { id: 1, label: "Leather" },
  { id: 2, label: "Cotton" },
  { id: 3, label: "Polyester" },
  { id: 4, label: "Wool" },
  { id: 5, label: "Silk" },
];

export const mockColors = [
  { id: 1, label: "Red", value: "#FF0000" },
  { id: 2, label: "Green", value: "#00FF00" },
  { id: 3, label: "Blue", value: "#0000FF" },
  { id: 4, label: "Black", value: "#000000" },
];
export const mockSizes = [
  { id: 1, label: "S" },
  { id: 2, label: "M" },
  { id: 3, label: "L" },
  { id: 4, label: "XL" },
];
export const mockCategories =  [
  { id: 1, label: "Clothing" },
  { id: 2, label: "Footwear" },
  { id: 3, label: "Accessories" },
  { id: 4, label: "Shoes" },
];
export const mockGenders = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
  { id: 3, label: "Unisex" },
];

const CreateProductDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const [ProductCreate, setProductCreate] = useState({
    productname: "",
    category: "",
    material: "",
    gender: "",
    colors: [],
    sizes: [],
    price: 0,
    sellingprice: 0,
    description: [
      { title: "", description: "", idproduct: "" },
      { title: "", description: "", idproduct: "" },
    ],
    Image: "",
  });

  const handleDescriptionUpdate = (index, field, value) => {
    setProductCreate((prev) => {
      const updatedDescription = [...prev.description];
      updatedDescription[index] = {
        ...updatedDescription[index],
        [field]: value,
      };
      return { ...prev, description: updatedDescription };
    });
  };

  const handleInputChange = (field, value) => {
    setProductCreate((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (value) => {
    setProductCreate((prev) => ({ ...prev, price: value }));
  };

  const handleSellingPriceChange = (value) => {
    setProductCreate((prev) => ({ ...prev, sellingprice: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
      setProductCreate((prev) => ({ ...prev, Image: file }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetForm = () => {
    setProductCreate({
      productname: "",
      category: "",
      material: "",
      gender: "",
      colors: [],
      sizes: [],
      price: 0,
      sellingprice: 0,
      description: [
        { title: "", description: "", idproduct: "" },
        { title: "", description: "", idproduct: "" },
      ],
      Image: "",
    });
  };

const handleSubmit = async () => {
  try {
    // Tạo FormData để gửi toàn bộ dữ liệu sản phẩm và ảnh
    const formData = new FormData();

    // Thêm thông tin sản phẩm vào FormData
    formData.append("name", ProductCreate.productname);
    formData.append("material_Id", ProductCreate.material);
    formData.append("description", ProductCreate.description[0].description);
    formData.append("status", "active");
    formData.append("price", ProductCreate.price);
    formData.append("gender_Id", parseInt(ProductCreate.gender));
    formData.append("category_Id", ProductCreate.category);

    // Thêm ảnh vào FormData nếu có
    if (ProductCreate.Image) {
      formData.append("imageFile", ProductCreate.Image);
    }

    // Gửi yêu cầu tạo sản phẩm kèm ảnh
    const productResponse = await fetch("http://localhost:5224/api/product", {
      method: "POST",
      body: formData,
    });

    if (!productResponse.ok) {
      const errorText = await productResponse.text();
      throw new Error(`Product creation failed: ${errorText}`);
    }

    const createdProduct = await productResponse.json();
    const productId = createdProduct.id;

    if (!productId) {
      throw new Error("Failed to retrieve product ID");
    }

    // Tạo các variants cho sản phẩm
    const variantRequests = [];
    ProductCreate.colors.forEach((colorId) => {
      ProductCreate.sizes.forEach((sizeId) => {
        variantRequests.push(
          fetch("http://localhost:5224/api/variant", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: 0,
              product_Id: productId,
              color_Id: colorId,
              size_Id: sizeId,
              description_Id: 1,
              category_Id: ProductCreate.category,
            }),
          })
        );
      });
    });

    // Gửi tất cả yêu cầu tạo Variants
    await Promise.all(variantRequests);

    // Thông báo thành công
    toast.success("Product and variants created successfully!");
    resetForm();
    handleClose();
    window.location.reload(); // Làm mới trang

  } catch (error) {
    console.error(error);
    toast.error("An error occurred while creating the product or variants.");
  }
};

  return (
    <div>
      <Dialog fullWidth maxWidth="lg" open={open} onClose={handleClose}>
        <DialogTitle>
          <h3>Create Product</h3>
          <Breadcrumbs aria-label="breadcrumb">
            <Link to="/">Home</Link>
            <Typography color="text.primary">Create Product</Typography>
          </Breadcrumbs>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <List>
              <ListItem>
                <ListItemText
                  primary={
                    <Grid container spacing={1}>
                      <Grid item xs={4}>
                        <TestFieldSmall
                          placeholder="Enter product name"
                          value={ProductCreate.productname}
                          setvalue={(value) =>
                            handleInputChange("productname", value)
                          }
                          title="Product Name"
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <Autocomplete
                         options={mockCategories}
                          getOptionLabel={(option) => option.label} // Hiển thị nhãn
                          value={mockCategories.find((cat) => cat.id === ProductCreate.category) || null}
                          onChange={(e, value) =>
                            handleInputChange("category", value ? value.id : null) // Lưu ID
                          }
                          renderInput={(params) => <TextField {...params} label="Category" />}
                        />
                      </Grid>
                      <Grid item xs={4}>
                      <Autocomplete
                        options={mockMaterials}
                        getOptionLabel={(option) => option.label} // Key chính xác là "label"
                        value={mockMaterials.find((mat) => mat.id === ProductCreate.material) || null}
                        onChange={(e, value) => handleInputChange("material", value ? value.id : "")}
                        renderInput={(params) => <TextField {...params} label="Material" />}
                      />
                    </Grid>

                    </Grid>
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary={
                    <TestArial
                      title="Description"
                      value={ProductCreate.description[0].description}
                      setvalue={(value) =>
                        handleDescriptionUpdate(0, "description", value)
                      }
                    />
                  }
                />
              </ListItem>
              <Divider />
              <ListItem>
              <input 
  type="file" 
  accept="image/*" 
  onChange={handleFileChange} 
/>
              </ListItem>
              <Divider />
              <ListItem>
                <Autocomplete
                 multiple
  options={mockColors}
  getOptionLabel={(option) => option.label}
  value={mockColors.filter((color) => ProductCreate.colors.includes(color.id))}
  onChange={(e, value) =>
    handleInputChange("colors", value.map((item) => item.id)) // Lưu ID
  }
  renderInput={(params) => <TextField {...params} label="Colors" />}
                />
              </ListItem>
              <ListItem>
  <ListItemText
    primary={
      <div>
        <Typography variant="h6">Gender</Typography>
        <RadioGroup
          row
          value={ProductCreate.gender}
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
      </div>
    }
  />
</ListItem>
              <Divider />
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ProductCreate.gender === "Male"}
                      onChange={() => handleInputChange("gender", "Male")}
                    />
                  }
                  label="Male"
                />
              </ListItem>
              <ListItem>
  <ListItemText
    primary={
      <div>
        <Typography variant="h6">Size</Typography>
        <RadioGroup
          row
          value={ProductCreate.sizes}
          onChange={(e) => handleInputChange("sizes", [e.target.value])}
        >
           {mockSizes.map((size) => (
    <FormControlLabel
      key={size.id}
      value={size.id}
      control={<Radio />}
      label={size.label}
    />
  ))}
        </RadioGroup>
      </div>
    }
  />
</ListItem>
<ListItem>
  <ListItemText
    primary={
      <div>
        <Typography variant="h6">Prices</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TestFiedComponent
              placeholder="$ 0.00"
              title="Origin Price"
              value={ProductCreate.price}
              setvalue={handlePriceChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TestFiedComponent
              placeholder="$ 0.00"
              title="Selling Price"
              value={ProductCreate.sellingprice}
              setvalue={handleSellingPriceChange}
            />
          </Grid>
        </Grid>
      </div>
    }
  />
</ListItem>

            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleSubmit}>
            Create
          </Button>
          <Button variant="text" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateProductDialog;
