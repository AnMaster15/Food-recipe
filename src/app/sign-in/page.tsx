// app/sign-in/page.tsx

'use client';

import { useRouter } from 'next/navigation';
// To get the specific error type, you can import FirebaseError
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useState } from 'react';
import Link from 'next/link';
import { AuroraBackground } from "../../components/ui/aurora-background";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  // Initialize Firebase Auth. It's safe to call this multiple times.
  const auth = getAuth(); 

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error on new submission

    // ✅ IMPROVED ERROR HANDLING BLOCK
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err) {
      // The 'err' variable is asserted as a FirebaseError
      const error = err as FirebaseError; 
      
      switch (error.code) {
        case 'auth/invalid-credential':
          setError('Invalid email or password. Please try again.');
          break;
        case 'auth/user-not-found':
          setError('No account found with this email. Please sign up first.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password. Please try again.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email format. Please check your email.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled. Please contact support.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your internet connection.');
          break;
        default:
          setError('An error occurred. Please try again later.');
          console.error('Error signing in:', error);
      }
    }
  };

  const words = [
    {
      text: "Sign In",
    }   
  ];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="min-h-screen flex items-center justify-center">
          <form onSubmit={handleSignIn} className="bg-black p-10 rounded-3xl shadow-md w-full max-w-md">
            <TypewriterEffectSmooth words={words} />
            {error && (
              <div className="mb-4 flex items-center justify-center animate-fade-in">
                <span className="mr-2 text-red-500">&#9888;</span>
                <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-sm text-center border border-red-300 transition-all duration-300">
                  {error}
                </span>
              </div>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="block w-full p-3 mb-4 border rounded-lg text-black"
            />
            <div className="relative mb-4">
              <input
                type={passwordVisible ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="block w-full p-3 border rounded-lg text-black"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {passwordVisible ? '🙈' : '👁️'}
              </button>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
              Sign In
            </button>
            <div className="mt-4 flex justify-between items-center text-white p-2">
              <Link href="/sign-up" className="text-blue-500 hover:underline text-sm mr-4">
                Don&apos;t have an account? Sign Up
              </Link>
              <Link href="/forgot-password" className="text-blue-500 hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </AuroraBackground>
  );
};

export default SignIn;