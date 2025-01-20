import { useGoogleLogin } from "@react-oauth/google";

export default function GoogleButton({ onLoginSuccess, onLoginFailure }) {
  const googleLogin = useGoogleLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginFailure,
  });

  return (
    <div
      className="w-full flex justify-center items-center px-3 py-[9px] rounded-xl bg-[#F3F9FA] gap-4 cursor-pointer pr-8"
      onClick={googleLogin}
    >
      <img src="/Google.svg" alt="Google logo" className="w-[28px] h-[28px]" />
      <div className="flex flex-col">
        <p className="text-[#313957] font-normal">Sign in with Google</p>
      </div>
    </div>
  );
}
