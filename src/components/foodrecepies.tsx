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
        setRecipes(recipeData);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const handleViewRecipe = (id: string) => {
    router.push(`/recipes/${id}`);
  };

  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-dot-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
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
  );
};

export default FoodRecipes;


// <div className=" pt-3 lg:p-5 m-5 lg:m-14 rounded-lg flex flex-col lg:flex-row justify-center border-tertiary shadow-lg bg-white">
//         <div className="flex-1 ">
//           <div className=" flex justify-center    ">
//             <img
//               className='rounded-xl'
//               src={image}
//               alt=""
//             />
//           </div>

//           <div className="m-3">
//             <p className="text-xl text-secondary font-frank">Ingredients <span className='text-sm font-extralight'>(per one serving)</span></p>
//             <hr />
//             <div>
//             <div>
//        {data.map((item,number)=>{
//          return(

//            <ul key={number} className="flex justify-between font-rubik text-secondary m-2">
//              <p>{item.name.toUpperCase()}</p> <span className='font-bold'>{item.amount.metric.value}{item.amount.metric.unit}</span>
//            </ul>
//          )
//        })}
//      </div>
//      {/* https://api.spoonacular.com/recipes/4632/summary */}
//             </div>
//           </div>
// </div>

//           <div className='flex-1'>
//           <div className="m-3">
//             <p className="text-xl text-secondary font-frank">Steps</p>
//             <hr />
//             <div>
//             <div>
//        {stepdata.steps.map((item, index)=>{
//          return(
//            <ul key={index} className="flex   font-rubik text-secondary m-2">
//             <span className='m-1'>{item.number}</span> <p className='m-1'>{item.step}</p> 
//            </ul>
//          )
//        })}
//      </div>
  
//             </div>
//           </div>
//           </div>
//         </div>
       
//          </>
