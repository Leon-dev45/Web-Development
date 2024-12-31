import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import styled from "styled-components";
export default function Stars({ stars, reviews, size }) {
  const Wrapper = styled.section`
    .icon-style {
      display: flex;
      gap: 1%;
      align-items: center;
      justify-content: flex-start;
    }
    .icon {
      font-size: ${size};
      color: orange;
    }
    p {
      margin: 0;
      padding-left: 1%;
    }
  `;
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;

    return (
      <span key={index}>
        {stars >= index + 1 ? (
          <FaStar className="icon" />
        ) : stars >= number ? (
          <FaStarHalfAlt className="icon " />
        ) : (
          <AiOutlineStar className=" icon" />
        )}
      </span>
    );
  });
  return (
    <Wrapper>
      <div className="icon-style">
        {ratingStar}
        {reviews >= 0 && <p className="font-medium">{reviews} Reviews.</p>}
      </div>
    </Wrapper>
  );
}
