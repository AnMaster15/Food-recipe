'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { HoveredLink, MenuItem } from './ui/navbar-menu';
import { cn } from '@/utils/cn';

const AppNavbar = ({ className }: { className?: string }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();
  const [active, setActive] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsSignedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/sign-in');
  };

  return (
    <div className={cn("absolute top-10 inset-x-0 max-w-4xl mx-auto z-50", className)}>
      <div className="navbar-container">
        <div className="navbar-gradient-border"></div>
        <div className="navbar-content flex items-center justify-between px-6 sm:px-8 lg:px-10 h-20 rounded-2xl shadow-2xl border border-white/5 backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 group">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">🍳</span>
              <h1 className="text-2xl font-bold gradient-text transition-all duration-300 group-hover:scale-105">FoodMy</h1>
            </div>
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <HoveredLink href="/" className="text-neutral-300 hover:text-purple-300 inline-flex items-center px-4 py-2 rounded-full hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 font-medium border border-transparent hover:border-purple-500/30">
                Home
              </HoveredLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <MenuItem setActive={setActive} active={active} item="Profile">
                  <div className="flex flex-col space-y-3 text-sm p-3 bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-xl rounded-xl border border-neutral-700/50 shadow-2xl">
                    <HoveredLink href="/dashboards" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                      <span className="text-xl">👤</span>
                      <div>
                        <p className="font-semibold text-neutral-100">Dashboard</p>
                        <p className="text-xs text-neutral-400">View your profile & favorites</p>
                      </div>
                    </HoveredLink>
                    <HoveredLink href="/makerecepie" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                      <span className="text-xl">👨‍🍳</span>
                      <div>
                        <p className="font-semibold text-neutral-100">Create Recipe</p>
                        <p className="text-xs text-neutral-400">Share your culinary creations</p>
                      </div>
                    </HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Discover">
                  <div className="flex flex-col space-y-3 text-sm p-3 bg-gradient-to-br from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 backdrop-blur-xl rounded-xl border border-neutral-700/50 shadow-2xl">
                    <HoveredLink href="/aboutus" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-purple-500/10 hover:to-pink-500/10 transition-all duration-300 border border-transparent hover:border-purple-500/30">
                      <span className="text-xl">ℹ️</span>
                      <div>
                        <p className="font-semibold text-neutral-100">About Us</p>
                        <p className="text-xs text-neutral-400">Learn about FoodMy</p>
                      </div>
                    </HoveredLink>
                  </div>
                </MenuItem>
                <button 
                  onClick={handleSignOut} 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-300 border-red-500/30 hover:from-red-500/20 hover:to-red-600/20 hover:text-red-200 hover:border-red-400/50 hover:shadow-lg hover:shadow-red-500/25"
                >
                  <span>🚪</span>
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <HoveredLink 
                  href="/sign-in" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 bg-gradient-to-r from-neutral-700/50 to-neutral-800/50 text-white border-neutral-600/50 hover:from-neutral-600/50 hover:to-neutral-700/50 hover:text-neutral-200 hover:border-neutral-500/50 hover:shadow-lg"
                >
                  Sign In
                </HoveredLink>
                <HoveredLink 
                  href="/sign-up" 
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white border-transparent shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-0.5"
                >
                  Sign Up
                </HoveredLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppNavbar;
