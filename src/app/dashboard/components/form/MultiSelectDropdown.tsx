import React, { useState } from 'react';
import Select from 'react-select';

interface MultiSelectDropdownProps {
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (selectedValues: string[]) => void;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  options,
  selectedValues,
  onChange,
}) => {
  // Convert selectedValues to the format required by react-select
  const selectedOptions = options.filter((option) =>
    selectedValues.includes(option.value)
  );

  // Handle selection change
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    onChange(selectedValues);
  };

  return (
    <Select
      isMulti
      options={options}
      value={selectedOptions}
      onChange={handleChange}
      placeholder="Select permissions..."
      className="w-full"
    />
  );
};

export default MultiSelectDropdown;