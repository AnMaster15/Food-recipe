import { NutritionInfo } from "@/types/recipe";

export interface IngredientInput {
  name: string;
  measure: string;
}

const ZERO: NutritionInfo = {
  calories: 0,
  protein: 0,
  carbohydrates: 0,
  fat: 0,
  fiber: 0,
  sugar: 0,
  sodium: 0,
  cholesterol: 0,
};

// Basic per-100g nutrition database for common ingredients (approximate)
// Units: grams for macros/fiber/sugar, milligrams for sodium/cholesterol
const NUTRITION_DB: Array<{ keywords: string[]; per100g: NutritionInfo }> = [
  { keywords: ["chicken", "chicken breast", "chicken thigh"], per100g: { calories: 165, protein: 31, carbohydrates: 0, fat: 3.6, fiber: 0, sugar: 0, sodium: 74, cholesterol: 85 } },
  { keywords: ["beef", "steak", "ground beef"], per100g: { calories: 250, protein: 26, carbohydrates: 0, fat: 15, fiber: 0, sugar: 0, sodium: 72, cholesterol: 90 } },
  { keywords: ["pork"], per100g: { calories: 242, protein: 27, carbohydrates: 0, fat: 14, fiber: 0, sugar: 0, sodium: 62, cholesterol: 80 } },
  { keywords: ["fish", "salmon", "tuna", "cod"], per100g: { calories: 206, protein: 22, carbohydrates: 0, fat: 12, fiber: 0, sugar: 0, sodium: 59, cholesterol: 63 } },
  { keywords: ["olive oil", "oil"], per100g: { calories: 884, protein: 0, carbohydrates: 0, fat: 100, fiber: 0, sugar: 0, sodium: 0, cholesterol: 0 } },
  { keywords: ["butter"], per100g: { calories: 717, protein: 0.85, carbohydrates: 0.06, fat: 81, fiber: 0, sugar: 0.06, sodium: 11, cholesterol: 215 } },
  { keywords: ["sugar", "granulated sugar", "white sugar"], per100g: { calories: 387, protein: 0, carbohydrates: 100, fat: 0, fiber: 0, sugar: 100, sodium: 2, cholesterol: 0 } },
  { keywords: ["flour", "all-purpose flour"], per100g: { calories: 364, protein: 10, carbohydrates: 76, fat: 1, fiber: 3, sugar: 0.3, sodium: 2, cholesterol: 0 } },
  { keywords: ["rice"], per100g: { calories: 365, protein: 7, carbohydrates: 80, fat: 0.6, fiber: 1.3, sugar: 0.1, sodium: 0, cholesterol: 0 } },
  { keywords: ["pasta", "spaghetti", "macaroni"], per100g: { calories: 371, protein: 13, carbohydrates: 75, fat: 1.5, fiber: 3.2, sugar: 2.7, sodium: 6, cholesterol: 0 } },
  { keywords: ["tomato"], per100g: { calories: 18, protein: 0.9, carbohydrates: 3.9, fat: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5, cholesterol: 0 } },
  { keywords: ["onion"], per100g: { calories: 40, protein: 1.1, carbohydrates: 9.3, fat: 0.1, fiber: 1.7, sugar: 4.2, sodium: 4, cholesterol: 0 } },
  { keywords: ["garlic"], per100g: { calories: 149, protein: 6.4, carbohydrates: 33, fat: 0.5, fiber: 2.1, sugar: 1, sodium: 17, cholesterol: 0 } },
  { keywords: ["salt", "sea salt"], per100g: { calories: 0, protein: 0, carbohydrates: 0, fat: 0, fiber: 0, sugar: 0, sodium: 38758, cholesterol: 0 } },
  { keywords: ["egg"], per100g: { calories: 155, protein: 13, carbohydrates: 1.1, fat: 11, fiber: 0, sugar: 1.1, sodium: 124, cholesterol: 373 } },
  { keywords: ["milk"], per100g: { calories: 61, protein: 3.2, carbohydrates: 4.8, fat: 3.3, fiber: 0, sugar: 5.2, sodium: 43, cholesterol: 10 } },
  { keywords: ["cheese", "cheddar"], per100g: { calories: 403, protein: 25, carbohydrates: 1.3, fat: 33, fiber: 0, sugar: 0.5, sodium: 621, cholesterol: 105 } },
  { keywords: ["potato"], per100g: { calories: 77, protein: 2, carbohydrates: 17, fat: 0.1, fiber: 2.2, sugar: 0.8, sodium: 6, cholesterol: 0 } },
  { keywords: ["carrot"], per100g: { calories: 41, protein: 0.9, carbohydrates: 10, fat: 0.2, fiber: 2.8, sugar: 4.7, sodium: 69, cholesterol: 0 } },
  { keywords: ["bell pepper", "capsicum", "pepper"], per100g: { calories: 31, protein: 1, carbohydrates: 6, fat: 0.3, fiber: 2.1, sugar: 4.2, sodium: 2, cholesterol: 0 } },
  { keywords: ["broccoli"], per100g: { calories: 34, protein: 2.8, carbohydrates: 7, fat: 0.4, fiber: 2.6, sugar: 1.7, sodium: 33, cholesterol: 0 } },
  { keywords: ["spinach"], per100g: { calories: 23, protein: 2.9, carbohydrates: 3.6, fat: 0.4, fiber: 2.2, sugar: 0.4, sodium: 79, cholesterol: 0 } },
  { keywords: ["cream"], per100g: { calories: 340, protein: 2, carbohydrates: 3, fat: 36, fiber: 0, sugar: 3, sodium: 35, cholesterol: 110 } },
];

const FALLBACK_PER100G: NutritionInfo = {
  calories: 120,
  protein: 4,
  carbohydrates: 20,
  fat: 3,
  fiber: 2,
  sugar: 5,
  sodium: 100,
  cholesterol: 0,
};

