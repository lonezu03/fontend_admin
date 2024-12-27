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
  Backdrop, CircularProgress,
  FormControlLabel,
} from "@mui/material";

import TestFieldSmall from "../Input/TestFieldSmall";
import TestFiedComponent from "../Input/TestFiedComponent";
import TestArial from "../Input/TestArial";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { CreateProduct } from "../Redux/Product";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Mock Data (Replace with Redux selectors if necessary)
export const mockMaterials = [
  { id: 1, label: "Cotton" },
  { id: 2, label: "Polyester" },
  { id: 3, label: "Silk" },
  { id: 8, label: "Denim" },
  { id: 9, label: "Leather" },
  { id: 10, label: "Nylon" },
  { id: 11, label: "Rayon" },
  { id: 12, label: "Linen" },
  { id: 13, label: "Spandex" },
  { id: 14, label: "Cashmere" },
];


export const mockColors = [
  { id: 1, label: "Red", value: "#FF0000" },
  { id: 2, label: "Blue", value: "#0000FF" },
  { id: 3, label: "Green", value: "#00FF00" },
  { id: 1004, label: "Black", value: "#000000" },
  { id: 1005, label: "White", value: "#FFFFFF" },
  { id: 1006, label: "Gray", value: "#808080" },
  { id: 1010, label: "Yellow", value: "#FFFF00" },
  { id: 1011, label: "Pink", value: "#FFC0CB" },
  { id: 1012, label: "Purple", value: "#800080" },
  { id: 1013, label: "Orange", value: "#FFA500" },
];

export const mockSizes = [
  { id: 1, label: "S" },
  { id: 2, label: "M" },
  { id: 3, label: "L" },
  { id: 1004, label: "XL" },
  { id: 1005, label: "XXL" },


];
export const mockCategories =  [
  { id: 1, label: "Áo" },
  { id: 2, label: "Áo khoác" },
  { id: 3, label: "Quần" },
];
export const mockGenders = [
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
  { id: 3, label: "Unisex" },
];

const CreateProductDialog = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false); // Trạng thái tải

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

  const validateProduct = (product) => {
    const {
      productname,
      material,
      description,
      sellingprice,
      gender,
      category,
      colors,
      sizes,
    } = product;
  
    if (!productname) return "Tên sản phẩm không được để trống!";
    if (!material) return "Chất liệu sản phẩm không được để trống!";
    if (!description[0].description.trim()) return "Mô tả sản phẩm không được để trống!";
    if (!sellingprice || isNaN(sellingprice) || sellingprice <= 0)
      return "Giá bán phải là số và lớn hơn 0!";
    if (!gender) return "Vui lòng chọn giới tính cho sản phẩm!";
    if (!category) return "Danh mục sản phẩm không được để trống!";
    if (colors.length === 0) return "Vui lòng chọn ít nhất một màu!";
    if (sizes.length === 0) return "Vui lòng chọn ít nhất một kích cỡ!";
    return null; // Không có lỗi
  };
  
  const handleSubmit = async () => {
    try {
      // Kiểm tra tính hợp lệ
      const validationError = validateProduct(ProductCreate);
      setIsLoading(true); // Hiển thị trạng thái tải

      if (validationError) {
        toast.error(validationError, {
          position: "top-right",
          autoClose:500,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          //progress: undefined,
        });
        setIsLoading(false); // Hiển thị trạng thái tải

        return; // Dừng nếu có lỗi
      }
  
      setIsLoading(true); // Hiển thị trạng thái tải
  
      // Tạo FormData để gửi toàn bộ dữ liệu sản phẩm và ảnh
      const formData = new FormData();
      formData.append("name", ProductCreate.productname);
      formData.append("material_Id", ProductCreate.material);
      formData.append("description", ProductCreate.description[0].description);
      formData.append("status", "active");
      formData.append("price", ProductCreate.sellingprice);
      formData.append("gender_Id", parseInt(ProductCreate.gender));
      formData.append("category_Id", ProductCreate.category);
      if (ProductCreate.Image) formData.append("imageFile", ProductCreate.Image);
  
      // Gửi yêu cầu tạo sản phẩm
      const productResponse = await fetch("http://localhost:5224/api/product", {
        method: "POST",
        body: formData,
      });
  
      const createdProduct = await productResponse.json();
      if (!productResponse.ok) {
        if (createdProduct.message === "Product name already exists.") {
          toast.error("Sản phẩm này đã tồn tại!", { /* Cấu hình toast */ });
        } else {
          throw new Error(createdProduct.message || "Unknown error");
        }
        return;
      }
  
      // Thành công: Tạo Variants
      const productId = createdProduct.id;
      if (!productId) throw new Error("Failed to retrieve product ID");
  
      const variantRequests = ProductCreate.colors.flatMap((colorId) =>
        ProductCreate.sizes.map((sizeId) =>
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
        )
      );
  
      await Promise.all(variantRequests);
  
      toast.success("Sản phẩm đã được tạo thành công!", { /* Cấu hình toast */ });
      resetForm();
      handleClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Tạo sản phẩm không thành công, vui lòng kiểm tra lại!", { /* Cấu hình toast */ });
    } finally {
      setIsLoading(false); // Tắt trạng thái tải
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
                          required
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
  required
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
              <ListItemText
  primary={
    <div>
      <Typography variant="h6">Size</Typography>
      <div>
        {mockSizes.map((size) => (
          <FormControlLabel
            key={size.id}
            control={
              <Checkbox
                checked={ProductCreate.sizes.includes(size.id)} // Kiểm tra size đã chọn
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  const newSizes = isChecked
                    ? [...ProductCreate.sizes, size.id] // Thêm size nếu được chọn
                    : ProductCreate.sizes.filter((s) => s !== size.id); // Loại bỏ size nếu bỏ chọn

                  handleInputChange("sizes", newSizes); // Cập nhật state
                }}
                required
              />
            }
            label={size.label}
          />
        ))}
      </div>
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
        <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={isLoading} // Vô hiệu hóa nút khi tải
      >
        {isLoading ? "Processing..." : "Create Product"}
      </Button>

      {/* Backdrop với CircularProgress */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading} // Hiển thị khi đang tải
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
          <Button variant="text" color="error" onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <ToastContainer />
    </div>
  );
};

export default CreateProductDialog;
