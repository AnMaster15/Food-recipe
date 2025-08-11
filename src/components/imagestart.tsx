"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export function ImagesSliderDemo() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();
  
  const heroSlides = [
    {
      image: "/images/front7.jpg",
      title: "Discover Culinary Excellence",
      subtitle: "Explore world-class recipes from master chefs around the globe",
      cta: "Browse Recipes",
      route: "/",
      gradient: "from-pink-500/20 via-purple-500/20 to-blue-500/20"
    },
    {
      image: "/images/front2.jpg", 
      title: "Create Your Masterpiece",
      subtitle: "Share your culinary creativity and inspire others with your recipes",
      cta: "Create Recipe",
      route: "/makerecepie",
      gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20"
    },
    {
      image: "/images/front3.jpg",
      title: "Global Cuisine Awaits",
      subtitle: "From traditional to modern, explore diverse flavors and cultures",
      cta: "Explore Categories",
      route: "/topics",
      gradient: "from-green-500/20 via-teal-500/20 to-blue-500/20"
    },
    {
      image: "/images/front4.jpg",
      title: "Perfect Every Time",
      subtitle: "Professional cooking tools and timers for culinary excellence",
      cta: "Get Started",
      route: "/aboutus",
      gradient: "from-indigo-500/20 via-purple-500/20 to-pink-500/20"
    }
  ];
  
  // Auto-advance images with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
          setIsTransitioning(false);
        }, 300);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [heroSlides.length, isTransitioning]);

  const handleSlideClick = (route: string) => {
    router.push(route);
  };

  const goToSlide = (index: number) => {
    if (index === currentImageIndex) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setIsTransitioning(false);
    }, 300);
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 300);
  };
  
  return (
    <div className="relative w-full h-[80vh] min-h-[600px] max-h-[800px] overflow-hidden rounded-3xl shadow-2xl">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={heroSlides[currentImageIndex].image}
          alt={heroSlides[currentImageIndex].title}
          className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
            isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'
          }`}
        />
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentImageIndex].gradient} opacity-60`} />
        <div className="absolute inset-0 bg-black/30" />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-700 ${
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}
          style={{
            background: 'linear-gradient(90deg, rgba(238,0,153,1) 0%, rgba(221,0,238,1) 35%, rgba(0,140,255,1) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            {heroSlides[currentImageIndex].title}
          </h1>
          
          {/* Subtitle */}
          <p className={`text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
            isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
          }`}>
            {heroSlides[currentImageIndex].subtitle}
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => handleSlideClick(heroSlides[currentImageIndex].route)}
            className={`group relative inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 transition-all duration-700 delay-300 ${
              isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}
          >
            <span>{heroSlides[currentImageIndex].cta}</span>
            <svg 
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex 
                ? 'bg-white scale-125 shadow-lg' 
                : 'bg-white/50 hover:bg-white/80 hover:scale-110'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group z-20"
        aria-label="Previous slide"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group z-20"
        aria-label="Next slide"
      >
        <svg 
          className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div 
          className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-1000 ease-linear"
          style={{ width: `${((currentImageIndex + 1) / heroSlides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}