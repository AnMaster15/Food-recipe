// app/sign-in/page.tsx

'use client';

import { useRouter } from 'next/navigation';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
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
  const auth = getAuth();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (error) {
      setError('Error signing in');
      console.error('Error signing in:', error);
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
      className="relative flex flex-col gap-4 items-center justify-center px-4  "
    >
    <div className="min-h-screen flex items-center justify-center bg-black-100">
      <form onSubmit={handleSignIn} className="bg-black p-10 rounded-3xl shadow-md w-full max-w-md">
        <TypewriterEffectSmooth words={words} />
        {error && <p className="text-red-500 mb-4 ">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="block w-full p-2 mb-4 border rounded text-black"
        />
        <div className="relative mb-4">
          <input
            type={passwordVisible ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="block w-full p-2 border rounded text-black"
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute inset-y-0 right-0 px-3 flex items-center"
          >
            {passwordVisible ? '🙈' : '👁️'}
          </button>
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
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
