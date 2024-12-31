/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable react/prop-types */
// import { useState } from "react";
// import { Back, Mail, Logo, Sign, Check } from "../assets";
import Check from "../assets/check.png";
import Mail from "../assets/email.png";
import Sign from "../assets/signbg.png";
import Logo from "../assets/glogo.svg";
import { useState } from "react";
import { auth, provider } from "../firebase config/firebase.config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import axios from "axios";
// import Back from "../assets/back.svg";

const Login = (props) => {
  const [login, showLogin] = useState(false);
  const [register, showRegister] = useState(true);
  const [emailLogin, setEmailLogin] = useState(false);
  const [registerErrors, setRegisterErrors] = useState({
    username: "",
    password: "",
    email: "",
    c_password: "",
  });
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    c_password: "",
  });
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handleLogin = () => {
    showLogin(true);
    showRegister(false);
  };

  const googleData = async (result) => {
    localStorage.setItem("User", result.user.uid);
    const data = await axios.get(
      `http://127.0.0.1:5000/api/auth/user/${result.user.uid}`
    );
    if (data.data.data !== null) {
      return;
    }
    await axios.post("http://127.0.0.1:5000/api/auth/user", {
      username: result.user.displayName,
      email: result.user.email,
      auth: result.user.uid,
    });
    return;
  };

  const handleRegister = () => {
    showLogin(false);
    showRegister(true);
  };

  const handleEmailLogin = () => {
    setEmailLogin(true);
    showLogin(false);
    showRegister(false);
  };

  const handleLoginChange = (type, event) => {
    if (type === "username") {
      setLoginData((prev) => ({ ...prev, email: event.target.value }));
    } else {
      setLoginData((prev) => ({ ...prev, password: event.target.value }));
    }
  };

  const loginingData = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      ).then((result) => localStorage.setItem("User", result.user.uid));
    } catch (error) {
      return setLoginErrors((prev) => ({
        ...prev,
        password: "Invalid email or password",
      }));
    }
    setLoginErrors({ email: "", password: "" });
    localStorage.setItem("User", auth.currentUser.uid);
    props.showRegister(false);
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const handleRegisterChange = (type, event) => {
    if (type === "username") {
      setRegisterData((prev) => ({ ...prev, username: event.target.value }));
    } else if (type === "email") {
      setRegisterData((prev) => ({ ...prev, email: event.target.value }));
    } else if (type === "password") {
      setRegisterData((prev) => ({ ...prev, password: event.target.value }));
    } else if (type === "c_password") {
      setRegisterData((prev) => ({ ...prev, c_password: event.target.value }));
    }
  };

  const handleGoogleClick = async () => {
    try {
      console.log("first");
      localStorage.setItem("User", auth.currentUser.uid);
    } catch (error) {
      console.log("second");
      const user = await signInWithPopup(auth, provider).then(
        async (result) => {
          googleData(result);
        }
      );
    }
    props.showRegister(false);
  };

  const registeringData = async (e) => {
    e.preventDefault();
    if (!validateEmail(registerData.email)) {
      return setRegisterErrors((prev) => ({ ...prev, email: "Invalid Email" }));
    } else {
      setRegisterErrors((prev) => ({ ...prev, email: "" }));
    }
    if (registerData.username.length < 4) {
      return setRegisterErrors((prev) => ({
        ...prev,
        username: "Username should contain atleast 4 characters",
      }));
    } else {
      setRegisterErrors((prev) => ({
        ...prev,
        username: "",
      }));
    }
    if (registerData.password.length < 8) {
      return setRegisterErrors((prev) => ({
        ...prev,
        password: "Password should contain atleast 8 characters",
      }));
    } else {
      setRegisterErrors((prev) => ({
        ...prev,
        password: "",
      }));
    }
    if (registerData.password === registerData.c_password) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          registerData.email,
          registerData.password
        ).then((result) => {
          auth.currentUser.displayName = registerData.username;
          googleData(result);
        });
      } catch (error) {
        return setRegisterErrors((prev) => ({
          ...prev,
          email: "Email already exists",
        }));
      }
    }
    if (registerData.password !== registerData.c_password) {
      return setRegisterErrors((prev) => ({
        ...prev,
        password: "Passwords do not match",
        c_password: "Passwords do not match",
      }));
    } else {
      setRegisterErrors((prev) => ({
        ...prev,
        password: "",
        c_password: "",
      }));
    }
    setRegisterErrors((prev) => ({
      ...prev,
      email: "Email already exists",
    }));

    localStorage.setItem("User", auth.currentUser.uid);
    props.showRegister(false);
  };

  return (
    <>
      <div
        id="bgblur"
        className="bg-[rgba(0,0,0,0.4)] h-[100dvh] w-full z-[9] fixed top-0"
        onClick={() => props.showRegister(false)}
      ></div>

      <div
        id="signup"
        className="flex overflow-hidden rounded-lg w-[65%] h-[90dvh] my-[5dvh] mx-[17.5%] z-[20] fixed top-0"
      >
        <div
          className="w-1/2 flex"
          style={{
            background: "center/cover",
            backgroundImage: `url(${Sign})`,
          }}
        >
          <div className="flex text-white flex-col h-[35%] justify-around ml-[8%] mt-[10%] w-[70%]">
            <div className="text-3xl font-semibold">Sucess starts here</div>
            <div className="flex items-baseline text-lg font-medium">
              <img src={Check} alt="" className="h-[2dvh] mr-[10px]" />
              Over 600 Categories
            </div>
            <div className="flex items-baseline text-lg font-medium">
              <img src={Check} alt="" className="h-[2dvh] mr-[10px]" />
              Pay per project, not per hour
            </div>
            <div className="flex items-baseline text-lg font-medium">
              <img src={Check} alt="" className="h-[2dvh] mr-[10px] " />
              Access to talent and businesses across the globe
            </div>
          </div>
        </div>
        <div className="w-1/2 bg-white h-full">
          {register ? (
            <div
              className={`flex-col box-border px-[4%] space-y-[15%]`}
              id="join1"
            >
              <div
                className="text-2xl font-semibold mt-[16%] text-center"
                id="lg1"
              >
                Create a new account
              </div>
              <div className="flex flex-col space-y-[8%]">
                <button
                  onClick={handleGoogleClick}
                  className="flex items-center border border-solid py-[1.6dvh] rounded-md  hover:bg-gray-50"
                >
                  <img src={Logo} alt="" className="h-[3dvh] pl-[7%] " />
                  <div className="text-lg font-semibold -ml-[10%] text-center w-full">
                    Continue with Google
                  </div>
                </button>
                <button
                  className="flex items-center border border-solid py-[1.6dvh] rounded-md  hover:bg-gray-50"
                  onClick={handleEmailLogin}
                >
                  <img src={Mail} alt="" className="h-[3dvh] pl-[7%] " />
                  <div
                    className="text-lg font-semibold -ml-[10%] text-center w-full"
                    id="lg2"
                  >
                    Continue with Email
                  </div>
                </button>
              </div>
              <div className="text-base font-medium text-gray-600 text-center px-[5%] ">
                {" "}
                <span id="lg3"> Already have an account? </span>
                <button
                  className="text-black underline "
                  onClick={handleLogin}
                  id="lg4"
                >
                  Log In
                </button>
              </div>
            </div>
          ) : login ? (
            <div
              className={`flex-col w-full px-[9%] py-[3dvh] bg-white h-full`}
              id="join2"
            >
              <div className="text-2xl font-semibold my-[3dvh]" id="lb1">
                Continue with your Email
              </div>
              <form action="" className="flex flex-col">
                <label
                  htmlFor="spswrd"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                >
                  Email
                </label>
                <div className="mb-[3dvh]">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    onChange={(event) => handleLoginChange("username", event)}
                    className="outline-none text-base border-2 border-solid px-[1vw] py-[0.9dvh] rounded-md  w-full "
                  />
                  <p className="text-red-600 underline">{loginErrors.email}</p>
                </div>

                <label
                  htmlFor="spswrd"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                >
                  Password
                </label>
                <div className="mb-[3dvh]">
                  <input
                    type="password"
                    onChange={(event) => handleLoginChange("password", event)}
                    placeholder="Enter your password"
                    className="outline-none border-2 border-solid text-base px-[1vw] py-[0.9dvh] rounded-md  w-full "
                  />
                  <p className="text-red-600 italic underline">
                    {loginErrors.password}
                  </p>
                </div>

                <button
                  onClick={(event) => loginingData(event)}
                  className="text-lg rounded outline-none px-[1vw] py-[1dvh] mt-[1dvh] border-2 hover:bg-gray-400"
                >
                  <p>Submit</p>
                </button>
              </form>
              <div className="text-base font-medium text-gray-600 text-center px-[5%] ">
                {" "}
                <span id="lg3"> {"Does'nt have an account?"} </span>
                <button
                  className="text-black underline "
                  onClick={handleRegister}
                  id="lg4"
                >
                  Register
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`flex-col w-full px-[9%] py-[3dvh] bg-white h-full`}
              id="join2"
            >
              <div className="text-2xl font-semibold my-[3dvh]" id="lb1">
                Continue with your Email
              </div>
              <form action="" className="flex flex-col">
                <label
                  htmlFor="spswrd"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                >
                  Username
                </label>
                <div className="mb-[3dvh]">
                  <input
                    type="text"
                    placeholder="Enter your username"
                    onChange={(event) =>
                      handleRegisterChange("username", event)
                    }
                    className="border-2 border-solid outline-none text-base px-[1vw] py-[0.9dvh] rounded-md  w-full "
                  />
                  <p className="text-red-600 italic underline">
                    {registerErrors.username}
                  </p>
                </div>

                <label
                  htmlFor="semail"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                  id="lb2"
                >
                  Email
                </label>

                <div className="mb-[3dvh]">
                  <input
                    type="email"
                    className="border-2 border-solid outline-none text-base px-[1vw] py-[0.9dvh]  rounded-md placeholder-gray-400  w-full "
                    placeholder="Enter your email"
                    onChange={(event) => handleRegisterChange("email", event)}
                    autoComplete="email"
                  />
                  <p className="text-red-600 italic underline">
                    {registerErrors.email}
                  </p>
                </div>

                <label
                  htmlFor="spswrd"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                >
                  Password
                </label>
                <div className="mb-[3dvh]">
                  <input
                    type="password"
                    placeholder="Enter your password"
                    onChange={(event) =>
                      handleRegisterChange("password", event)
                    }
                    className="outline-none border-2 border-solid text-base px-[1vw] py-[0.9dvh] rounded-md  w-full "
                  />
                  <p className="text-red-600 italic underline">
                    {registerErrors.password}
                  </p>
                </div>

                <label
                  htmlFor="spswrd"
                  className="text-lg font-semibold text-gray-800 mb-[1.5dvh]"
                >
                  Confirm Password
                </label>
                <div className="mb-[3dvh]">
                  <input
                    type="password"
                    placeholder="Enter your password again"
                    onChange={(event) =>
                      handleRegisterChange("c_password", event)
                    }
                    className="outline-none border-2 border-solid text-base px-[1vw] py-[0.9dvh] rounded-md  w-full "
                  />
                  <p className="text-red-600 italic underline">
                    {registerErrors.c_password}
                  </p>
                </div>

                <button
                  onClick={(event) => registeringData(event)}
                  className="text-lg rounded outline-none px-[1vw] py-[1dvh] mt-[1dvh] border-2 hover:bg-gray-400"
                >
                  <p>Submit</p>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
