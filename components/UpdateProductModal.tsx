
"use client";

import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import { useAddProductMutation, useGetProductDetailsQuery } from "@/redux/services/userReducers";
import { toast } from "sonner";
// import {Cross} from "lucide-react"
import { Close } from "@mui/icons-material";

const UpdateProductModal = ({id,setEditProductModalOpen,editProductModalOpen}:{id:string,setEditProductModalOpen:Function,editProductModalOpen:boolean}) => {
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: 0,
    gender: "",
    description: "",
    images: [] as any,
    sizes: [] as { size: string; stock: number }[], // 👈 sizes with stock
  });

  const {data:productData,isLoading,error}=useGetProductDetailsQuery(id);

  const sizes = ["36", "37", "38", "39", "40", "41", "42", "43", "44"];
  const brands = [
    "Nike",
    "Adidas",
    "Puma",
    "Reebok",
    "Under Armour",
    "New Balance",
    "Asics",
    "Converse",
    "Vans",
    "Fila",
  ];
  // const [addProductMutation] = useAddProductMutation();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file: any) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setFormData({ ...formData, images: [...formData.images, ...newImages] });
  };

  const removeImage = (index: number) => {
    const updatedImages = formData.images.filter(
      (_: any, i: any) => i !== index
    );
    setFormData({ ...formData, images: updatedImages });
  };

  const handleSizeChange = (_: any, newSizes: string[]) => {
    const updated = newSizes.map((s) => {
      // const sizeNum=Number(s);
      const existing = formData.sizes.find((item) => item.size === s);
      return existing || { size: s, stock: 0 };
    });
    setFormData({ ...formData, sizes: updated });
  };

  const handleStockChange = (size: string, stock: number) => {
    const updated = formData.sizes.map((item) =>
      item.size === size ? { ...item, stock } : item
    );
    setFormData({ ...formData, sizes: updated });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const newSizes = formData.sizes.map((s) => ({
      size: s.size,
      stock: s.stock || 0,
    }));
    const newPrice = parseInt(formData.price as any, 10);

    // convert all selected images to base64
    const base64Images = await Promise.all(
      formData.images.map((img: any) => getBase64(img.file))
    );

    // ✅ Build payload explicitly
    const payload = {
      ...formData,
      price: newPrice,
      sizes: newSizes,
      images: base64Images, // now strings
    };

    console.log("Submitting payload", payload);

    // const { data, error } = await addProductMutation(payload);

    // if (data?.success) {
    //   toast.success(data?.message);
    // }
    // if (error && "data" in error) {
    //   const errorMessage = (error.data as { message: string })?.message;
    //   toast.error(errorMessage);
    // }

    // reset form
    setFormData({
      name: "",
      brand: "",
      category: "",
      price: 0,
      gender: "",
      description: "",
      images: [],
      sizes: [],
    });
  };

  useEffect(()=>{
    if(productData && productData?.success){
      console.log(productData?.product);
      const {name,brand,category,price,gender,description,images,sizes}=productData?.product;
      setFormData({name,brand,category,price,gender,description,images,sizes});
    }
    if (error && "data" in error) {
      const errorMessage = (error.data as { message: string })?.message;
      toast.error(errorMessage);
    }
  },[productData])

  return (
    productData && productData.success &&
    <div className="p-2 md:p-4 flex justify-center items-center flex-1 w-full h-full mx-auto ">
      <div className="w-[95%] md:w-[50%] max-h-screen overflow-y-auto bg-gray-900 p-6 rounded-lg shadow-lg relative">
        <h1 className="text-2xl font-bold text-gray-100 text-center mb-6">
          Update Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {/* select Brand */}
          <div>
           
            <select
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select brand
              </option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Shoes">Shoes</option>
              <option value="Sneakers">Sneakers</option>
              <option value="Boots">Boots</option>
              <option value="Loafers">Loafers</option>
              <option value="Sandals">Sandals</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select gender
              </option>
              <option value="Men">men</option>
              <option value="Women">women</option>
              <option value="Unisex">unisex</option>
            </select>
          </div>

          {/* Sizes with Stock */}
          <div>
            <Autocomplete
              multiple
              disableCloseOnSelect
              options={sizes}
              value={formData.sizes.map((s) => s.size) as any}
              onChange={handleSizeChange}
              getOptionLabel={(option) => option}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    variant="outlined"
                    sx={{
                      color: "white",
                      borderColor: "white",
                      "& .MuiChip-deleteIcon": {
                        color: "white",
                      },
                    }}
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Sizes"
                  sx={{
                    "& .MuiInputLabel-root": { color: "white" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "white" },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": { borderColor: "white" },
                      "&:hover fieldset": { borderColor: "white" },
                      "&.Mui-focused fieldset": { borderColor: "white" },
                      "& input": { color: "white" },
                    },
                  }}
                />
              )}
            />
          </div>

          {/* Stock inputs per size */}
          {formData.sizes.length > 0 && (
            <div className="space-y-2">
              <label
                htmlFor="stock"
                className="block text-gray-300 font-medium"
              >
                Stock per size
              </label>
              {formData.sizes.map((item) => (
                <div key={item.size} className="flex items-center gap-4">
                  <span className="text-gray-200 w-12">{item.size}</span>
                  <input
                    type="number"
                    min={0}
                    value={item.stock}
                    onChange={(e) =>
                      handleStockChange(item.size, Number(e.target.value))
                    }
                    placeholder="Stock"
                    className="flex-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Price */}
          <div>
            <label htmlFor="price" className="block text-gray-300 font-medium">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full mt-1 p-2 bg-gray-700 text-gray-100 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">

            {/* Hidden default file input */}
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            {/* Custom modern button */}
            <label
              htmlFor="images"
              className="inline-flex items-center px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
               text-white font-semibold shadow-lg cursor-pointer transition-transform 
               hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0-9l-3 3m3-3l3 3m0-9a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              Update Images
            </label>
          </div>

          {/* Selected Images */}
          <div className="mt-4">
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((img: any, index: number) => (
                  <div
                    key={index}
                    className="group relative w-full aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <img
                      src={img.preview || img.url}
                      alt={`Selected ${index + 1}`}
                      className="w-full h-full object-cover"
                    />

                    {/* Dark hover overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        type="button"
                        // className="bg-black rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <Close className="w-5 h-5" fontSize="large"/>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-gray-100 p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Update Product
            </button>
          </div>
        </form>
      <Close className='absolute top-4 right-4 cursor-pointer text-white' onClick={() => setEditProductModalOpen(false)}/>
      </div>
    </div>
  );
};

export default UpdateProductModal;
