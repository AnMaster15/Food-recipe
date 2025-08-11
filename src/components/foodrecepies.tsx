'use client';

import React, { useState, useEffect } from 'react';
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { useRouter } from 'next/navigation';
import { Recipe } from "@/types/recipe";

const FoodRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const recipeData: Recipe[] = data.meals.map((meal: any) => ({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          strInstructions: meal.strInstructions,
        }));
        console.log('Fetched recipes:', recipeData);
        console.log('First recipe structure:', recipeData[0]);
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (id: string) => {
    console.log('Navigating to recipe:', id);
    try {
      router.push(`/recipes/${id}`);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="relative w-full py-16">
      {/* Enhanced background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-neutral-800/60 to-neutral-900/80 rounded-3xl border border-neutral-700/30 shadow-2xl"></div>
      
      {/* Content container */}
      <div className="relative z-10 h-[40rem] w-full flex flex-col items-center justify-center overflow-hidden rounded-3xl">
        {/* Header section */}
        <div className="text-center mb-8 px-6">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Discover Amazing Recipes
          </h2>
          <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
            Explore our curated collection of delicious recipes from around the world
          </p>
        </div>
        
        {/* Cards container */}
        <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl">
            <InfiniteMovingCards
              items={recipes}
              direction="right"
              speed="slow"
              onClickItem={handleViewRecipe}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodRecipes;

