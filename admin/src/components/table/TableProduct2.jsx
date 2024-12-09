// import {
//   Box,
//   Typography,
//   Container,
//   Button,
//   Breadcrumbs,
//   Grid,
//   styled,
//   Paper,
// } from "@mui/material";
import { useDispatch,useSelector } from 'react-redux';
import {deleteProduct} from '../../redux/products/productThunks'
 
import { Product} from "../../redux/products/productSelectors";


const Products = () => {
  const dispatch = useDispatch();

 
  const productList  = useSelector(Product);
  //console.log("lay dc ds product roi ne", productList)


  
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };
  return (
<div className="p-6">
      <h1 className="text-xl font-bold mb-4">Product Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Colors</th>
            <th className="border border-gray-300 px-4 py-2">Sizes</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">{product.images.$values.length > 0 ? (
          <img
            src={product.images.$values[0].url} // Chuyển đổi Base64 thành URL hình ảnh
            alt={product.images.$values.name}
            className="w-12 h-12 rounded-lg object-cover"
            />
        ) : (
          <p>No image available</p>
        )}</td>
              <td className="border border-gray-300 px-4 py-2">{product.name}</td>
              <td className="border border-gray-300 px-4 py-2">{product.price}</td>
              <td className="border border-gray-300 px-4 py-2">
                {product.colors.$values.map((color) => color.name).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.sizes.$values.map((size) => size.name).join(", ")}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-700"
                  onClick={() => handleDelete(product.id)}
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>  );
};

export default Products;
