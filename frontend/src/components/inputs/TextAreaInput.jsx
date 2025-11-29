const TextAreaInput = ({
  value,
  label,
  name,
  required = false,
  onChange,
  className,
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className={`block font-semibold text-gray-700`}>
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        className="w-full p-2 border rounded-lg"
        value={value}
        
        placeholder="Enter additional information"
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextAreaInput;
