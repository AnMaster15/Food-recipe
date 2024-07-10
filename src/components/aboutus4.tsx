'use client'
import React from "react";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { WavyBackground } from "./ui/wavy-background";

const instructors = [
    {
      id: 1,
      name: 'Shrreya SHhrma',
      designation: 'UI-UX Designer',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 2,
      name: 'Anchit Mehra',
      designation: 'Web developer',
      image:
        'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 3,
      name: 'Chef Olivia Moore',
      designation: 'Master Chef',
      image:
        'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60',
    },
    {
      id: 4,
      name: 'Samdeep Sharma',
      designation: 'Nutrition Expert',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80',
    },
  ];

  
  function Instructors() {
    return (
        <div className="relative h-[40rem] overflow-hidden flex items-center justify-center">
        <WavyBackground className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center h-full">
            <h2 className="text-2xl md:text-4xl lg:text-7xl text-white font-bold text-center mb-8">Meet Our Team</h2>
            <p className="text-base md:text-m text-white text-center mb-4">Our team is made up of passionate foodies, experienced chefs, and dedicated nutrition experts. We work tirelessly to bring you the best recipes and the most accurate nutritional information, so you can enjoy delicious meals that are good for you.</p>
            <p className="text-base md:text-m text-white text-center mb-4">We are always here to help you on your culinary journey, whether you&apos;re looking for a quick weeknight dinner idea, planning a special meal, or simply trying to eat healthier. Join us and discover the joy of cooking and eating well!</p>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={instructors} />
            </div>
        </WavyBackground>
    </div>
    )
  }
  
  export default Instructors
