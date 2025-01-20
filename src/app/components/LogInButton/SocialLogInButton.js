import { useGoogleLogin } from "@react-oauth/google";

export default function SocialLogInButton({
  type,
  onLoginSuccess,
  onLoginFailure,
  handleFacebookAuth,
}) {

  const handleGoogleButtonClick = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginFailure,
  });
  
  const handleClick = () => {
    if (type === "google") {
      handleGoogleButtonClick();
    } else {
      handleFacebookAuth();
    }
  };

  return (
    <div
      className={`sm426:w-full w-[163px] flex justify-center items-center px-3 py-[9px] rounded-[12px] bg-[#F3F9FA] gap-4 cursor-pointer mt-0 sm426:${
        type === "google" ? "pr-8" : ""
      }`}
      onClick={handleClick}
    >
      <img
        src={type === "google" ? "/Google.svg" : "/Facebook.svg"}
        alt={`${type} logo`}
        className="w-[28px] h-[28px]"
      />
      <div className="flex flex-col">
        <p className="text-[#313957] font-normal sm426:hidden">
          {type === "google" ? "Google" : "Facebook"}
        </p>
        <p className="text-[#313957] font-normal sm426:inline hidden">
          {type === "google" ? "Sign in with Google" : "Sign in with Facebook"}
        </p>
      </div>
    </div>
  );
}
