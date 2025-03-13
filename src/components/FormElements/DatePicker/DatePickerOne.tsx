import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.css';

const DatePickerOne = ({ label, value, onChange, defaultValue }: { label: string, value?: string, onChange?: (date: string) => void,defaultValue?:any }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const flatpickrInstance = useRef<flatpickr.Instance | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      // Initialize flatpickr
      flatpickrInstance.current = flatpickr(inputRef.current, {
        enableTime: true,
        dateFormat: "Y-m-d H:i",
        onChange: ([date]) => onChange(date.toISOString()),
      });
    }

    // Cleanup flatpickr on unmount
    return () => {
      if (flatpickrInstance.current) {
        flatpickrInstance.current.destroy();
        flatpickrInstance.current = null;
      }
    };
  }, [onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">{label}</label>
      <input
        ref={inputRef}
        className="form-datepicker w-full border px-3 py-2 rounded-md"
        placeholder="YYYY-MM-DD HH:MM"
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default DatePickerOne;