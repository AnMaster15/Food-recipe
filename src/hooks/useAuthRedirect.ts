// src/hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useAuthRedirect = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/sign-in');
      }
    });

    return () => unsubscribe();
  }, [auth, router]);
};

export default useAuthRedirect;
