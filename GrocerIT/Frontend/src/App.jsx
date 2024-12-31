import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import Seller from "./pages/Seller";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import CategoriesPage from "./pages/CategoriesPage";
import { useEffect, useRef, useState } from "react";
import { auth } from "./firebase config/firebase.config";
import robot from "./assets/robot.png";
import AdminPage from "./pages/AdminPage";
import CreateProduct from "./pages/CreateProduct";
import ContactUs from "./pages/ContactUs";
import AdminProducts from "./pages/AdminProducts";
import SuperAdmin from "./pages/SuperAdmin";
import Refresh from "./pages/Refresh";
import EditProduct from "./pages/EditProduct";
import Checkout from "./pages/Checkout";
import ReactLoading from "react-loading";
import axios from "axios";

function containsOnlyDigits(str) {
  return /^\d+$/.test(str);
}

function App() {
  const listRef = useRef(null);
  const [chatbot, setChatbot] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [hideChatbot, setHideChatbot] = useState(true);
  const user = localStorage.getItem("User");
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatBot = async (event, type, buttonName) => {
    if (type === "chat") {
      if (event.key == "Enter") {
        setChatLoading(true);
        if (chatbot.length > 0) {
          if (chatbot.slice(-1)[0].prompt === "Add") {
            const getProducts = await axios.get(
              `http://127.0.0.1:5000/api/search/${user}/${prompt}`
            );
            if (getProducts.data.length === 0) {
              setChatbot([
                ...chatbot,
                {
                  data: "Didn't find the product you were looking for!",
                  prompt: prompt,
                  button: [],
                  process: true,
                },
              ]);
              setPrompt("");
              setChatLoading(false);
              return;
            }
            setChatbot([
              ...chatbot,
              {
                data: "Here are your picks",
                prompt: prompt,
                button: getProducts.data,
              },
            ]);
            setPrompt("");
            setChatLoading(false);
            return;
          }
          if (chatbot.slice(-1)[0].prompt === "Check") {
            setChatLoading(false);
            console.log("second");
            return;
          }
          if (
            chatbot.slice(-1)[0].data ===
            "Enter the number of quantity you want to add?"
          ) {
            const product = chatbot.slice(-1)[0].prompt;
            const quanitiy = Number(prompt);
            if (quanitiy) {
              if (product.product_stock < quanitiy) {
                setChatbot([
                  ...chatbot,
                  {
                    data: `There are only ${product.product_stock} items in stock click on the add to cart again`,
                    prompt: prompt,
                    button: [],
                    process: true,
                  },
                ]);
                setChatLoading(false);
                return setPrompt("");
              }
              await axios.post(
                `http://127.0.0.1:5000/api/add_cart/${user}/${product._id}`,
                {
                  type: "inc",
                  number: quanitiy,
                }
              );
              setChatbot([
                ...chatbot,
                {
                  data: `${quanitiy} ${product.product_name} added to cart successfully!`,
                  prompt: prompt,
                  button: [],
                  process: true,
                },
              ]);
              setChatLoading(false);
              setPrompt("");
            } else {
              setChatbot([
                ...chatbot,
                {
                  data: "You have entered an invalid quantity click on the add to cart again",
                  prompt: prompt,
                  button: [],
                  process: true,
                },
              ]);
              setPrompt("");
              setChatLoading(false);
            }
            return;
          }
          setChatLoading(false);
        }
        const response = await axios.post(`http://127.0.0.1:8080/get_chatbot`, {
          question: prompt,
        });
        if (response.data === "") {
          setChatbot([
            ...chatbot,
            {
              data: "Sorry! but I don't have the answer for the above question",
              prompt: prompt,
              button: [],
              process: true,
            },
          ]);
        } else {
          setChatbot([
            ...chatbot,
            { data: response.data, prompt: prompt, button: [], process: true },
          ]);
        }
        // setChatbot([
        //   ...chatbot,
        //   { data: "Hello World", prompt: prompt, button: [], process: true },
        // ]);
        setPrompt("");
        setChatLoading(false);
      }
    } else {
      setChatLoading(true);
      if (buttonName === "Add") {
        setChatbot([
          ...chatbot,
          {
            prompt: "Add",
            data: "Enter the product name that you want to add",
            button: [],
          },
        ]);
      } else {
        if (buttonName === "Check") {
          setChatbot([
            ...chatbot,
            {
              prompt: "Check",
              data: "Your cart is empty try adding some items",
              button: [],
            },
          ]);
        }
      }
      setChatLoading(false);
    }
  };

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [chatbot]);

  const handleProduct = (product) => {
    setChatbot([
      ...chatbot,
      {
        data: "Enter the number of quantity you want to add?",
        prompt: product,
        button: [],
      },
    ]);
  };

  const handleChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleBotClick = () => {
    setHideChatbot((prev) => !prev);
  };
  return (
    <div>
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="refresh" element={<Refresh />} />
        <Route path="edit-product" element={<EditProduct />} />
        <Route path="products/:category" element={<ProductsPage />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="seller" element={<Seller />} />
        <Route path="create-product" element={<CreateProduct />} />
        <Route path="cart" element={<Cart />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="query" element={<ContactUs />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="admin-products" element={<AdminProducts />} />
        <Route path="super-admin" element={<SuperAdmin />} />
        <Route path="categories" element={<CategoriesPage />} />
      </Routes>
      {!hideChatbot && (
        <div className="bg-white border-4 w-[20%] h-[60dvh] rounded-md p-1 fixed z-30 bottom-[5dvh] right-[3%] flex-col items-end">
          <div
            ref={listRef}
            className="w-[100%] h-[85.5%] bg-white border-2 mb-3 overflow-y-scroll no-scrollbar flex-row"
          >
            <div className="h-auto w-[60%] m-1 rounded-md border-2 p-1 flex items-center">
              <p className="text-gray-500 text-sm">
                Welcome to SpiceBot! How may I help you?
              </p>
            </div>
            <div className="h-auto w-[60%] m-1 rounded-md flex-col p-1 flex">
              <button
                className="border-2 border-green-500 rounded-full text-sm text-gray-500 hover:bg-green-400 bg-green-200"
                onClick={(event) => handleChatBot(event, "button", "Add")}
              >
                Add to cart
              </button>
              {/* <button
                className="border-2 border-green-500 rounded-full mt-2 text-sm hover:bg-green-400 text-gray-500 bg-green-200"
                onClick={(event) => handleChatBot(event, "button", "Check")}
              >
                Proceed to checkout
              </button> */}
            </div>

            {chatbot.map((item, index) => (
              <div key={index}>
                <div className="h-auto w-[60%] mt-2 ml-28 rounded-md border-2 p-1 flex items-center">
                  <p className="text-gray-500 text-sm">
                    {item.prompt.product_name
                      ? item.prompt.product_name
                      : item.prompt}
                  </p>
                </div>
                <div className="h-auto w-[60%] m-1 rounded-md border-2 p-1 flex items-center">
                  <p className="text-gray-500 text-sm">{item.data}</p>
                </div>
                {item.process && (
                  <div className="h-auto w-[60%] m-1 rounded-md flex-col p-1 flex">
                    <button
                      className="border-2 border-green-500 rounded-full text-sm text-gray-500 hover:bg-green-400 bg-green-200"
                      onClick={(event) => handleChatBot(event, "button", "Add")}
                    >
                      Add to cart
                    </button>
                  </div>
                )}
                <div className="h-auto w-[60%] m-1 rounded-md flex-col p-1 flex">
                  {index === chatbot.length - 1 &&
                    item.button.map((prod, pindex) => (
                      <button
                        key={pindex}
                        className="border-2 mt-2 border-green-500 rounded-full text-sm text-gray-500 hover:bg-green-400 bg-green-200"
                        onClick={() => handleProduct(prod)}
                      >
                        {prod.product_name}
                      </button>
                    ))}
                </div>
              </div>
            ))}

            {chatLoading && (
              <div className="h-6 m-1 w-[15%] rounded-full border-2">
                <ReactLoading
                  type="bubbles"
                  color="gray"
                  height={25}
                  width={30}
                  className="ml-2"
                />
              </div>
            )}
          </div>
          <input
            onKeyDown={(event) => handleChatBot(event, "chat")}
            type="text"
            onChange={(event) => handleChange(event)}
            value={prompt}
            placeholder="Search"
            className="h-10 w-[80%] p-2 border-b-2 border-l-2 drop-shadow-xl rounded-md"
          />
        </div>
      )}
      <button
        className="bg-white border-4 border-[color:rgba(255,255,255,0.55)] p-1 rounded-full fixed z-40 bottom-[5dvh] right-[3%]"
        onClick={handleBotClick}
      >
        <img src={robot} alt="robot" className="h-12 " />
      </button>
    </div>
  );
}

export default App;
