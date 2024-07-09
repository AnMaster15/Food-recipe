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
    <div className={cn("absolute top-10 inset-x-0 max-w-3xl mx-auto z-50", className)}>
      <div className="navbar-container">
        <div className="navbar-gradient-border"></div>
        <div className="navbar-content flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 rounded-full shadow-md border border-gray-200">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-900">FoodMy</h1>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              <HoveredLink href="/" className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 hover:text-gray-700">
                Home
              </HoveredLink>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {isSignedIn ? (
              <>
                <MenuItem setActive={setActive} active={active} item="Profile">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/dashboards">Dashboard</HoveredLink>
                    <HoveredLink href="/makerecepie">Make your own recipe</HoveredLink>
                  </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="About us">
                  <div className="flex flex-col space-y-4 text-sm">
                    <HoveredLink href="/aboutus">About Us</HoveredLink>
                  </div>
                </MenuItem>
                <button onClick={handleSignOut} className="text-gray-900 hover:text-gray-700">
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <HoveredLink href="/sign-in" className="text-gray-900 hover:text-gray-700">
                  Sign In
                </HoveredLink>
                <HoveredLink href="/sign-up" className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
                  Sign Up
                </HoveredLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppNavbar;
