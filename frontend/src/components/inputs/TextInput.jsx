const TextInput = ({
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
      <input
        name={name}
        id={name}
        type="text"
        className="w-full p-2 border rounded-lg"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
};

export default TextInput;
