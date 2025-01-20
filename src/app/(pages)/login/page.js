"use client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { logIn } from "@/app/store/authSlice";
import Input from "../../components/Input/Input";
import GoogleButton from "../../components/Auth/Google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function LogInPage({ onSignUpClick }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [invalidUser, setInvalidUser] = useState(false);
  const [serverError, setServerError] = useState(false);
  const router = useRouter();
  const [isLogging, setIsLogging] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  const handleFormSubmmission = async (e) => {
    setIsLogging(true);
    e.preventDefault();

    if (password.length < 6) {
      setInvalidPassword(true);
      setIsLogging(false);
      setTimeout(() => {
        setInvalidPassword(false);
      }, 5000)
    } 
    else {
      try {
        const response = await fetch(
          "https://tunica-blogs-backend.onrender.com/api/auth/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }
        );

        const data = await response.json();
        setIsLogging(false);
        setPassword("");
        setEmail("");

        // Validate Response from API
        if (!response.error && data.token) {
          setUser(data);
          dispatch(
            logIn({
              token: data.token,
              userFound: data.userFound,
            })
          );

          router.push("/");
        } else if (data.error) {
          setInvalidUser(true);
        } else {
          console.log("Error:", response.status);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    }
  };

  // GOOGLE LOGIN
  const handleLoginSuccess = async (credentialResponse) => {
    const accessToken = credentialResponse?.access_token;

    try {
      const response = await fetch(
        "https://tunica-blogs-backend.onrender.com/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ accessToken }),
          credentials: "include",
        }
      );

      if (response.error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        console.log("LOGGED IN SUCCESSFULLY");
        dispatch(
          logIn({
            token: data?.tokens,
            userFound: data?.user,
          })
        );
        router.push("/");
      } else if (data.error === "Internal server error") {
        setServerError(true);
        setTimeout(() => {
          setServerError(false);
        }, 5000);
      }
      console.log("User details from backend:", data);
    } catch (error) {
      console.log("Error during login:", error.message || error);
    }
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };

  // facebook login
  useEffect(() => {
    const loadFacebookSDK = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById("facebook-jssdk")) {
          resolve(); // SDK already loaded
          return;
        }

        const script = document.createElement("script");
        script.id = "facebook-jssdk";
        script.src = "https://connect.facebook.net/en_US/sdk.js";
        script.onload = resolve;
        script.onerror = () => reject(new Error("Failed to load Facebook SDK"));
        document.body.appendChild(script);
      });
    };

    loadFacebookSDK()
      .then(() => {
        if(typeof window !== undefined){
          if (window.FB) {
            window.FB.init({
              appId: "435169396230093", // Replace with your Facebook App ID
              cookie: true,
              xfbml: true,
              version: "v15.0", // Use a valid Facebook Graph API version
            });
            console.log("Facebook SDK loaded and initialized");
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load Facebook SDK:", err);
      });
  }, []);

  const handleFacebookLogin = () => {
    if(typeof window !== undefined){
      if (!window.FB) {
        console.error("Facebook SDK not loaded yet");
        return;
      }
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
  
            // Use an immediately invoked function expression (IIFE) for async logic
            console.log(accessToken)(async () => {
              try {
                const res = await axios.post(
                  "http://localhost:5000/api/auth/facebook-login", // Replace with your backend endpoint
                  { accessToken },
                  { withCredentials: true }
                );
                console.log("Login successful:", res.data);
              } catch (error) {
                console.error(
                  "Error during Facebook login:",
                  error.response?.data || error.message
                );
              }
            })();
          } else {
            console.error("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email,public_profile" } // Request email and profile permissions
      );
    }
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <section className="sm426:h-[1076px] w-full my-5">
        <div className="flex justify-center items-center sm426:gap-x-4 sm426:flex-row flex-col gap-[27px]">
          {/* Form */}
          <div className="sm426:order-1 sm426:h-[1076px] sm426:w-[48%] flex flex-col justify-center items-center gap-[28px] sm426:relative order-2 w-full sm350:px-0 px-2">
            <div className="sm426:max-w-[388px] sm426:w-full flex flex-col justify-center items-center text-left break-words sm375:w-[360px] sm350:w-[320px] w-full">
              <p className="w-full font-semibold text-[36px] font-sfRounded">
                Welcome Back 👋
              </p>
              <p className="w-full font-sfDisplay text-left">
                Today is a new day. It's your day. You shape it.
              </p>
              <p className="w-full font-sfDisplay text-left">
                Sign in to start managing your projects.
              </p>
            </div>

            {/* INVALID CREDENTIALS MESSAGE */}
            {invalidUser ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p>Invalid email or password. Please try again.</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setInvalidUser(false)}
                  className="cursor-pointer mt-[1px]"
                />
              </div>
            ) : null}

            {/* SERVER ERROR */}
            {serverError ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <p>Internal Sever Error. Try again after sometime.</p>
              </div>
            ) : null}

            {/* Invalid Password */}
            {invalidPassword ? (
              <div
                className="flex items-center justify-between gap-2 font-worksans p-3 text-sm text-red-800 bg-red-50 border border-red-300 rounded-lg"
                role="alert"
              >
                <FontAwesomeIcon icon={faCircleExclamation} />
                <p>Password must be of atleast 6 characters.</p>
                <FontAwesomeIcon
                  icon={faXmark}
                  onClick={() => setInvalidUser(false)}
                  className="cursor-pointer mt-[1px]"
                />
              </div>
            ) : null}

            <form
              onSubmit={handleFormSubmmission}
              className="sm426:max-w-[388px] w-full sm426:w-full sm375:w-[360px] sm350:w-[320px] flex flex-col gap-[24px]"
            >
              <Input
                label="Email"
                type="email"
                placeholder="Example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />

              <Input
                label="Password"
                type="text"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
              <button className="w-full text-[#1E4AE9] text-[16px] font-Roboto text-right">
                Forgot Password?
              </button>
              <button className="w-full bg-[#162D3A] dark:bg-blue text-center px-3 py-2 rounded-xl text-[#FFFFFF] text-[20px] font-Roboto">
                {isLogging ? (
                  <div className="flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-blue rounded-full animate-spin border-t-transparent"></div>
                  </div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="sm426:max-w-[388px] w-full flex items-center my-4 font-Roboto break-words">
              <div className="w-full flex-grow border-t border-gray-300"> </div>
              <span className="mx-3 text-[#294957] font-normal dark:text-white">
                Or
              </span>
              <div className="w-full flex-grow border-t border-gray-300"> </div>
            </div>

            {/* Google and/ Facebook Buttons */}
            <div className="max-w-[388px] w-full space-y-4 font-Roboto text-[16px] text-[#313957] sm350:px-0 px-2">
              <GoogleButton
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
              />
              <div
                onClick={handleFacebookLogin}
                className="w-full flex justify-center items-center px-3 py-[9px] rounded-xl bg-[#F3F9FA] gap-4 cursor-pointer"
              >
                <img
                  src="/Facebook.svg"
                  alt="Google logo"
                  className="w-[28px] h-[28px]"
                />
                <div className="flex flex-col">
                  <p className="text-[#313957] font-normal">
                    Sign in with Facebook
                  </p>
                </div>
              </div>
            </div>

            <div className="font-Roboto text-[16px] mt-5 break-words">
              <p className="text-[#313957] dark:text-white">
                Don't you have an account?{" "}
                <Link
                  href="/signup"
                  onClick={onSignUpClick}
                  className="text-[#1E4AE9] hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </div>

            <p className="bottom-0 font-Roboto text-[16px] font-normal text-[#959CB6] break-words sm426:absolute">
              © 2023 ALL RIGHTS RESERVED
            </p>
          </div>

          {/* Image */}
          <div className="sm426:h-[1076px] sm426:w-[48%] sm375:w-[360px] sm350:w-[320px] w-[300px] h-[180px] sm426:order-2 sm426:mt-0 order-1 mt-4">
            <img
              src="/Art.svg"
              className="w-full h-full object-cover sm426:rounded-lg rounded-[20px]"
            />
          </div>
        </div>
      </section>
    </GoogleOAuthProvider>
  );
}
