import { useState } from "react";
import User from "../assets/user2.jpg";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Panel() {
  const [allReviews, setAllReviews] = useState([]);
  const user = localStorage.getItem("User");
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/comment_by_user/${user}`
      );
      const orders = await axios.get(
        `http://127.0.0.1:5000/api/orders/${user}`
      );
      setAllOrders(orders.data);
      setAllReviews(response.data);
    };
    fetchReviews();
  }, []);

  const handleDelivery = async (data) => {
    const response = await axios.put(
      `http://127.0.0.1:5000/api/dashboard/${user}`,
      data
    );
    if (response.data === "Success") {
      navigate("/refresh");
    }
  };

  return (
    <div
      className={`flex items-center flex-col space-y-[1dvh] text-white h-[90dvh] w-[35%] bg-white shadow-green-800  justify-center shadow-md`}
    >
      <div className="h-[45%] w-[88%] shadow-lg shadow-green-500 rounded-xl overflow-y-scroll items-center flex flex-col gap-y-4 no-scrollbar p-2">
        <p className="text-black font-bold">Reviews</p>
        {allReviews.map((item, index) => (
          <div
            key={index}
            className="w-[90%] h-auto shadow-md shadow-green-500 flex p-2.5 gap-5 items-center rounded-md"
          >
            <img src={User} alt="user" className="w-10 h-10 rounded-full" />
            <div className="w-full">
              <div className="flex w-full justify-between">
                <p className="text-gray-700 text-sm">
                  {item.comment.length > 25
                    ? `${item.comment.slice(0, 25)}...`
                    : item.comment}
                </p>
                <p className="text-gray-500 text-[12px]">
                  Commented by:{" "}
                  {item.commentedBy.length > 10
                    ? `${item.commentedBy.slice(0, 10)}...`
                    : item.commentedBy}
                </p>
              </div>

              <p className="text-gray-600 text-sm">Rating: {item.rating}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-[45%] w-[88%] shadow-lg shadow-green-500 rounded-xl overflow-y-scroll items-center flex flex-col gap-y-4 no-scrollbar">
        <p className="text-black font-bold mt-4">Pending Orders</p>

        {allOrders.map((item, index) => (
          <div
            key={index}
            className={`w-[90%] h-auto shadow-md shadow-green-500 flex flex-col p-2.5 rounded-md ${
              index === allOrders.length - 1 && "mb-5"
            }`}
          >
            <div className="flex justify-between">
              <p className="text-gray-700 text-sm">{item.delivery_address}</p>
              <p className="text-gray-500 text-xs">
                Deliver To: {item.delivered_to}
              </p>
            </div>
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500 text-xs">
                  Product Name: {item.product}
                </p>
                <p className="text-gray-500 text-xs">
                  Quantity: {item.quantity}
                </p>
              </div>
              <button
                className="text-black border-2 font-bold border-green-500 hover:bg-green-500 p-1 rounded-md"
                onClick={() => handleDelivery(item)}
              >
                Delivered
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
