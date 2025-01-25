import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

export default function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  className = "",
  ...props
}) {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <div className={`flex flex-col ${className} font-Roboto gap-[8px]`}>
      {label && (
        <label className="text-[16px] pl-1 font-normal text-[#0C1421] dark:text-white">
          {label}
        </label>
      )}
      <div className="relative sm426:max-w-[388px] sm426:w-full sm375:w-[360px] sm350:w-[320px] h-[40px]">
        <input
          type={type === "password" && !showPassword ? "password" : "text"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="min-w-full px-3 py-2 border border-[#D4D7E3] rounded-[12px] text-sm text-gray-600 bg-[#F3F9FA] placeholder-gray-400 focus:border-blue-500 focus:outline-blue "
          {...props}
          required
        />
        {type === "password" ? (
          <button
            className="absolute top-1/2 right-3  -translate-y-1/2"
            type="button"
            onClick={() => setshowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
