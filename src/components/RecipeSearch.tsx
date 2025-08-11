"use client";

import React, { useState, useEffect } from 'react';
import { Recipe } from '@/types/recipe';

interface RecipeSearchProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  onRandomRecipe: () => void;
}

interface SearchFilters {
  category: string;
  cuisine: string;
  difficulty: string;
  maxTime: number;
  dietary: string[];
}

const categories = [
  'Beef', 'Chicken', 'Dessert', 'Lamb', 'Miscellaneous', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'
];

const cuisines = [
  'American', 'British', 'Chinese', 'French', 'Indian', 'Italian', 'Japanese', 'Mexican', 'Spanish', 'Thai'
];

const difficulties = ['Easy', 'Medium', 'Hard'];

const dietaryOptions = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Low-Carb', 'High-Protein'];

export const RecipeSearch: React.FC<RecipeSearchProps> = ({ onSearch, onRandomRecipe }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    cuisine: '',
    difficulty: '',
    maxTime: 60,
    dietary: []
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    if (key === 'dietary') {
      const newDietary = filters.dietary.includes(value)
        ? filters.dietary.filter(d => d !== value)
        : [...filters.dietary, value];
      setFilters({ ...filters, dietary: newDietary });
    } else {
      setFilters({ ...filters, [key]: value });
    }
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      cuisine: '',
      difficulty: '',
      maxTime: 60,
      dietary: []
    });
    setSearchQuery('');
  };

  return (
    <div className="bg-gradient-to-r from-purple-900 to-blue-900 rounded-xl p-6 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Input */}
        <div className="flex-1 w-full">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for recipes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            />
            <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Search
        </button>

        {/* Random Recipe Button */}
        <button
          onClick={onRandomRecipe}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-teal-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          🎲 Random
        </button>

        {/* Expand Filters Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
        >
          {isExpanded ? '🔽' : '🔽'} Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Cuisine Filter */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Cuisine</label>
            <select
              value={filters.cuisine}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Cuisines</option>
              {cuisines.map(cuisine => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Difficulty</label>
            <select
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="">All Difficulties</option>
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>

          {/* Max Time Filter */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">Max Time: {filters.maxTime}min</label>
            <input
              type="range"
              min="15"
              max="180"
              step="15"
              value={filters.maxTime}
              onChange={(e) => handleFilterChange('maxTime', parseInt(e.target.value))}
              className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      )}

      {/* Dietary Filters */}
      {isExpanded && (
        <div className="mt-4">
          <label className="block text-white/80 text-sm font-medium mb-2">Dietary Preferences</label>
          <div className="flex flex-wrap gap-2">
            {dietaryOptions.map(option => (
              <button
                key={option}
                onClick={() => handleFilterChange('dietary', option)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                  filters.dietary.includes(option)
                    ? 'bg-purple-500 text-white'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {isExpanded && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}; 