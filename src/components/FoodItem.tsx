import React from 'react';
import { Trash2 } from 'lucide-react';
import { Food } from '../data/foods';
import { QuantityInput } from './QuantityInput';

interface FoodItemProps {
  food: Food;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onRemove: () => void;
}

export function FoodItem({ food, quantity, onQuantityChange, onRemove }: FoodItemProps) {
  const calories = (food.calories * quantity) / 100;

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{food.name}</h3>
        <p className="text-sm text-gray-500">{calories.toFixed(0)} kcal</p>
      </div>
      <div className="flex items-center gap-4">
        <QuantityInput value={quantity} onChange={onQuantityChange} />
        <button
          onClick={onRemove}
          className="p-1 text-red-600 hover:bg-red-50 rounded-full"
          aria-label="Remover item"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}