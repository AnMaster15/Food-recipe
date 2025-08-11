"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Recipe } from '@/types/recipe';
import { EnhancedRecipeCard } from './EnhancedRecipeCard';

interface RecipeRecommendationsProps {
  currentRecipe?: Recipe;
  onViewRecipe: (id: string) => void;
  onLike: (recipe: Recipe) => void;
  onShare: (recipe: Recipe) => void;
  likedRecipes: string[];
}

export const RecipeRecommendations: React.FC<RecipeRecommendationsProps> = ({
  currentRecipe,
  onViewRecipe,
  onLike,
  onShare,
  likedRecipes
}) => {
  const [recommendations, setRecommendations] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'similar' | 'trending' | 'personalized'>('similar');

  const getCategoryFromRecipe = useCallback((recipe: Recipe): string => {
    // This is a simplified approach - in a real app, you'd have category data
    const categories = ['Beef', 'Chicken', 'Dessert', 'Lamb', 'Pasta', 'Pork', 'Seafood', 'Side', 'Starter', 'Vegan', 'Vegetarian'];
    return categories[Math.floor(Math.random() * categories.length)];
  }, []);

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    try {
      let url = '';
      
      switch (activeTab) {
        case 'similar':
          if (currentRecipe) {
            // Fetch recipes from similar category
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${getCategoryFromRecipe(currentRecipe)}`;
          } else {
            url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
          }
          break;
        case 'trending':
          url = 'https://www.themealdb.com/api/json/v1/1/random.php';
          break;
        case 'personalized':
          url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
          break;
      }

      const response = await fetch(url);
      const data = await response.json();
      
      let recipes: Recipe[] = [];
      
      if (activeTab === 'trending') {
        // For trending, we get one random recipe, so we need to fetch multiple
        const promises = Array.from({ length: 6 }, () => 
          fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        );
        const responses = await Promise.all(promises);
        const randomData = await Promise.all(responses.map(r => r.json()));
        recipes = randomData.map(item => ({
          idMeal: item.meals[0].idMeal,
          strMeal: item.meals[0].strMeal,
          strMealThumb: item.meals[0].strMealThumb,
          strInstructions: item.meals[0].strInstructions || '',
        }));
      } else {
        recipes = data.meals?.slice(0, 6).map((meal: any) => ({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strInstructions: meal.strInstructions || '',
        })) || [];
      }

      // Filter out current recipe if showing similar
      if (currentRecipe && activeTab === 'similar') {
        recipes = recipes.filter(recipe => recipe.idMeal !== currentRecipe.idMeal);
      }

      setRecommendations(recipes);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentRecipe, getCategoryFromRecipe]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const tabs = [
    { id: 'similar', label: 'Similar Recipes', icon: '🔍' },
    { id: 'trending', label: 'Trending Now', icon: '🔥' },
    { id: 'personalized', label: 'For You', icon: '⭐' }
  ];

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl p-6 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Recipe Recommendations</h2>
        <button
          onClick={fetchRecommendations}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
        >
          🔄 Refresh
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-700 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-purple-600 text-white shadow-lg'
                : 'text-gray-300 hover:text-white hover:bg-slate-600'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Recommendations Grid */}
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((recipe) => (
            <EnhancedRecipeCard
              key={recipe.idMeal}
              recipe={recipe}
              onViewRecipe={onViewRecipe}
              onLike={onLike}
              onShare={onShare}
              isLiked={likedRecipes.includes(recipe.idMeal)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍽️</div>
          <p className="text-gray-400 text-lg">No recommendations found</p>
          <p className="text-gray-500 text-sm">Try refreshing or changing the filter</p>
        </div>
      )}

      {/* View All Button */}
      <div className="mt-8 text-center">
        <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
          View All Recommendations
        </button>
      </div>
    </div>
  );
}; 