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

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Password reset email sent.');
      setTimeout(() => {
        router.push('/sign-in');
      }, 3000);
    } catch (error) {
      setError('Error sending password reset email');
      console.error('Error sending password reset email:', error);
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
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
