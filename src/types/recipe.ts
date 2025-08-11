// src/types/recipe.ts

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory?: string;
  strArea?: string;
  strTags?: string;
  strYoutube?: string;
  strSource?: string;
  strImageSource?: string;
  strCreativeCommonsConfirmed?: string;
  dateModified?: string;
}

export interface FoodCategory {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  color: string;
  recipeCount?: number;
  popularRecipes?: Recipe[];
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbohydrates: number;
  fat: number;
  fiber: number;
  sugar: number;
  sodium: number;
  cholesterol: number;
}

export interface RecipeWithNutrition extends Recipe {
  nutrition: NutritionInfo;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: Ingredient[];
  tags: string[];
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface RecipeSearchFilters {
  category?: string;
  cuisine?: string;
  difficulty?: string;
  maxPrepTime?: number;
  maxCookTime?: number;
  dietaryRestrictions?: string[];
  ingredients?: string[];
}

export interface UserPreferences {
  dietaryRestrictions: string[];
  favoriteCuisines: string[];
  cookingSkill: 'Beginner' | 'Intermediate' | 'Advanced';
  preferredPrepTime: number;
  allergies: string[];
}
  