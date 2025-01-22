export default function Loader({ source, className }) {
  return (
    <div className={`flex items-center justify-center ${source === 'forgotPassword' || 'contact' ? "h-fit" : "min-h-screen"}`}>
      <div
        className={`w-10 h-10 ${source === 'forgotPassword' || 'contact' ? "border-white border-2" : "border-blue border-4"} rounded-full animate-spin border-t-transparent ${className || ""}`}
      ></div>
    </div>
  );
}
