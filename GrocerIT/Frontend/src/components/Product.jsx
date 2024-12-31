/* eslint-disable react/prop-types */
import { Carousel } from "react-responsive-carousel";
import img1 from "./../assets/Kurkure1.jpg";
import img2 from "./../assets/Kurkure2.jpg";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Stars from "./Stars";
import { useEffect, useState } from "react";
import Login from "./Login";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Product({
  setLoading,
  register,
  showRegister,
  productDetails,
}) {
  const [showQuantity, setShowQuantity] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [allReviews, setAllReciews] = useState({ rating: 0, count: 0 });
  const navigate = useNavigate();

  const user = localStorage.getItem("User");

  useEffect(() => {
    const fetchReviews = async () => {
      const reviews = await axios.get(
        `http://127.0.0.1:5000/api/comment_by_product/${user}/${productDetails._id}`
      );
      const totalReviews = reviews.data.reduce((prev, curr) => {
        return (prev + curr.rating) / reviews.data.length;
      }, 0);
      setAllReciews({ rating: totalReviews, count: reviews.data.length });
    };
    fetchReviews();
  }, []);

  const handleAuthCart = (type) => {
    if (user === null) {
      showRegister(true);
    } else if (type === "Cart") {
      setLoading(true);
      addToCart();
      alert("Product Added Successfully");
      setQuantity(1);
      setLoading(false);
    } else {
      navigate("/checkout", {
        state: [{ ...productDetails, cart_quantity: quantity }],
      });
    }
  };

  const addToCart = async () => {
    const response = await axios.post(
      `http://127.0.0.1:5000/api/add_cart/${user}/${productDetails._id}`,
      {
        type: "inc",
        number: quantity,
      }
    );
    return;
  };

  const cartDetail = (number) => {
    setQuantity(number);
    setShowQuantity(false);
  };

  const makeQuantity = () => {
    let qty = [];
    for (let i = 0; i < productDetails.product_stock; i++) {
      if (i + 1 === quantity) {
        continue;
      } else {
        qty.push(i + 1);
      }
    }
    return qty;
  };
  return (
    <div className="flex flex-col">
      {register && <Login showRegister={showRegister} register={register} />}
      <div className="main h-[89dvh] w-full bg-white flex overflow-hidden">
        <div className="img w-1/2 h-full flex justify-center items-center">
          <div className="carousel w-[65%]">
            <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              dynamicHeight={true}
              width={400}
              infiniteLoop={true}
              interval={3000}
            >
              {productDetails.product_images.map((item, index) => (
                <div key={index}>
                  <img src={item} alt="product" />
                </div>
              ))}
            </Carousel>
          </div>
        </div>
        <div className="description flex flex-col w-[40%] h-full box-border py-[1%] ">
          <div className="flex flex-col justify-around w-full h-[40%]">
            <div className="title text-3xl">{productDetails.product_name}</div>
            <Link
              to={`/products/${productDetails.product_category}`}
              className="brand text-[#007185] hover:text-orange-600 hover:underline"
            >
              Category: {productDetails.product_category}
            </Link>
            <Stars
              stars={Math.ceil(allReviews.rating)}
              reviews={allReviews.count}
              size="1.7rem"
            />
            <hr />
            <div className="price flex items-center">
              <span className="currency text-gray-600">₹</span>{" "}
              <span className="rupees text-3xl">
                {productDetails.product_price}
              </span>{" "}
            </div>
            <div className="tax">Inclusive of Taxes</div>
            <hr />
          </div>
          <div className="2 w-4/5">
            <div className="details grid grid-cols-2 ">
              <div className="font-bold"> Category </div>
              <div>{productDetails.product_category}</div>
              <div className="font-bold"> Item Weight</div>
              <div> {productDetails.product_quantity} Grams</div>
              <div className="font-bold"> Product Owner </div>
              <div>{productDetails.product_owner}</div>
            </div>

            <div className="h-auto w-full flex flex-col justify-between items-center mt-5 gap-2">
              <div className="w-full">
                <button
                  className="border-2 border-gray-600 rounded-md bg-gray-300 px-1 shadow-md"
                  onClick={() => setShowQuantity(!showQuantity)}
                >
                  QTY: {quantity}
                </button>
                {showQuantity && (
                  <div className="border-2 border-black w-10 h-32 overflow-scroll no-scrollbar absolute h-30 bg-white flex flex-col items-centerrounded-sm">
                    {makeQuantity().map((data, index) => (
                      <p
                        className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer"
                        key={index}
                        onClick={() => cartDetail(data)}
                      >
                        {data}
                      </p>
                    ))}
                    {/* {() => {
                      for (let i = 0; i < productDetails.product_stock; i++) {
                        return (
                          <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                            {i + 1}
                          </p>
                        );
                      }
                    }} */}
                    {/* <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                      1
                    </p>
                    <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                      1
                    </p>
                    <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                      1
                    </p>
                    <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                      1
                    </p>
                    <p className="w-full h-auto text-center hover:bg-gray-200 cursor-pointer">
                      1
                    </p> */}
                  </div>
                )}
              </div>
              <button
                className="border-2 border-black w-full h-[5dvh] shadow-lg rounded-md bg-[#29e34e] hover:bg-[#11ba2d] text-white font-bold"
                onClick={() => handleAuthCart("Cart")}
              >
                Add to cart
              </button>
              <button
                className="border-2 border-black w-full h-[5dvh] shadow-lg rounded-md bg-[#f21b1b] hover:bg-[#c71227] text-white font-bold"
                onClick={() => handleAuthCart("Buy")}
              >
                Buy this product
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="extra">
        <div className="moreDetails pl-[3%] py-[2dvh]">
          <div className="text-3xl flex px-5">More about this Product</div>
          <ul className="list-disc  text-lg px-10">
            <li>{productDetails.product_description}</li>
            {/* <li>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
              doloremque dolorum nesciunt quas in, deserunt odit ex aspernatur
              voluptatem vitae quam labore, reprehenderit fuga iste quo eligendi
              facilis sunt est?
            </li>
            <li>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam,
              praesentium!
            </li>
            <li>Lorem ipsum dolor sit amet.</li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
