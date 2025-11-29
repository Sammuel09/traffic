const SelectInput = ({ value, label, name, onChange, options }) => {
  return (
    <div className="mb-4 w-100">
      <label htmlFor={name} className="block font-semibold text-gray-700">
        {label}
      </label>
      <select
        name={name}
        className="w-full p-2 pr-4 border rounded-lg"
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
