// app/recipes/[category]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image, { ImageLoaderProps } from 'next/image';

// Define the loader here
const imageLoader = ({ src }: ImageLoaderProps) => {
    return src;
};

const RecipesByCategory = () => {
  // ... (all your existing state and fetching logic remains the same) ...
  const { category } = useParams();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchRecipes = async (url: string) => {
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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-16">
      <div className="container-modern">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => router.push('/')} className="btn btn-secondary">
            ← Back to Home
          </button>
        </div>

        <div className="section-header">
          <h1 className="section-title gradient-text mb-3">{category} Recipes</h1>
          <p className="section-subtitle">Curated dishes to match your taste</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {recipes.length > 0 ? (
            recipes
              .filter(recipe => recipe.strMealThumb) // Only include recipes with a valid image
              .map((recipe) => (
                <div
                  key={recipe.idMeal}
                  className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover-lift card-glow"
                >
                  <div className="relative h-48 cursor-pointer" onClick={() => router.push(`/recipes/${recipe.idMeal}`)}>
                    <Image
                      loader={imageLoader}
                      src={recipe.strMealThumb || '/images/unknown.jpeg'}
                      alt={recipe.strMeal}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h2 className="text-lg font-semibold mb-3 line-clamp-2">{recipe.strMeal}</h2>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => router.push(`/recipes/${recipe.idMeal}`)}
                        className="flex-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:opacity-95 transition"
                      >
                        View Recipe
                      </button>
                    </div>
                  </div>
                </div>
              ))
          ) : (
            <p className="text-center text-gray-300">No recipes found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesByCategory;