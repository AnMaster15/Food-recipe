// app/forgot-password/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { AuroraBackground } from "../../components/ui/aurora-background";
import { motion } from "framer-motion";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const auth = getAuth();

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent! Check your inbox.');
      setTimeout(() => router.push('/sign-in'), 2000);
    } catch (err) {
      const error = err as import('firebase/app').FirebaseError;
      switch (error.code) {
        case 'auth/invalid-email':
          setError('Invalid email format.');
          break;
        case 'auth/user-not-found':
          setError('No user found with this email.');
          break;
        case 'auth/network-request-failed':
          setError('Network error. Please check your connection.');
          break;
        default:
          setError('Error sending password reset email. Please try again later.');
          console.error('Error sending password reset email:', error);
      }
    }
  };
  const words = [
    {
      text: "Forgot Password",
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
      className="relative flex flex-col gap-4 items-center justify-center px-4  "
    >
    <div className="min-h-screen flex items-center justify-center bg-black-100">
      <form onSubmit={handleForgotPassword} className="bg-black p-10 rounded-3xl shadow-md w-full">
        <TypewriterEffectSmooth words={words} />
        {error && (
          <div className="mb-4 flex items-center justify-center animate-fade-in">
            <span className="mr-2 text-red-500">&#9888;</span>
            <span className="bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-sm text-center border border-red-300 transition-all duration-300">
              {error}
            </span>
          </div>
        )}
        {message && (
          <div className="mb-4 flex items-center justify-center animate-fade-in">
            <span className="mr-2 text-green-500">&#10003;</span>
            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-sm text-center border border-green-300 transition-all duration-300">
              {message}
            </span>
          </div>
        )}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="block w-full p-2 mb-4 border rounded text-black"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
    </motion.div>
    </AuroraBackground>
  );
};

export default ForgotPassword;
