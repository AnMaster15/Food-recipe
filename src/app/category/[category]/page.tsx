'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { BackgroundGradient } from "../../../components/ui/ackground-gradient";
// import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

const RecipesByCategory = () => {
  const { category } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data.meals || [];
    };

    const getRecipes = async () => {
      let urls = [];

      if (category === 'Vegetarian') {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?c=Vegetarian`];
      } else if (category === 'Breakfast') {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast`];
      } else if (category === 'Dessert') {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert`];
      } else if (category === 'Side') {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?c=Side`];
      } else if (category === 'Starter') {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?c=Starter`];
      } else if (category === 'Non-Vegetarian') {
        urls = [
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken`,
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef`,
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Pork`,
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood`,
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat`
        ];
      } else if (category === 'More') {
        router.push('/topics');
        return;
      } else {
        urls = [`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`];
      }

      try {
        const results = await Promise.all(urls.map(url => fetchRecipes(url)));
        const combinedRecipes = results.flat();
        setRecipes(combinedRecipes);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    getRecipes();
  }, [category, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black py-12 pt-10">
       <button onClick={() => router.push('/')} className="relative group left-5">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-75 transition duration-200 group-hover:opacity-100" />
          <div className="relative px-8 py-2 bg-slate-700 rounded-lg text-white transition duration-200 group-hover:bg-transparent">
            Back to Home
          </div>
        </button>
    <h1 className="text-lg md:text-7xl text-center font-sans font-bold mb-8 text-white">{category} Recipes</h1>  
      {/* <h1 className="text-4xl font-bold mb-6 text-gray-800">{category} Recipes</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <BackgroundGradient key={recipe.idMeal} className="rounded-[22px] p-4 sm:p-10 bg-slate-900">
              <div onClick={() => router.push(`/recipes/${recipe.idMeal}`)} className="cursor-pointer">
                <h2 className="text-xl font-bold mb-2 text-white-600">{recipe.strMeal}</h2>
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-48 object-cover mb-4 rounded-lg" />
              </div>
            </BackgroundGradient>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default RecipesByCategory;
