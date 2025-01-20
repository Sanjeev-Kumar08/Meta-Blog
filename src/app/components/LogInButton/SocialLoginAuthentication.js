import React, { useEffect } from "react";
import SocialLogInButton from "./SocialLogInButton";
import { useDispatch } from "react-redux";
import { logIn } from "@/app/store/authSlice";
import { useRouter } from "next/navigation";

function SocialLoginAuthentication({ setServerError }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  
  useEffect(() => {
    if (typeof window !== "undefined" && window.google) {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleLoginSuccess,
      });
    }
  }, [clientId]);

  // GOOGLE LOGIN
  const handleGoogleLoginSuccess = async (credentialResponse) => {
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
    } catch (error) {
      console.log("Error during login:", error.message || error);
    }
  };

  const handleGoogleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };

  // facebook login
  useEffect(() => {
    const loadFacebookSDK = () => {
      return new Promise((resolve, reject) => {
        if (document.getElementById("facebook-jssdk")) {
          resolve();
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
        if (typeof window !== undefined) {
          if (window.FB) {
            window.FB.init({
              appId: "435169396230093",
              cookie: true,
              xfbml: true,
              version: "v15.0",
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
    if (typeof window !== undefined) {
      if (!window.FB) {
        console.error("Facebook SDK not loaded yet");
        return;
      }
      window.FB.login(
        (response) => {
          if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;

            // Use fetch to send the access token
            (async () => {
              try {
                const res = await fetch(
                  "https://tunica-blogs-backend.onrender.com/api/auth/facebook-login",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ accessToken }),
                    credentials: "include", // Ensures cookies are sent with the request
                  }
                );

                if (!res.ok) {
                  throw new Error(`HTTP error! status: ${res.status}`);
                }

                const data = await res.json();
                console.log("Login successful:", data);
                if (data.message === "Login successful") {
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
              } catch (error) {
                console.error("Error during Facebook login:", error.message);
              }
            })();
          } else {
            console.error("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email,public_profile" } 
      );
    }
  };

  return (
    <div className="sm426:max-w-[388px] w-full sm426:w-full sm375:w-[360px] sm350:w-[320px] sm426:space-y-4 font-Roboto text-[16px] text-[#313957] sm350:px-0 px-2 sm426:block flex justify-between items-center">
      <SocialLogInButton
        type="google"
        onLoginSuccess={handleGoogleLoginSuccess}
        onLoginFailure={handleGoogleLoginFailure}
      />

      <SocialLogInButton
        type="facebook"
        handleFacebookAuth={handleFacebookLogin}
      />
    </div>
  );
}

export default SocialLoginAuthentication;
