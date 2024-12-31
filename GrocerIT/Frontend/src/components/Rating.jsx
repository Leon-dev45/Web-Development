import React, { useEffect } from "react";
import { Rating } from "@mui/material";
import robot from "../assets/robot.png";
import { useState } from "react";
import axios from "axios";
import User from "../assets/user2.jpg";

function RatingStars({ product }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  // const [error, setError] = useState("");
  // const navigate = useNavigate();
  const [allComments, setAllComments] = useState([]);
  const user = localStorage.getItem("User");
  //   console.log(user, product);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/comment_by_product/${user}/${product}`
      );
      setAllComments(response.data);
    };
    fetchComments();
  }, []);

  const writeComment = (e) => {
    setComment(e.target.value);
  };

  const addComment = async () => {
    if (comment.length < 10) {
      return alert("Comment should contain atleast 10 characters");
    }
    if (rating < 0.5) {
      return alert("Pick a rating for the product");
    }
    const response = await axios.post(
      `http://127.0.0.1:5000/api/comment/${String(user)}/${String(product)}`,
      {
        comment: comment,
        rating: rating,
      }
    );
    if (response.data === "Success") {
      const exists = allComments.filter((item) => item.user_auth === user);
      if (exists.length > 0) {
        const updateComments = exists.filter((item) => item.user_auth !== user);
        updateComments.unshift({
          user_auth: user,
          comment: comment,
          rating: rating,
        });
        setAllComments(updateComments);
      } else
        setAllComments((prev) => [
          { user_auth: user, comment: comment, rating: rating },
          ...prev,
        ]);
    } else {
      alert(response.data);
    }
    setRating(0);
    setComment("");
    return;
  };

  return (
    <div className="border-2 h-auto gap-4 w-full flex items-center flex-col">
      <div className="w-[80%] border-2 rounded-lg shadow-lg mt-5 justify-center items-center flex p-2 flex-col gap-5">
        <Rating
          name="simple-controlled"
          value={rating}
          precision={0.5}
          onChange={(_, newRating) => {
            setRating(newRating);
          }}
          size="large"
        />
        <div className="w-[80%] gap-3 flex">
          <input
            className="w-[80%] h-10 p-2 rounded-md border-2"
            placeholder="Leave a comment here"
            value={comment}
            onChange={writeComment}
          />
          <button
            className="w-[15%] border-2 rounded-md border-green-500 hover:bg-green-500 hover:shadow-md font-semibold"
            onClick={addComment}
          >
            Comment
          </button>
        </div>
      </div>
      <div className="w-[80%] border-2 h-auto rounded-md p-5 mb-5 flex flex-col gap-3 items-center justify-center">
        {allComments.map((item, index) => (
          <div
            key={index}
            className="w-[80%] border-2 flex flex-row p-3 rounded-lg gap-10 shadow-md"
          >
            <img src={User} alt="robot" className="w-14 h-14 rounded-full" />
            <div>
              <p className="text-xl text-gray-500">{item.comment}</p>
              <p className="font-bold text-gray-500">
                Rating: <span className="font-normal">{item.rating}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RatingStars;
