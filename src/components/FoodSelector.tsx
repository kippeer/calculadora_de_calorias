import React, { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { Food, foods } from '../data/foods';
import { foodCategories } from '../data/foodCategories';

interface FoodSelectorProps {
  onAddFood: (food: Food) => void;
}

export function FoodSelector({ onAddFood }: FoodSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const filteredFoods = useMemo(() => {
    let filtered = foods;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(food =>
        food.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      const categoryFoodIds = foodCategories[selectedCategory as keyof typeof foodCategories];
      filtered = filtered.filter(food => categoryFoodIds.includes(food.id));
    }

    return filtered;
  }, [searchTerm, selectedCategory]);

  const handleAddFood = (food: Food) => {
    onAddFood(food);
    setSearchTerm('');
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        {/* Category selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas as categorias</option>
          {Object.keys(foodCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search input */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar alimento..."
            className="w-full px-3 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        </div>
      </div>

      {/* Food list */}
      <div className="max-h-60 overflow-y-auto border rounded-lg bg-white divide-y">
        {filteredFoods.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            Nenhum alimento encontrado
          </div>
        ) : (
          filteredFoods.map((food) => (
            <button
              key={food.id}
              onClick={() => handleAddFood(food)}
              className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center justify-between group"
            >
              <span>{food.name}</span>
              <span className="text-sm text-gray-500">
                {food.calories} kcal/100g
                <Plus size={16} className="ml-2 inline-block opacity-0 group-hover:opacity-100 text-blue-600" />
              </span>
            </button>
          ))
        )}
      </div>
    </div>
  );
}