'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Vortex } from "./ui/vortex";



export function VortexDemo() {

   
    return (
        <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-[30rem] overflow-hidden">
            <Vortex backgroundColor="black" className="flex items-center flex-col justify-center px-2 md:px-10 py-8 w-full h-full">
                <h2 className="text-white text-2xl md:text-6xl font-bold text-center mb-8">
                    Discover Our new Chat Bot
                </h2>
                <Link href="/chatbot">
                <button  className="px-8 py-2 border  bg-transparent text-black  border-white relative group transition duration-200">
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                     <span className="relative text-white font-bold">Click 😊</span>
                </button>
</Link>
            </Vortex>
        </div>
    );
}



