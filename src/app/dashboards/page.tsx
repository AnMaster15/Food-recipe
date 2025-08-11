'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link'; // ✅ 1. Import ImageLoaderProps
import firebase from '../../firebase'; // Adjust the path as per your Firebase setup

// ✅ 2. Define the custom loader function
const imageLoader = ({ src }: ImageLoaderProps) => {
  return src;
};

const Dashboard = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<any[]>([]);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    mobileNo: ''
  });
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const fetchLikedRecipes = useCallback(async (userId: string) => {
    try {
      const db = firebase.firestore();
      const likedRecipesRef = db.collection('users').doc(userId).collection('likedRecipes');
      const snapshot = await likedRecipesRef.get();

      if (!snapshot.empty) {
        const recipes = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setLikedRecipes(recipes);
      } else {
        setLikedRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching liked recipes:', error);
    }
  }, []);

  const fetchUserDetails = useCallback(async (userId: string) => {
    try {
      const db = firebase.firestore();
      const doc = await db.collection('users').doc(userId).get();
      if (doc.exists) {
        setUserDetails(doc.data() as typeof userDetails);
        setDetailsSubmitted(true);
        fetchLikedRecipes(userId);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }, [fetchLikedRecipes]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserDetails(user.uid);
      } else {
        setUser(null);
        setLikedRecipes([]);
      }
    });

    return () => unsubscribe();
  }, [fetchUserDetails]);

  const handleDetailsSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user) return;

    try {
      const db = firebase.firestore();
      await db.collection('users').doc(user.uid).set(userDetails);
      setDetailsSubmitted(true);
      setEditing(false);
      fetchLikedRecipes(user.uid);
    } catch (error) {
      console.error('Error saving user details:', error);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleRecipeClick = (id: string) => {
    router.push(`/recipes/${id}`); // Corrected path based on previous fixes
  };

  const handleRecipeDelete = async (recipeId: string) => {
    try {
      const db = firebase.firestore();
      if (user) {
        await db.collection('users').doc(user.uid).collection('likedRecipes').doc(recipeId).delete();
        setLikedRecipes((prevState) => prevState.filter((recipe) => recipe.id !== recipeId));
      }
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
        <span className="text-white text-lg">Loading...</span>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <button onClick={() => router.push('/')} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-75 transition duration-200 group-hover:opacity-100" />
          <div className="relative px-8 py-2 bg-black rounded-lg text-white transition duration-200 group-hover:bg-transparent">
            Back to Home
          </div>
        </button>
      </div>
      {!detailsSubmitted || editing ? (
        <form onSubmit={handleDetailsSubmit} className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            {editing ? 'Edit Your Details' : 'Enter Your Details'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              required
            />
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              required
            />
            <input
              type="number"
              name="age"
              value={userDetails.age}
              onChange={handleChange}
              placeholder="Age"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              required
            />
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none appearance-none bg-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">👨 Male</option>
              <option value="female">👩 Female</option>
              <option value="other">⚧ Other</option>
            </select>
            <input
              type="text"
              name="mobileNo"
              value={userDetails.mobileNo}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="w-full p-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 outline-none"
              required
            />
          </div>
          <button 
            type="submit" 
            className="mt-6 w-full md:w-auto bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-purple-300"
          >
            {editing ? '💾 Save Changes' : '✨ Save Details'}
          </button>
        </form>
      ) : (
        <div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="space-y-4 flex-1">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent mb-6">User Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                    <p className="text-sm text-gray-500 mb-1">First Name</p>
                    <p className="font-medium text-gray-900">{userDetails.firstName}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                    <p className="text-sm text-gray-500 mb-1">Last Name</p>
                    <p className="font-medium text-gray-900">{userDetails.lastName}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                    <p className="text-sm text-gray-500 mb-1">Age</p>
                    <p className="font-medium text-gray-900">{userDetails.age}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50/50 backdrop-blur-sm">
                    <p className="text-sm text-gray-500 mb-1">Gender</p>
                    <p className="font-medium text-gray-900">{userDetails.gender}</p>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50/50 backdrop-blur-sm md:col-span-2">
                    <p className="text-sm text-gray-500 mb-1">Mobile Number</p>
                    <p className="font-medium text-gray-900">{userDetails.mobileNo}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setEditing(true)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-amber-300 flex items-center gap-2"
              >
                <span>✏️</span>
                Edit Profile
              </button>
            </div>
          </div>
          <h2 className="text-3xl font-bold mt-12 mb-8 bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">Favorite Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedRecipes.map((recipe) => (
              <div key={recipe.id} className="group bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-100 flex flex-col justify-between transform transition-all duration-300 hover:-translate-y-2">
                <div>
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <Image
                      loader={imageLoader}
                      src={recipe.recipeUrl}
                      alt={recipe.recipeName}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                      onClick={() => handleRecipeClick(recipe.recipeId)}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">{recipe.recipeName}</h3>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleRecipeClick(recipe.recipeId)}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1"
                  >
                    <span>View Recipe</span>
                    <span>→</span>
                  </button>
                  <button
                    onClick={() => handleRecipeDelete(recipe.id)}
                    className="text-red-500 hover:text-red-600 transition-colors duration-200"
                    title="Remove from favorites"
                  >
                    ♥
                  </button>
                </div>
              </div>
            ))}
            {likedRecipes.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-4xl">🍽️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Favorite Recipes Yet</h3>
                <p className="text-gray-500 mb-6">Start exploring recipes and add them to your favorites!</p>
                <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2">
                  <span>Browse Recipes</span>
                  <span>→</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;