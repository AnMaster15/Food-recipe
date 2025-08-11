'use client'
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { OptimizedWavyBackground } from "./ui/optimized-wavy-background";

const instructors = [
    {
      id: 1,
      name: 'Shreya Sharma',
      designation: 'Lead Product Designer',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      name: 'Anchit Mehra',
      designation: 'Full Stack Developer',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: 'Chef Olivia Moore',
      designation: 'Head of Culinary Content',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 4,
      name: 'Dr. Samdeep Sharma',
      designation: 'Chief Nutrition Officer',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
    {
      id: 5,
      name: 'Maria Garcia',
      designation: 'Community Manager',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
    {
      id: 6,
      name: 'Alex Chen',
      designation: 'Food Photographer',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
  ];

  
  function Instructors() {
    return (
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
        <OptimizedWavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">The Minds Behind FoodMy</h2>
            <p className="text-base md:text-lg text-gray-200 text-center mb-4 max-w-4xl mx-auto">
              Our diverse team brings together expertise from culinary arts, nutrition science, technology, and design. We&apos;re united by our passion for making cooking more accessible, enjoyable, and healthy for everyone.
            </p>
            <p className="text-base md:text-lg text-gray-200 text-center mb-8 max-w-4xl mx-auto">
              From crafting perfect recipes and ensuring nutritional accuracy to building an engaging platform and capturing stunning food photography, each team member plays a crucial role in creating the ultimate culinary experience for our community.
            </p>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={instructors} />
            </div>
        </OptimizedWavyBackground>
    </div>
    )
  }
  
  export default Instructors
