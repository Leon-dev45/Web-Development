import gheeb from "./../assets/gheeb.png";
import masala from "./../assets/garam-masala.png";
import chutney from "./../assets/vchutney.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Popular() {
  const [allProducts, setAllProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/get-all-products`
      );
      setAllProducts(response.data.slice(0, 4));
    };
    fetchProducts();
  }, []);

  return (
    <section className="flex flex-col gap-y-[2dvh] pb-[20dvh]" id="products">
      <div className="flex font-semibold hover:cursor-default w-full px-10">
        <div className="h-full w-[60%] flex justify-end">
          <p className="font-semibold title text-[2.2rem]">Popular</p>
        </div>
        <div className="w-[40%] flex h-12 justify-end items-end">
          <Link
            to="/products/all"
            className="text-[1.0rem] text-green-700 underline mr-24"
          >
            View more
          </Link>
        </div>
      </div>

      <div className="pros grid grid-cols-4 gap-x-[0.5vw] gap-y-[8dvh] px-[10%] items-center ">
        {allProducts.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate("/product", { state: { data: item } })}
            className="pro hover:cursor-pointer flex flex-col justify-evenly w-[90%] aspect-[12/16] bg-white px-[9%] rounded-xl shadow-xl"
          >
            <img
              src={item.product_images[0]}
              className="h-[45%] object-contain rounded-lg"
              alt=""
            />
            <div className="detail">
              <div className="nam hover:cursor-default text-2xl font-semibold">
                {item.product_name}
              </div>
              <div className="quan">{item.product_quantity}g</div>
            </div>
            <div className="price text-3xl font-semibold">
              ₹{item.product_price}
            </div>
            {/* <button className="py-[0.7dvh] text-white bg-blue-500 hover:bg-blue-900 border-[1/5vw] border-solid border-white rounded-2xl">
          Add to Cart
        </button> */}
          </div>
        ))}
      </div>
    </section>
  );
}
