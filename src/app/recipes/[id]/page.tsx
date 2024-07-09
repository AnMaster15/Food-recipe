'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Recipe } from "@/types/recipe";
import Image from 'next/image';
import firebase from '../../../firebase'; // Adjust the path as per your Firebase setup

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [translatedInstructions, setTranslatedInstructions] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
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

  const handleLike = async () => {
    const user = firebase.auth().currentUser;
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
      const db = firebase.firestore();
      await db.collection('users').doc(user.uid).collection('likedRecipes').doc(recipe?.idMeal).set(recipeData);
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

    window.googleTranslateElementInit = () => {
      if (!document.querySelector('.goog-te-gadget')) {
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
    return <p className="text-center text-white">Loading...</p>;
  }

  if (!recipe) {
    return <p className="text-center text-white">Recipe not found.</p>;
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient) {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => router.push('/')} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-75 transition duration-200 group-hover:opacity-100" />
          <div className="relative px-8 py-2 bg-black rounded-lg text-white transition duration-200 group-hover:bg-transparent">
            Back to Home
          </div>
        </button>
        <div className="bg-black-800 p-2 rounded-lg shadow-lg" id="google_element"></div>
      </div>
      <h1 className="text-4xl font-bold mb-6 text-center">{recipe.strMeal}</h1>

      <div className="lg:flex lg:justify-center lg:space-x-8">
        <div className="lg:w-1/4">
          <div className="relative w-full h-64">
            <Image
              className="rounded shadow-md"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              layout="fill"
            />
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
            <h2 className="text-2xl font-semibold mb-4 text-yellow-400">Ingredients</h2>
            <ul className="list-disc list-inside space-y-2">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="text-gray-200">{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-4xl font-semibold mb-4 text-yellow-400">Instructions</h2>
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
            <button onClick={handleLike} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Like Recipe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
