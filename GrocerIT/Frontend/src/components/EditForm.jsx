/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
} from "firebase/storage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase config/firebase.config";

export default function EditForm({ setLoading, data }) {
  const [productDetails, setProductDetails] = useState(data);
  const [imagesNone, setImagesNone] = useState(false);
  const categories = [
    "Whole Spices",
    "Ground Spices",
    "Herbs and Leaves",
    "Spice Blends",
    "Seeds and Nuts",
    "Chilies and Peppers",
    "Sweet Spices",
    "Miscellaneous",
  ];
  let urls = [];

  const navigation = useNavigate();
  const handleSeller = async (e) => {
    e.preventDefault();

    let temp = 0;
    setLoading(true);

    if (productDetails.product_name.length < 5) {
      setLoading(false);
      return;
    }
    if (productDetails.product_category.length < 1) {
      setLoading(false);
      return;
    }
    if (productDetails.product_description.length < 20) {
      setLoading(false);
      return;
    }
    if (productDetails.product_images.length < 1) {
      setLoading(false);
      setImagesNone(true);
      return;
    }
    if (Number(productDetails.product_quantity) < 20) {
      setLoading(false);
      return;
    }
    if (Number(productDetails.product_stock) < 5) {
      setLoading(false);
      return;
    }
    const checkResponse = await axios.post(
      `http://127.0.0.1:5000/api/checkproduct/${localStorage.getItem("User")}`,
      {
        product_name: data.product_name,
        product_quantity: data.product_quantity,
      }
    );
    if (checkResponse.data === "Product exists") {
      if (data.product_images !== productDetails.product_images) {
        await listAll(
        ref(
          storage,
          `project/${localStorage.getItem("User")}/${
            productDetails.product_name
          }${productDetails.product_quantity}`
        )
      ).then((imgs) => {
        imgs.items.forEach(async (val) => {
          deleteObject(
            ref(
              storage,
              `project/${localStorage.getItem("User")}/${
                productDetails.product_name
              }${productDetails.product_quantity}/${temp}`
            )
          );
          temp = temp + 1;
        });
      });
      for (let i = 0; i < productDetails.product_images.length; i++) {
        const imgRef = ref(
          storage,
          `project/${localStorage.getItem("User")}/${
            productDetails.product_name
          }${productDetails.product_quantity}/${i}`
        );
        await uploadBytes(imgRef, productDetails.product_images[i]);
      }
      setProductDetails((prev) => ({ ...prev, product_images: [] }));
      await listAll(
        ref(
          storage,
          `project/${localStorage.getItem("User")}/${
            productDetails.product_name
          }${productDetails.product_quantity}`
        )
      ).then((imgs) => {
        imgs.items.forEach((val) => {
          const url = getDownloadURL(val);
          urls.push(url);
        });
      });
      Promise.all(urls).then(async (value) => {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/product/${localStorage.getItem("User")}/${
            data._id
          }`,
          {
            product_name: productDetails.product_name,
            product_description: productDetails.product_description,
            product_quantity: productDetails.product_quantity,
            product_images: value,
            product_price: productDetails.product_price,
            product_category: productDetails.product_category,
            product_stock: productDetails.product_stock,
          }
        );
        if (response.data === "Success") {
          urls = [];
          setLoading(false);
          setProductDetails({
            product_name: "",
            product_category: "Whole Spices",
            product_description: "",
            product_quantity: "",
            product_images: [],
            product_price: "",
          });
          navigation("/admin-products");
        } else {
          setLoading(false);
          alert("Something went wrong");
        }
      });
      } else {
        const response = await axios.post(
          `http://127.0.0.1:5000/api/product/${localStorage.getItem("User")}/${
            data._id
          }`,
          {
            product_name: productDetails.product_name,
            product_description: productDetails.product_description,
            product_quantity: productDetails.product_quantity,
            product_images: data.product_images,
            product_price: productDetails.product_price,
            product_category: productDetails.product_category,
            product_stock: productDetails.product_stock,
          }
        );
        if (response.data === "Success") {
          urls = [];
          setLoading(false);
          setProductDetails({
            product_name: "",
            product_category: "Whole Spices",
            product_description: "",
            product_quantity: "",
            product_images: [],
            product_price: "",
          });
          navigation("/admin-products");
        } else {
          setLoading(false);
          alert("Something went wrong");
        }
      }
      
    } else {
      setLoading(false);
      alert("Product does not exist");
      return;
    }
  };

  return (
    <div className="flex w-full justify-center ">
      <form
        action=""
        className="bg-[#f7f7f7] w-[80%] box-border px-[7%] my-[6dvh] rounded-xl flex flex-col items-center py-[3dvh] space-y-[3dvh] backdrop-blur-[10px]"
      >
        <div className="title text-3xl font-semibold">
          Enter your product details
        </div>
        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className="font-medium">
            Product Name
          </label>
          <div>
            <input
              type="text"
              className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
              value={productDetails.product_name}
              placeholder="Enter the name of the product"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  product_name: e.target.value.slice(0, 30),
                }))
              }
            />
            {productDetails.product_name.length < 5 && (
              <p className="text-red-600 underline text-sm italic mt-1">
                Product Name should contain atleast 5 characters
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full max-md:flex-col items-center justify-evenly max-md:space-y-[2.5dvh] md:space-x-[5%]">
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Product Quantity(in g)
            </label>
            <div>
              <input
                type="number"
                className="w-full border rounded-md py-[0.5dvh] px-[2%] max-md:px-[5%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
                placeholder="Enter the number of quantity of product in g(grams)"
                value={Number(productDetails.product_quantity).toString()}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    product_quantity: e.target.value.slice(0, 5),
                  }))
                }
              />
              {Number(productDetails.product_quantity) < 20 && (
                <p className="text-red-600 underline text-sm italic mt-1">
                  You should atleast give 20 grams
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Category
            </label>
            <select
              className="w-full border rounded-md py-[0.7dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.5)] transition-all"
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  product_category: categories[e.target.options.selectedIndex],
                }))
              }
              defaultValue={categories[0]}
            >
              {/* <option value="" disabled defaultValue={true}>
                Choose your category
              </option> */}
              {categories.map((item, index) => (
                <option key={index} value={productDetails.product_category}>
                  {item}
                </option>
              ))}
            </select>
            {productDetails.product_category.length < 1 && (
              <p className="text-red-600 underline text-sm italic mt-1">
                Please select a category
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className=" font-medium">
            Description
          </label>
          <div>
            <textarea
              rows={5}
              className="w-full border rounded-md py-[0.5dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all resize-none"
              placeholder="Enter the product description"
              value={productDetails.product_description}
              onChange={(e) =>
                setProductDetails((prev) => ({
                  ...prev,
                  product_description: e.target.value.slice(0, 400),
                }))
              }
            />
            {productDetails.product_description.length < 20 && (
              <p className="text-red-600 underline text-sm italic mt-1">
                Product Description should contain atleast 20 characters
              </p>
            )}
          </div>
          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Product Stock
            </label>
            <div>
              <input
                type="number"
                className="w-full border rounded-md py-[0.5dvh] px-[2%] max-md:px-[5%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
                placeholder="Enter the number of products in stock"
                value={Number(productDetails.product_stock).toString()}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    product_stock: e.target.value.slice(0, 5),
                  }))
                }
              />
              {Number(productDetails.product_stock) < 5 && (
                <p className="text-red-600 underline text-sm italic mt-1">
                  You should atleast have 5 products in stock
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col w-full space-y-[1dvh]">
            <label htmlFor="" className=" font-medium">
              Product Price
            </label>
            <div>
              <input
                type="number"
                className="w-full border rounded-md py-[0.5dvh] px-[2%] max-md:px-[5%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
                placeholder="Enter the number of products in stock"
                value={Number(productDetails.product_price).toString()}
                onChange={(e) =>
                  setProductDetails((prev) => ({
                    ...prev,
                    product_price: e.target.value.slice(0, 5),
                  }))
                }
              />
              {/* {Number(productDetails.product_price) < 5 &&
                Number(productDetails.product_price) > 0 && (
                  <p className="text-red-600 underline text-sm italic mt-1">
                    You should atleast have 5 products in stock
                  </p>
                )} */}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full space-y-[1dvh]">
          <label htmlFor="" className=" font-medium">
            Images
          </label>
          <input
            type="file"
            className="w-full border rounded-md py-[1dvh] px-[1%] max-md:px-[4%] outline-none text-base focus:border-[#86fe86] focus:shadow-[0_0_0_0.25rem] focus:shadow-[rgba(0,255,0,0.4)] transition-all"
            multiple="multiple"
            accept="image/png, image/gif, image/jpeg"
            onChange={(e) =>
              setProductDetails((prev) => ({
                ...prev,
                product_images: e.target.files,
              }))
            }
          />
          {imagesNone && (
            <p className="text-red-600 underline text-sm italic mt-1">
              Select a few images to display your product
            </p>
          )}
        </div>
        <button
          className="w-full border-1 h-10 bg-green-500 rounded-lg hover:bg-green-700 shadow-lg"
          onClick={handleSeller}
        >
          <p className="font-bold text-white">Submit</p>
        </button>
      </form>
    </div>
  );
}