function findNutritionPer100g(ingredientName: string): NutritionInfo {
  const lower = ingredientName.toLowerCase();
  for (const entry of NUTRITION_DB) {
    if (entry.keywords.some((k) => lower.includes(k))) {
      return entry.per100g;
    }
  }
  return FALLBACK_PER100G;
}

// Convert unicode fractions to decimal
function normalizeFractions(input: string): string {
  return input
    .replace(/½/g, " 1/2 ")
    .replace(/¼/g, " 1/4 ")
    .replace(/¾/g, " 3/4 ")
    .replace(/⅓/g, " 1/3 ")
    .replace(/⅔/g, " 2/3 ");
}

function parseQuantity(qtyStr: string): number {
  const normalized = normalizeFractions(qtyStr).trim();
  // e.g., "1 1/2" or "2" or "3/4"
  const parts = normalized.split(/\s+/);
  let total = 0;
  for (const part of parts) {
    if (/^\d+\/?\d*$/.test(part)) {
      if (part.includes("/")) {
        const [n, d] = part.split("/").map((v) => parseFloat(v));
        if (!isNaN(n) && !isNaN(d) && d !== 0) total += n / d;
      } else {
        const v = parseFloat(part);
        if (!isNaN(v)) total += v;
      }
    }
  }
  return total || 0;
}

function measureToGrams(measure: string, ingredientName: string): number {
  if (!measure) return 50; // fallback guess
  const m = measure.toLowerCase().replace(/\./g, " ");

  // Extract quantity
  const qty = parseQuantity(m);
  // Units
  const unit = m.includes("kg")
    ? "kg"
    : m.includes("gram") || m.match(/\b\dg\b/) || m.includes(" g")
    ? "g"
    : m.includes("lb")
    ? "lb"
    : m.includes("oz")
    ? "oz"
    : m.includes("ml")
    ? "ml"
    : m.includes("liter") || m.includes("l ") || m.endsWith(" l")
    ? "l"
    : m.includes("tablespoon") || m.includes("tbsp")
    ? "tbsp"
    : m.includes("teaspoon") || m.includes("tsp")
    ? "tsp"
    : m.includes("cup")
    ? "cup"
    : m.includes("clove")
    ? "clove"
    : m.includes("piece")
    ? "piece"
    : m.includes("slice")
    ? "slice"
    : m.includes("can")
    ? "can"
    : m.includes("jar")
    ? "jar"
    : "unknown";

  if (unit === "kg") return Math.max(qty, 1) * 1000;
  if (unit === "g") return qty > 0 ? qty : 50;
  if (unit === "lb") return Math.max(qty, 1) * 453.592;
  if (unit === "oz") return Math.max(qty, 1) * 28.3495;
  if (unit === "ml") return Math.max(qty, 1) * 1; // assume water density
  if (unit === "l") return Math.max(qty, 1) * 1000;
  if (unit === "tbsp") return Math.max(qty, 1) * 15;
  if (unit === "tsp") return Math.max(qty, 1) * 5;
  if (unit === "cup") return Math.max(qty, 1) * 240;
  if (unit === "clove") return Math.max(qty, 1) * 3;
  if (unit === "slice") return Math.max(qty, 1) * 25;
  if (unit === "can") return Math.max(qty, 1) * 400;
  if (unit === "jar") return Math.max(qty, 1) * 350;
  if (unit === "piece") {
    const name = ingredientName.toLowerCase();
    if (name.includes("egg")) return Math.max(qty, 1) * 50;
    if (name.includes("onion")) return Math.max(qty, 1) * 110;
    if (name.includes("tomato")) return Math.max(qty, 1) * 100;
    return Math.max(qty, 1) * 50;
  }
  // Unknown: try to parse any trailing number as grams; else fallback
  const num = parseFloat(m);
  if (!isNaN(num) && num > 0) return num; // assume grams
  return 50;
}

function addNutrition(a: NutritionInfo, b: NutritionInfo): NutritionInfo {
  return {
    calories: a.calories + b.calories,
    protein: a.protein + b.protein,
    carbohydrates: a.carbohydrates + b.carbohydrates,
    fat: a.fat + b.fat,
    fiber: a.fiber + b.fiber,
    sugar: a.sugar + b.sugar,
    sodium: a.sodium + b.sodium,
    cholesterol: a.cholesterol + b.cholesterol,
  };
}

function scaleNutrition(n: NutritionInfo, factor: number): NutritionInfo {
  return {
    calories: n.calories * factor,
    protein: n.protein * factor,
    carbohydrates: n.carbohydrates * factor,
    fat: n.fat * factor,
    fiber: n.fiber * factor,
    sugar: n.sugar * factor,
    sodium: n.sodium * factor,
    cholesterol: n.cholesterol * factor,
  };
}

export function estimateNutrition(
  ingredients: IngredientInput[],
  servings: number = 2
): { total: NutritionInfo; perServing: NutritionInfo; servings: number } {
  let total: NutritionInfo = { ...ZERO };

  for (const ing of ingredients) {
    const grams = measureToGrams(ing.measure || "", ing.name || "");
    const per100 = findNutritionPer100g(ing.name || "");
    const perGram = scaleNutrition(per100, 1 / 100);
    const contrib = scaleNutrition(perGram, grams);
    total = addNutrition(total, contrib);
  }

  const safeServings = servings > 0 ? servings : 1;
  const perServing = scaleNutrition(total, 1 / safeServings);
  return { total, perServing, servings: safeServings };
}

export function formatNumber(n: number, fractionDigits = 1): string {
  return Number.isFinite(n) ? n.toFixed(fractionDigits) : "0";
}

