// "use client";

// import React from "react";
// import { useUserContext } from "@/context/UserContext";

// const Dashboard: React.FC = () => {
//   const { user, loading } = useUserContext();

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-2xl">
//         Loading...
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-2xl">
//         Please log in to view your dashboard.
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen  bg-gray-800">
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 mb-6">
//         <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
//           Welcome, {user.firstName}!
//         </h1>
//       </div>
//       <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
//         <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">
//           Your Favorite Recipes
//         </h2>
//         <ul className="space-y-4">
//           {user.favorites && user.favorites.length > 0 ? (
//             user.favorites.map((recipe: any) => (
//               <li
//                 key={recipe.id}
//                 className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
//               >
//                 <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">
//                   {recipe.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-400">
//                   {recipe.description}
//                 </p>
//               </li>
//             ))
//           ) : (
//             <p className="text-lg text-gray-600 dark:text-gray-400">
//               You have no favorite recipes yet.
//             </p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
