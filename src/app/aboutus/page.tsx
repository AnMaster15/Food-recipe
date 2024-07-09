'use client';

import React from 'react';
import Link from 'next/link';
import { HeroParallaxDemo } from '../../components/aboutus1';
import { CardStackDemo } from '../../components/aboutus2';
import { CanvasRevealEffectDemo } from '../../components/aboutus3';
import Instructors from '../../components/aboutus4';

const AboutUs = () => {
  return (
    <div className="bg-black text-white-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">About Us</h1>
          <Link href="/">
            
            <button className="p-[3px] relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
        <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
          Home
        </div>
      </button>
          </Link>
        </div>
        <HeroParallaxDemo />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="order-2 md:order-1 flex justify-center items-center">
            <CardStackDemo />
          </div>
          <div className="order-1 md:order-2">
            <CanvasRevealEffectDemo />
          </div>
        </div>
        <div className="mt-12">
          <Instructors />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
