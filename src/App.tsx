import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { Food } from './data/foods';
import { FoodSelector } from './components/FoodSelector';
import { FoodItem } from './components/FoodItem';

interface FoodEntry {
  food: Food;
  quantity: number;
}

function App() {
  const [selectedFoods, setSelectedFoods] = useState<FoodEntry[]>([]);

  const handleAddFood = (food: Food) => {
    if (!selectedFoods.some(entry => entry.food.id === food.id)) {
      setSelectedFoods([...selectedFoods, { food, quantity: food.portion }]);
    }
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    const newFoods = [...selectedFoods];
    newFoods[index].quantity = quantity;
    setSelectedFoods(newFoods);
  };

  const handleRemoveFood = (index: number) => {
    setSelectedFoods(selectedFoods.filter((_, i) => i !== index));
  };

  const totalCalories = selectedFoods.reduce(
    (total, entry) => total + (entry.food.calories * entry.quantity) / 100,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-8">
          <Calculator className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">Calculadora de Calorias</h1>
        </div>

        <div className="space-y-6">
          <FoodSelector onAddFood={handleAddFood} />

          {selectedFoods.length > 0 && (
            <>
              <div className="space-y-3">
                {selectedFoods.map((entry, index) => (
                  <FoodItem
                    key={entry.food.id}
                    food={entry.food}
                    quantity={entry.quantity}
                    onQuantityChange={(value) => handleQuantityChange(index, value)}
                    onRemove={() => handleRemoveFood(index)}
                  />
                ))}
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-lg font-semibold text-blue-900">
                  Total de Calorias: {totalCalories.toFixed(0)} kcal
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;