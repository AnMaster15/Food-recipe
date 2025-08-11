'use client';

import React, { useState } from "react";
import Link from 'next/link';
import { Vortex } from "./ui/vortex";

export function VortexDemo() {
    return (
        <div className="w-full h-[30rem] overflow-hidden rounded-2xl border border-neutral-800 shadow-2xl">
            <Vortex backgroundColor="rgb(17, 24, 39)" className="flex items-center flex-col justify-center px-2 md:px-10 py-8 w-full h-full">
                <div className="text-center mb-8">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                        Discover Our New Chat Bot
                    </h2>
                    <p className="text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
                        Experience AI-powered recipe assistance and cooking guidance with our intelligent chatbot
                    </p>
                </div>
                <Link href="/chatbot">
                    <button className="btn btn-primary hover:scale-105 transition-transform duration-200">
                        Try Our AI Chef 😊
                    </button>
                </Link>
            </Vortex>
        </div>
    );
}



