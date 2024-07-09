'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import firebase from '../../firebase'; // Adjust the path as per your Firebase setup

const Dashboard = () => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [likedRecipes, setLikedRecipes] = useState<any[]>([]); // Adjust the type as per your Firestore structure
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
  }, []);

  const fetchUserDetails = async (userId: string) => {
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
  };

  const fetchLikedRecipes = async (userId: string) => {
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
  };

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
    router.push(`/recipes/${id}`);
  };

  const handleRecipeDelete = async (recipeId: string) => {
    try {
      const db = firebase.firestore();
      await db.collection('users').doc(user.uid).collection('likedRecipes').doc(recipeId).delete();
      setLikedRecipes((prevState) => prevState.filter((recipe) => recipe.id !== recipeId));
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  if (!user) {
    return <p>Loading...</p>; // Add loading indicator or redirect if not logged in
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
        <form onSubmit={handleDetailsSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">{editing ? 'Edit Your Details' : 'Enter Your Details'}</h2>
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="firstName"
              value={userDetails.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="text"
              name="lastName"
              value={userDetails.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <input
              type="number"
              name="age"
              value={userDetails.age}
              onChange={handleChange}
              placeholder="Age"
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
            <select
              name="gender"
              value={userDetails.gender}
              onChange={handleChange}
              className="p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male 🚹</option>
              <option value="female">Female 🚺</option>
              <option value="other">Other ⚧</option>
            </select>
            <input
              type="text"
              name="mobileNo"
              value={userDetails.mobileNo}
              onChange={handleChange}
              placeholder="Mobile Number"
              className="p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            {editing ? 'Save Changes' : 'Save Details'}
          </button>
        </form>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-4">User Details</h2>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <p><strong>First Name:</strong> {userDetails.firstName}</p>
            <p><strong>Last Name:</strong> {userDetails.lastName}</p>
            <p><strong>Age:</strong> {userDetails.age}</p>
            <p><strong>Gender:</strong> {userDetails.gender}</p>
            <p><strong>Mobile Number:</strong> {userDetails.mobileNo}</p>
            <button
              onClick={() => setEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Edit Details
            </button>
          </div>
          <h2 className="text-2xl font-bold mt-6 mb-4">Liked Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-10">
            {likedRecipes.map((recipe) => (
              <div key={recipe.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                <Image
                  src={recipe.recipeUrl}
                  alt={recipe.recipeName}
                  width={400}
                  height={200}
                  className="rounded cursor-pointer"
                  onClick={() => handleRecipeClick(recipe.recipeId)}
                />
                <h3 className="text-xl font-bold mt-2">{recipe.recipeName}</h3>
                <button
                  onClick={() => handleRecipeDelete(recipe.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
