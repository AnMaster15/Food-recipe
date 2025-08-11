// app/page.tsx

import AppNavbar from '../components/navbar';
import FoodRecipes from '../components/foodrecepies';
import { ImagesSliderDemo } from "../components/imagestart";
import Footer from '../components/footer';
import {VortexDemo} from '../components/infobox'
import BentoGridDemo from '../components/types'
import RecipeTimer from '../components/RecipeTimer';
import PantrySearch from '../components/PantrySearch';
// import Nutrients from '../components/Nutrients';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <AppNavbar />
      <main className="pt-20">
        <div className="container-modern">
          {/* Hero Section */}
          <div className="mb-20">
            <ImagesSliderDemo />
          </div>
          
          <div className="space-y-24">
            {/* Pantry-to-Recipe Section */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Pantry to Recipe
                </h2>
                <p className="section-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Type what you have at home and we’ll find recipes that match your pantry
                </p>
              </div>
              <PantrySearch />
            </section>
            {/* Discover Recipes Section */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Discover Amazing Recipes
                </h2>
                <p className="section-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Explore a world of culinary delights from around the globe, crafted with love and expertise
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                <FoodRecipes />
              </div>
            </section>
            
            {/* Recipe Categories Section */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Recipe Categories
                </h2>
                <p className="section-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Browse recipes by cuisine type and dietary preferences to find your perfect match
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                <BentoGridDemo />
              </div>
            </section>
            
            {/* Interactive Features Section */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Interactive Features
                </h2>
                <p className="section-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Discover our innovative tools to enhance your cooking experience and culinary journey
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                <VortexDemo />
              </div>
            </section>
            
            {/* Cooking Timer Section */}
            <section className="section">
              <div className="section-header">
                <h2 className="section-title text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Cooking Timer
                </h2>
                <p className="section-subtitle text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
                  Never overcook your meals with our precision timer designed for perfect results every time
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl">
                <RecipeTimer />
              </div>
            </section>
          </div>
          
          {/* <div>
            <Nutrients />
          </div> */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
