'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Recipe } from "@/types/recipe";
import Image, { ImageLoaderProps } from 'next/image'; // ✅ 1. Import ImageLoaderProps
import { auth, firestore } from '../../../config'; 
import { estimateNutrition, formatNumber } from '@/utils/nutrition';

// ✅ 2. Define the custom loader function
const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [translatedInstructions, setTranslatedInstructions] = useState<string>('');
  const router = useRouter();
  const [servings, setServings] = useState<number>(2);

  // Derive ingredients from fetched recipe (stable across renders)
  const ingredients = useMemo(() => {
    if (!recipe) return [] as Array<{ name: string; measure: string }>;
    const list: Array<{ name: string; measure: string }> = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}` as keyof typeof recipe] as any;
      const measure = recipe[`strMeasure${i}` as keyof typeof recipe] as any;
      if (ingredient) {
        list.push({ name: String(ingredient), measure: String(measure || '') });
      }
    }
    return list;
  }, [recipe]);

  // Estimate nutrition based on ingredients and servings
  const nutrition = useMemo(() => estimateNutrition(ingredients, servings), [ingredients, servings]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      if (!id) return; // Prevent fetching if id is not available yet
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        setRecipe(data.meals[0]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipe details:', error);
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);
  
  // ... (the rest of your functions like handleLike, loadGoogleTranslate, etc. remain the same) ...
  const handleLike = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const recipeData = {
      recipeId: recipe?.idMeal,
      recipeName: recipe?.strMeal,
      recipeUrl: recipe?.strMealThumb,
    };

    try {
      const { doc, setDoc, collection } = await import('firebase/firestore');
      await setDoc(doc(collection(firestore, 'users', user.uid, 'likedRecipes'), recipe?.idMeal), recipeData);
      console.log('Recipe saved successfully');
      router.push('/dashboards'); // Redirect to dashboard
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };

  const loadGoogleTranslate = () => {
    if (!document.querySelector('#google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    }
  
    (window as any).googleTranslateElementInit = () => {
      if (!document.querySelector('.goog-te-gadget')) {
        const google = (window as any).google;
        new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_element');
      }
    };
  };

  useEffect(() => {
    loadGoogleTranslate();

    const style = document.createElement('style');
    style.innerHTML = `
      .goog-logo-link,
      .goog-te-gadget span {
        display: none !important;
      }
      .goog-te-gadget {
        color: transparent !important;
      }
      .goog-te-gadget .goog-te-combo {
        color: white !important;
      }
      .goog-te-combo {
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: #000;
      }
    `;
    document.head.appendChild(style);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500 mb-4"></div>
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  if (!recipe) {
    return <p className="text-center text-white">Recipe not found.</p>;
  }

  


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <div className="container-modern py-10">
        <div className="flex justify-between items-center mb-6">
          <button onClick={() => router.push('/')} className="btn btn-secondary">← Back to Home</button>
          <div className="bg-white/5 border border-white/10 p-2 rounded-lg shadow-lg" id="google_element"></div>
        </div>
        <h1 className="section-title text-center gradient-text mb-6">{recipe.strMeal}</h1>

        <div className="lg:flex lg:justify-center lg:space-x-8">
          <div className="lg:w-1/4">
            <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-white/10">
              <Image
                loader={imageLoader}
                className="object-cover"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
                fill
              />
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-purple-300">Ingredients</h2>
              <ul className="list-disc list-inside space-y-2">
                {ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-200">{ingredient.measure} {ingredient.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0">
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6">
              <h2 className="text-3xl font-semibold mb-4 text-purple-300">Instructions</h2>
              <ul className="list-decimal list-inside space-y-2">
                {translatedInstructions ? (
                  translatedInstructions.split('\n').map((instruction, index) => (
                    <li key={index} className="text-gray-200">{instruction.trim()}</li>
                  ))
                ) : (
                  recipe.strInstructions.split('\n').map((instruction, index) => (
                    <li key={index} className="text-gray-200">{instruction.trim()}</li>
                  ))
                )}
              </ul>
              <button onClick={handleLike} className="mt-4 btn btn-primary">Like Recipe</button>
            </div>

            {/* Nutrition Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl shadow-lg p-6 mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold text-purple-300">Nutrition</h2>
                <div className="flex items-center gap-2">
                  <label className="text-sm text-gray-300">Servings</label>
                  <input
                    type="number"
                    min={1}
                    value={servings}
                    onChange={(e) => setServings(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 px-2 py-1 bg-white/10 border border-white/20 rounded text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                  <div className="text-sm text-gray-300">Calories / serv</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(nutrition.perServing.calories, 0)}</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30">
                  <div className="text-sm text-gray-300">Protein</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(nutrition.perServing.protein)} g</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30">
                  <div className="text-sm text-gray-300">Carbs</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(nutrition.perServing.carbohydrates)} g</div>
                </div>
                <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-500/30">
                  <div className="text-sm text-gray-300">Fat</div>
                  <div className="text-2xl font-bold text-white">{formatNumber(nutrition.perServing.fat)} g</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-300">
                <div>Fiber: <span className="text-white font-semibold">{formatNumber(nutrition.perServing.fiber)} g</span></div>
                <div>Sugar: <span className="text-white font-semibold">{formatNumber(nutrition.perServing.sugar)} g</span></div>
                <div>Sodium: <span className="text-white font-semibold">{formatNumber(nutrition.perServing.sodium)} mg</span></div>
                <div>Cholesterol: <span className="text-white font-semibold">{formatNumber(nutrition.perServing.cholesterol)} mg</span></div>
              </div>
              <div className="mt-3 text-xs text-gray-400">Estimated values based on ingredients and measures.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;