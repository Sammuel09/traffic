const DateInput = ({ label, name, value, required, onChange }) => {
  return (
    <div className="mb-4 w-100">
      <label htmlFor={name} className="block font-semibold text-gray-700">
        {label}
      </label>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
};

export default DateInput;
