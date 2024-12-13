import React from 'react';

interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantityInput({ value, onChange }: QuantityInputProps) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 px-2 py-1 pr-8 text-right border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        g
      </span>
    </div>
  );
}