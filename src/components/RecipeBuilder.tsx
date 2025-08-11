"use client";

import React, { useState } from 'react';

interface Ingredient {
  id: string;
  name: string;
  amount: string;
  unit: string;
}

interface Instruction {
  id: string;
  step: number;
  description: string;
}

interface RecipeBuilderProps {
  onSave: (recipe: CustomRecipe) => void;
}

interface CustomRecipe {
  name: string;
  description: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: string;
  category: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
  tags: string[];
}

export const RecipeBuilder: React.FC<RecipeBuilderProps> = ({ onSave }) => {
  const [recipe, setRecipe] = useState<CustomRecipe>({
    name: '',
    description: '',
    prepTime: 15,
    cookTime: 30,
    servings: 4,
    difficulty: 'Medium',
    category: 'Main Course',
    ingredients: [],
    instructions: [],
    tags: []
  });

  const [newIngredient, setNewIngredient] = useState({ name: '', amount: '', unit: '' });
  const [newInstruction, setNewInstruction] = useState('');
  const [newTag, setNewTag] = useState('');

  const categories = [
    'Appetizer', 'Main Course', 'Side Dish', 'Dessert', 'Beverage', 'Breakfast', 'Lunch', 'Dinner', 'Snack'
  ];

  const difficulties = ['Easy', 'Medium', 'Hard', 'Expert'];

  const units = [
    'cup', 'tbsp', 'tsp', 'oz', 'lb', 'g', 'kg', 'ml', 'l', 'piece', 'slice', 'clove', 'bunch', 'can', 'jar'
  ];

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.amount) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        amount: newIngredient.amount,
        unit: newIngredient.unit
      };
      setRecipe(prev => ({
        ...prev,
        ingredients: [...prev.ingredients, ingredient]
      }));
      setNewIngredient({ name: '', amount: '', unit: '' });
    }
  };

  const removeIngredient = (id: string) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter(ing => ing.id !== id)
    }));
  };

  const addInstruction = () => {
    if (newInstruction.trim()) {
      const instruction: Instruction = {
        id: Date.now().toString(),
        step: recipe.instructions.length + 1,
        description: newInstruction.trim()
      };
      setRecipe(prev => ({
        ...prev,
        instructions: [...prev.instructions, instruction]
      }));
      setNewInstruction('');
    }
  };

  const removeInstruction = (id: string) => {
    setRecipe(prev => ({
      ...prev,
      instructions: prev.instructions
        .filter(inst => inst.id !== id)
        .map((inst, index) => ({ ...inst, step: index + 1 }))
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !recipe.tags.includes(newTag.trim())) {
      setRecipe(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setRecipe(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSave = () => {
    if (recipe.name && recipe.ingredients.length > 0 && recipe.instructions.length > 0) {
      onSave(recipe);
      // Reset form
      setRecipe({
        name: '',
        description: '',
        prepTime: 15,
        cookTime: 30,
        servings: 4,
        difficulty: 'Medium',
        category: 'Main Course',
        ingredients: [],
        instructions: [],
        tags: []
      });
    }
  };

  const isFormValid = recipe.name && recipe.ingredients.length > 0 && recipe.instructions.length > 0;

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">🍳 Create Your Recipe</h2>
        <p className="text-gray-300">Build your own custom recipe with ingredients and step-by-step instructions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Basic Info */}
        <div className="space-y-6">
          {/* Recipe Name */}
          <div>
            <label className="block text-white font-medium mb-2">Recipe Name *</label>
            <input
              type="text"
              value={recipe.name}
              onChange={(e) => setRecipe(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter recipe name..."
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white font-medium mb-2">Description</label>
            <textarea
              value={recipe.description}
              onChange={(e) => setRecipe(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your recipe..."
              rows={3}
              className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Time and Servings */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Prep Time (min)</label>
              <input
                type="number"
                value={recipe.prepTime}
                onChange={(e) => setRecipe(prev => ({ ...prev, prepTime: parseInt(e.target.value) || 0 }))}
                min="0"
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Cook Time (min)</label>
              <input
                type="number"
                value={recipe.cookTime}
                onChange={(e) => setRecipe(prev => ({ ...prev, cookTime: parseInt(e.target.value) || 0 }))}
                min="0"
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Servings</label>
              <input
                type="number"
                value={recipe.servings}
                onChange={(e) => setRecipe(prev => ({ ...prev, servings: parseInt(e.target.value) || 1 }))}
                min="1"
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          {/* Difficulty and Category */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white font-medium mb-2">Difficulty</label>
              <select
                value={recipe.difficulty}
                onChange={(e) => setRecipe(prev => ({ ...prev, difficulty: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {difficulties.map(diff => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white font-medium mb-2">Category</label>
              <select
                value={recipe.category}
                onChange={(e) => setRecipe(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-white font-medium mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={addTag}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded-full"
                >
                  {tag}
                  <button
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-200 transition-colors duration-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Ingredients and Instructions */}
        <div className="space-y-6">
          {/* Ingredients */}
          <div>
            <label className="block text-white font-medium mb-2">Ingredients *</label>
            <div className="space-y-2 mb-3">
              {recipe.ingredients.map(ingredient => (
                <div key={ingredient.id} className="flex items-center gap-2 p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-400 font-medium">{ingredient.amount} {ingredient.unit}</span>
                  <span className="text-white flex-1">{ingredient.name}</span>
                  <button
                    onClick={() => removeIngredient(ingredient.id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                value={newIngredient.amount}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Amount"
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <select
                value={newIngredient.unit}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, unit: e.target.value }))}
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="">Unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              <input
                type="text"
                value={newIngredient.name}
                onChange={(e) => setNewIngredient(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ingredient name"
                className="px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <button
              onClick={addIngredient}
              className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-white font-medium mb-2">Instructions *</label>
            <div className="space-y-2 mb-3">
              {recipe.instructions.map(instruction => (
                <div key={instruction.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <span className="text-purple-400 font-bold text-lg min-w-[2rem]">{instruction.step}</span>
                  <p className="text-white flex-1">{instruction.description}</p>
                  <button
                    onClick={() => removeInstruction(instruction.id)}
                    className="text-red-400 hover:text-red-300 transition-colors duration-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newInstruction}
                onChange={(e) => setNewInstruction(e.target.value)}
                placeholder="Add instruction step..."
                className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={addInstruction}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              >
                + Add Step
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 text-center">
        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`px-8 py-3 text-lg font-semibold rounded-lg transition-all duration-300 transform ${
            isFormValid
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 hover:scale-105 shadow-lg'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isFormValid ? '💾 Save Recipe' : 'Please fill in all required fields'}
        </button>
      </div>

      {/* Recipe Preview */}
      {isFormValid && (
        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Recipe Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Ingredients ({recipe.ingredients.length})</h4>
              <ul className="space-y-1">
                {recipe.ingredients.map(ingredient => (
                  <li key={ingredient.id} className="text-white">
                    <span className="text-purple-400">{ingredient.amount} {ingredient.unit}</span> {ingredient.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-purple-400 mb-2">Instructions ({recipe.instructions.length})</h4>
              <ol className="space-y-2">
                {recipe.instructions.map(instruction => (
                  <li key={instruction.id} className="text-white">
                    <span className="text-purple-400 font-bold">{instruction.step}.</span> {instruction.description}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 