import gheeb from "./../assets/gheeb.png";
import masala from "./../assets/garam-masala.png";
import chutney from "./../assets/vchutney.png";
import { Link, useParams } from "react-router-dom";

export default function SimilarProducts() {
  const params = useParams();
  console.log(params);
  return (
    <section className="flex flex-col gap-y-[2dvh] pb-[5dvh]" id="products">
      <div className="title text-[2.2rem] font-semibold hover:cursor-default text-center">
        Popular Products
      </div>

      <div className="pros grid grid-cols-5 gap-x-[0.5vw] px-[5%] items-center ">
        <Link
          to="/product"
          className="pro flex flex-col justify-evenly w-[85%] aspect-[5/6] bg-white px-[9%] rounded-xl shadow-xl"
        >
          <img src={masala} className="h-[35%] object-contain" alt="" />
          <div className="detail">
            <div className="nam hover:cursor-default text-2xl font-semibold">
              Garam Masala
            </div>
            <div className="quan">200G</div>
          </div>
          <div className="price text-3xl font-semibold">₹82</div>
        </Link>
        <Link
          to="/product"
          className="pro flex flex-col justify-evenly w-[85%] aspect-[5/6] bg-white px-[9%] rounded-xl shadow-xl"
        >
          <img src={masala} className="h-[35%] object-contain" alt="" />
          <div className="detail">
            <div className="nam hover:cursor-default text-2xl font-semibold">
              Garam Masala
            </div>
            <div className="quan">200G</div>
          </div>
          <div className="price text-3xl font-semibold">₹82</div>
        </Link>
        <Link
          to="/product"
          className="pro flex flex-col justify-evenly w-[85%] aspect-[5/6] bg-white px-[9%] rounded-xl shadow-xl"
        >
          <img src={masala} className="h-[35%] object-contain" alt="" />
          <div className="detail">
            <div className="nam hover:cursor-default text-2xl font-semibold">
              Garam Masala
            </div>
            <div className="quan">200G</div>
          </div>
          <div className="price text-3xl font-semibold">₹82</div>
        </Link>

        <Link
          to="/product"
          className="pro flex flex-col justify-evenly w-[85%] aspect-[5/6] bg-white px-[9%] rounded-xl shadow-xl"
        >
          <img src={gheeb} className="h-[45%] object-contain" alt="" />
          <div className="detail">
            <div className="nam text-2xl hover:cursor-default font-semibold">
              Ghee
            </div>
            <div className="quan">1L</div>
          </div>
          <div className="price text-3xl font-semibold">₹500</div>
        </Link>

        <Link
          to="/product"
          className="pro flex flex-col justify-evenly w-[85%] aspect-[5/6] bg-white px-[9%] rounded-xl shadow-xl"
        >
          <img src={chutney} className="h-[45%] object-contain" alt="" />
          <div className="detail">
            <div className="nam text-2xl hover:cursor-default font-semibold">
              Dry Chutney
            </div>
            <div className="quan">100G</div>
          </div>
          <div className="price text-3xl font-semibold">₹40</div>
        </Link>
      </div>
    </section>
  );
}
