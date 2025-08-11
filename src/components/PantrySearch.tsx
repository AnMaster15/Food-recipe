"use client";

import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Recipe } from "@/types/recipe";
import { EnhancedRecipeCard } from "./EnhancedRecipeCard";

type FetchStatus = "idle" | "loading" | "success" | "error";

function normalizeIngredient(raw: string): string | null {
  const trimmed = raw.trim().toLowerCase();
  if (!trimmed) return null;
  // Basic sanitation: keep letters, spaces, and dashes
  const cleaned = trimmed.replace(/[^a-z\s-]/g, "").replace(/\s+/g, " ");
  return cleaned || null;
}

async function fetchRecipesByIngredient(ingredient: string): Promise<Recipe[]> {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
    ingredient
  )}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  const meals = (data?.meals || []) as Array<any>;
  return meals.map((meal) => ({
    idMeal: String(meal.idMeal),
    strMeal: String(meal.strMeal),
    strMealThumb: String(meal.strMealThumb),
    strInstructions: "",
  }));
}

async function fetchRecipeDetails(idMeal: string): Promise<Recipe | null> {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    if (!response.ok) return null;
    const data = await response.json();
    const meal = data?.meals?.[0];
    if (!meal) return null;
    return {
      idMeal: String(meal.idMeal),
      strMeal: String(meal.strMeal),
      strMealThumb: String(meal.strMealThumb),
      strInstructions: String(meal.strInstructions || ""),
      strCategory: meal.strCategory,
      strArea: meal.strArea,
      strTags: meal.strTags,
      strYoutube: meal.strYoutube,
      strSource: meal.strSource,
      strImageSource: meal.strImageSource,
      strCreativeCommonsConfirmed: meal.strCreativeCommonsConfirmed,
      dateModified: meal.dateModified,
    } as Recipe;
  } catch {
    return null;
  }
}

export default function PantrySearch() {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [status, setStatus] = useState<FetchStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [results, setResults] = useState<Recipe[]>([]);
  const [liked, setLiked] = useState<string[]>([]);

  const ingredientChips = useMemo(() => ingredients, [ingredients]);

  const handleAddFromInput = useCallback(() => {
    const parts = input
      .split(",")
      .map(normalizeIngredient)
      .filter((x): x is string => Boolean(x));
    if (parts.length === 0) return;
    setIngredients((prev) => {
      const set = new Set(prev);
      parts.forEach((p) => set.add(p));
      return Array.from(set);
    });
    setInput("");
  }, [input]);

  const removeIngredient = (toRemove: string) => {
    setIngredients((prev) => prev.filter((x) => x !== toRemove));
  };

  const clearAll = () => {
    setIngredients([]);
    setResults([]);
    setStatus("idle");
    setErrorMessage("");
  };

  const search = useCallback(async () => {
    const active = ingredients;
    if (active.length === 0) {
      setErrorMessage("Add at least one ingredient.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");

    try {
      // Fetch per-ingredient lists in parallel
      const lists = await Promise.all(
        active.map((ing) => fetchRecipesByIngredient(ing))
      );

      // Intersect by idMeal; if no full intersection, fall back to union ranked by matches
      const idToCount = new Map<string, number>();
      const idToRecipe = new Map<string, Recipe>();
      for (const list of lists) {
        for (const r of list) {
          idToCount.set(r.idMeal, (idToCount.get(r.idMeal) || 0) + 1);
          if (!idToRecipe.has(r.idMeal)) idToRecipe.set(r.idMeal, r);
        }
      }

      const required = active.length;
      let matched = Array.from(idToCount.entries())
        .filter(([, count]) => count === required)
        .map(([id]) => idToRecipe.get(id)!) as Recipe[];

      if (matched.length === 0) {
        // fallback: top by count
        matched = Array.from(idToCount.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 12)
          .map(([id]) => idToRecipe.get(id)!) as Recipe[];
      }

      // Hydrate a few with details for better preview
      const toHydrate = matched.slice(0, 9);
      const details = await Promise.all(
        toHydrate.map((r) => fetchRecipeDetails(r.idMeal))
      );
      const hydratedIds = new Set(toHydrate.map((r) => r.idMeal));
      const hydrated = details.map((d, idx) => d ?? toHydrate[idx]);
      const rest = matched.filter((r) => !hydratedIds.has(r.idMeal));
      const final = [...hydrated, ...rest];

      setResults(final);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
    }
  }, [ingredients]);

  const handleViewRecipe = (id: string) => router.push(`/recipes/${id}`);
  const handleLike = (recipe: Recipe) =>
    setLiked((prev) =>
      prev.includes(recipe.idMeal)
        ? prev.filter((x) => x !== recipe.idMeal)
        : [...prev, recipe.idMeal]
    );
  const handleShare = async (_recipe: Recipe) => {};

  return (
    <div className="space-y-6">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddFromInput();
                  }
                }}
                placeholder="Type ingredients, e.g., chicken, tomato, basil"
                className="w-full px-4 py-3 pl-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleAddFromInput}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Add
            </button>
            <button
              onClick={search}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              Find Recipes
            </button>
            <button
              onClick={clearAll}
              className="px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
            >
              Clear
            </button>
          </div>
        </div>

        {ingredientChips.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {ingredientChips.map((ing) => (
              <span
                key={ing}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-sm"
              >
                {ing}
                <button
                  onClick={() => removeIngredient(ing)}
                  className="ml-1 hover:text-white"
                  aria-label={`Remove ${ing}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}

        {status === "error" && (
          <div className="mt-3 text-sm text-red-300">{errorMessage}</div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Pantry Matches</h3>
          {status === "loading" && (
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span className="animate-spin inline-block h-4 w-4 rounded-full border-2 border-b-transparent border-purple-400"></span>
              Searching...
            </div>
          )}
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((recipe) => (
              <EnhancedRecipeCard
                key={recipe.idMeal}
                recipe={recipe}
                onViewRecipe={handleViewRecipe}
                onLike={handleLike}
                onShare={handleShare}
                isLiked={liked.includes(recipe.idMeal)}
              />)
            )}
          </div>
        ) : (
          <div className="text-gray-400 text-sm">
            {status === "idle" && (
              <span>Enter ingredients and click Find Recipes to see matches.</span>
            )}
            {status === "success" && (
              <span>No recipes found. Try fewer or different ingredients.</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

