/* eslint-disable react/prop-types */
import axios from "axios";
import { deleteObject, listAll, ref } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { storage } from "../firebase config/firebase.config";

export default function AdminProCard({ data, setLoading }) {
  const navigate = useNavigate();
  const deleteProduct = async () => {
    setLoading(true);
    let temp = 0;
    await axios.delete(
      `http://127.0.0.1:5000/api/product/${localStorage.getItem("User")}/${
        data._id
      }`
    );
    await listAll(
      ref(
        storage,
        `project/${localStorage.getItem("User")}/${data._doc.product_name}${
          data._doc.product_quantity
        }`
      )
    ).then((imgs) => {
      imgs.items.forEach(async () => {
        deleteObject(
          ref(
            storage,
            `project/${localStorage.getItem("User")}/${data._doc.product_name}${
              data._doc.product_quantity
            }/${temp}`
          )
        );
        temp = temp + 1;
      });
    });
    setLoading(false);
    navigate("/refresh");
  };
  const editProduct = () => {
    navigate("/edit-product", { state: data });
  };

  return (
    <div
      //   to="product"
      className="shadow-xl mx-auto my-[2dvh] w-8/12 aspect-[5/1] grid grid-cols-[1fr_2fr_1fr] overflow-hidden rounded-[3.5dvh] box-border bg-white"
    >
      <div
        className="h-full items-center justify-center flex box-border flex-1 [&:hover>img]:scale-[1.2]
            rounded-[1.8dvh] w-[80%] [&:hover>img]:contrast-[0.8] [&:hover>img]:filter overflow-hidden"
      >
        <img
          src={data._doc.product_images[0]}
          alt="adminimages"
          className="object-contain rounded-[1.8dvh] h-[80%] transition-all duration-500 cursor-pointer"
        />
      </div>
      <Link
        to="/product"
        className="bg-white box-border flex flex-col items-start justify-start p-14"
      >
        <div className="name text-2xl font-semibold">
          {data._doc.product_name}
        </div>
        <div className="description text-lg  text-[#4F4F4F]">
          {data._doc.product_description}
        </div>
      </Link>

      <div className="buttons items-center flex flex-col h-full justify-start mt-16 gap-5">
        <button
          className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-green-500 hover:bg-green-500 transition duration-300 box-border hover:shadow-[0_4px_11px_1px_#2fb336]"
          onClick={editProduct}
        >
          EDIT PRODUCT
        </button>
        <button
          className="bg-white font-semibold w-[90%] py-[1.5%] text-sm rounded-[0.8dvh] border-2  border-solid border-red-700 hover:bg-red-700 transition duration-300 box-border hover:shadow-[0_2px_7px_0px_#386bc0]"
          onClick={deleteProduct}
        >
          DELETE PRODUCT
        </button>
      </div>
    </div>
  );
}
