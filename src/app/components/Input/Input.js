export default function Input ({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
    name,
    className = "",
    ...props
  }) {
    return (
        <div className={`flex flex-col ${className} font-Roboto `}>
        {label && <label className="text-[16px] font-normal text-[#0C1421] dark:text-white">{label}</label>}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="sm426:max-w-[388px] sm426:w-full sm375:w-[360px] sm350:w-[320px] px-3 py-2 border border-[#D4D7E3] rounded-lg text-sm text-gray-600 bg-[#F3F9FA] placeholder-gray-400 focus:border-blue-500 focus:outline-none"
          {...props}
          required
        />
      </div>
    );
  };