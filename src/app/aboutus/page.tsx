'use client';

import React from 'react';
import Link from 'next/link';
import { HeroParallaxDemo } from '../../components/aboutus1';
import { CardStackDemo } from '../../components/aboutus2';
import { CanvasRevealEffectDemo } from '../../components/aboutus3';
import Instructors from '../../components/aboutus4';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black">
      {/* Enhanced Hero Section with Categories */}
      <HeroParallaxDemo />
      
      {/* Additional About Content */}
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-8 md:p-12 mb-20 border border-white/10 shadow-2xl">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Inspire Creativity</h3>
                    <p className="text-gray-300">We provide a platform for food enthusiasts to explore, create, and share their culinary masterpieces.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🌍</span>
                  <div>
                    <h3 className="text-xl font-semibold text-pink-400 mb-2">Global Cuisine</h3>
                    <p className="text-gray-300">Discover recipes from different cultures and expand your culinary horizons.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">🥗</span>
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">Healthy Living</h3>
                    <p className="text-gray-300">Promote nutritious and balanced meals that are both delicious and good for you.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-2xl">👨‍👩‍👧‍👦</span>
                  <div>
                    <h3 className="text-xl font-semibold text-purple-400 mb-2">Community</h3>
                    <p className="text-gray-300">Build a supportive community where food lovers can connect and share their passion.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          

          {/* Call to Action */}
          <div className="text-center">
            <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border border-white/10 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">Join Our Culinary Journey</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Start exploring, creating, and sharing your favorite recipes with our growing community of food enthusiasts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/sign-up">
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-full hover:opacity-90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                    Join Now
                  </button>
                </Link>
                <Link href="/">
                  <button className="px-8 py-3 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-200 border border-white/20">
                    Explore Recipes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
