import React from 'react';
interface InputProps {
  name: string;
  type:string;
  label?: string; // Optional label for the select input
  value?: string; // Current selected value
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Change handler
  placeholder?: string; // Placeholder text for the select input
  className?: string; // Custom class name for styling
  error?: string; // Optional error message
  disabled?: boolean; // Optional disabled state
}
const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  type,
  onChange,
  placeholder = "Select an option",
  className = "",
  error,
  disabled = false,
  ...props
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ${
            error ? 'border-red-500' : ''
          }`}
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;