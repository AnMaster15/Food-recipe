# FoodMy - Food Recipe & Nutrition Platform

## Project Overview

**FoodMy** is a modern, full-stack web application that helps users discover, explore, and manage recipes with AI-powered assistance. It combines recipe discovery, nutritional analysis, user personalization, and intelligent cooking tools into a seamless experience.

**Live Demo**: https://food-recipe-gules.vercel.app

---

## Core Features & Functionality

### 1. **Pantry-to-Recipe Search** 🔍
- **What it does**: Users can input ingredients they have at home, and the app finds matching recipes
- **How it works**: 
  - Multi-ingredient search with intelligent intersection logic
  - Queries TheMealDB API for recipes containing specified ingredients
  - Merges and ranks results across multiple ingredients
  - Hydrates top results with detailed recipe information for rich previews
- **Technical highlight**: Implements fallback ranking when exact matches aren't found, ensuring users always get relevant results

### 2. **Recipe Discovery & Browsing** 🍽️
- **Category-based browsing**: Browse recipes by cuisine (Indian, Italian, Chinese, etc.) and meal type (Breakfast, Dessert, Starter, etc.)
- **Dynamic category pages**: Each category dynamically fetches and displays recipes from TheMealDB
- **Recipe cards**: Beautiful, responsive cards with images, hover effects, and quick navigation
- **Random recipe generator**: Discover new recipes with a single click

### 3. **Detailed Recipe View** 📖
- **Complete recipe information**: Ingredients list, step-by-step instructions, high-quality images
- **Google Translate integration**: Built-in translation widget for multilingual recipe access
- **Like/Save functionality**: Users can save favorite recipes to their personal dashboard
- **Responsive design**: Optimized for desktop, tablet, and mobile devices

### 4. **AI-Powered Nutrition Calculator** 🥗
- **Automatic nutrition estimation**: Calculates nutritional values based on recipe ingredients
- **Per-serving calculations**: Adjustable serving size with dynamic recalculation
- **Comprehensive metrics**: Calories, protein, carbs, fat, fiber, sugar, sodium, cholesterol
- **How it works**:
  - Parses ingredient names and measurements from recipe data
  - Uses a custom nutrition database with 40+ common ingredients
  - Converts various units (cups, tablespoons, grams, etc.) to standardized grams
  - Handles fractions (½, ¼, etc.) and complex measurements
  - Scales nutrition values based on user-specified servings
- **Technical highlight**: Sophisticated unit parsing and conversion system handles edge cases like "1 1/2 cups", "2 tbsp", "3 cloves", etc.

### 5. **AI Chatbot Assistant** 🤖
- **Powered by Google Gemini**: Real-time Q&A using Gemini Pro API
- **Domain-specific knowledge**: Specialized in recipes, cooking tips, and nutrition
- **Markdown rendering**: Beautifully formatted responses with React Markdown
- **Context-aware**: Understands FoodMy-specific features and guides users
- **Error handling**: Graceful fallbacks and user-friendly error messages

### 6. **User Authentication & Dashboard** 👤
- **Firebase Authentication**: Secure sign-up, sign-in, and password recovery
- **User profiles**: Store and edit personal information (name, age, gender, contact)
- **Favorites management**: 
  - Save liked recipes to Firestore
  - View all favorites in personalized dashboard
  - Remove favorites with one click
- **Persistent storage**: All user data stored in Firebase Firestore with proper security rules

### 7. **Multi-Timer Cooking Tool** ⏱️
- **Multiple simultaneous timers**: Create and manage multiple timers for different cooking tasks
- **Audio notifications**: Browser notifications and sound alerts when timers complete
- **Visual feedback**: Real-time countdown display with progress indicators
- **Practical use case**: Perfect for complex recipes requiring multiple timed steps

### 8. **Recipe Submission System** 📝
- **User-generated content**: Form-based recipe submission
- **EmailJS integration**: Submissions sent via email for review
- **Dynamic form fields**: Add/remove ingredients and steps dynamically
- **Category tagging**: Tag recipes by cuisine and dietary preferences
- **File upload support**: Image upload for recipe photos

### 9. **Advanced Search & Filtering** 🔎
- **Multi-criteria search**: Search by name, category, cuisine, difficulty
- **Dietary filters**: Vegetarian, Vegan, Gluten-Free, Dairy-Free, Low-Carb, High-Protein
- **Time-based filtering**: Filter by maximum cooking time
- **Expandable filters**: Clean UI with collapsible advanced options

### 10. **Modern UI/UX** 🎨
- **Gradient designs**: Beautiful gradient backgrounds and text effects
- **3D card interactions**: Custom 3D card components with hover effects
- **Smooth animations**: Framer Motion for fluid transitions
- **Responsive layout**: Mobile-first design with Tailwind CSS
- **Dark theme**: Modern dark color scheme with glassmorphism effects
- **Image optimization**: Custom Next.js image loader for performance

---

## Technical Stack

### Frontend
- **Framework**: Next.js 14 (App Router) with TypeScript
- **UI Library**: React 18
- **Styling**: Tailwind CSS with custom gradients and animations
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: React Icons, Tabler Icons

### Backend & Services
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore (NoSQL)
- **AI**: Google Generative AI (Gemini Pro)
- **External APIs**: 
  - TheMealDB (recipe data)
  - Google Translate API
- **Email**: EmailJS

### Development Tools
- **Language**: TypeScript
- **Package Manager**: npm/pnpm/yarn
- **Deployment**: Vercel
- **Version Control**: Git

---

## Architecture & Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── recipes/[id]/      # Dynamic recipe detail pages
│   ├── category/[category]/ # Dynamic category pages
│   ├── chatbot/           # AI assistant page
│   ├── dashboards/        # User dashboard
│   ├── sign-in/           # Authentication pages
│   ├── sign-up/
│   └── makerecepie/      # Recipe submission
├── components/            # Reusable React components
│   ├── RecipeSearch.tsx  # Advanced search component
│   ├── Dashboard.tsx     # User dashboard
│   ├── CreateRecipe.tsx  # Recipe submission form
│   └── ui/               # Custom UI components (3D cards, etc.)
├── context/              # React Context providers
│   └── AuthContext.tsx   # Authentication state management
├── hooks/                # Custom React hooks
│   ├── useAuthRedirect.ts
│   └── useImageLoader.ts
├── utils/                # Utility functions
│   └── nutrition.ts      # Nutrition calculation logic
├── types/                # TypeScript type definitions
│   └── recipe.ts
├── config.ts             # Firebase configuration
└── firebase.ts           # Firebase initialization
```

---

## Key Technical Implementations

### 1. **Nutrition Calculation Algorithm**
- **Challenge**: Convert diverse ingredient measurements to standardized nutrition values
- **Solution**: 
  - Custom parser handles fractions, units (cups, tbsp, tsp, grams, etc.)
  - Nutrition database with keyword matching for ingredient identification
  - Unit conversion system (cups → grams, tablespoons → grams, etc.)
  - Per-serving scaling based on user input
- **Complexity**: Handles edge cases like "1 1/2 cups flour", "3 cloves garlic", "2 tbsp olive oil"

### 2. **Multi-Ingredient Recipe Search**
- **Challenge**: Find recipes matching multiple ingredients efficiently
- **Solution**:
  - Parallel API calls for each ingredient
  - Set intersection to find common recipes
  - Fallback ranking when no exact matches
  - Result hydration with detailed recipe data

### 3. **Firebase Integration**
- **Authentication**: Email/password with password recovery
- **Firestore Structure**:
  ```
  users/
    {userId}/
      - userDetails (firstName, lastName, age, etc.)
      likedRecipes/
        {recipeId}/
          - recipeId, recipeName, recipeUrl
  ```
- **Real-time updates**: Auth state listeners for instant UI updates

### 4. **AI Chatbot Implementation**
- **Prompt engineering**: Domain-specific prompts to keep responses focused
- **Error handling**: Graceful degradation on API failures
- **Markdown rendering**: React Markdown for formatted responses
- **Rate limiting**: Client-side handling to prevent abuse

### 5. **Image Optimization**
- **Custom loader**: Handles external images from TheMealDB
- **Next.js Image**: Automatic optimization and lazy loading
- **Fallback images**: Default images for missing recipe photos

### 6. **State Management**
- **React Context**: Global auth state
- **Local state**: Component-level state for UI interactions
- **Firebase listeners**: Real-time data synchronization

---

## Interview Talking Points

### Problem-Solving Examples

1. **"How did you handle unit conversion for nutrition calculations?"**
   - Built a comprehensive parser that handles fractions, multiple unit types, and edge cases
   - Created a conversion system mapping common cooking units to grams
   - Implemented fallback values for unknown ingredients

2. **"How did you optimize API calls for multi-ingredient search?"**
   - Used Promise.all() for parallel requests
   - Implemented result caching and deduplication
   - Added loading states and error boundaries

3. **"How did you ensure good user experience?"**
   - Responsive design for all screen sizes
   - Loading states and skeleton screens
   - Error handling with user-friendly messages
   - Optimistic UI updates for favorites

### Technical Decisions

1. **Why Next.js App Router?**
   - Server-side rendering for better SEO
   - Built-in routing and API routes
   - Image optimization out of the box
   - TypeScript support

2. **Why Firebase?**
   - Rapid development with authentication and database
   - Real-time updates
   - Scalable infrastructure
   - Free tier for development

3. **Why Gemini AI?**
   - Powerful language model
   - Easy API integration
   - Good performance for Q&A tasks
   - Cost-effective for this use case

### Challenges Overcome

1. **Nutrition Calculation Accuracy**
   - Challenge: Converting diverse measurements to accurate nutrition values
   - Solution: Built comprehensive unit parser and nutrition database
   - Result: Reasonable estimates that scale correctly with servings

2. **External API Integration**
   - Challenge: TheMealDB API rate limits and inconsistent data
   - Solution: Error handling, fallback images, data validation
   - Result: Robust application that handles API failures gracefully

3. **State Management Complexity**
   - Challenge: Managing auth state, favorites, and UI state
   - Solution: Context API for global state, local state for UI
   - Result: Clean separation of concerns

---

## Performance Optimizations

1. **Image Optimization**: Next.js Image component with custom loader
2. **Code Splitting**: Dynamic imports for heavy components
3. **Memoization**: useMemo for expensive calculations (nutrition)
4. **Lazy Loading**: Images and components loaded on demand
5. **API Caching**: Client-side caching of recipe data

---

## Security Considerations

1. **Firebase Security Rules**: Proper Firestore rules for user data
2. **Environment Variables**: API keys stored securely
3. **Input Validation**: Form validation on client and server
4. **Authentication**: Secure Firebase Auth implementation
5. **XSS Prevention**: React's built-in XSS protection

---

## Future Enhancements (Discussion Points)

1. **Recipe Recommendations**: ML-based personalized recommendations
2. **Meal Planning**: Weekly meal planner with shopping lists
3. **Social Features**: Share recipes, follow users, comments
4. **Nutrition Goals**: Track daily nutrition, set goals
5. **Offline Support**: PWA with offline recipe access
6. **Recipe Scaling**: Automatic ingredient scaling for different serving sizes
7. **Video Integration**: Embed cooking videos in recipe pages

---

## Key Metrics & Achievements

- **Full-stack application** with authentication, database, and AI integration
- **Responsive design** working across all devices
- **Performance**: Fast load times with optimized images and code splitting
- **User experience**: Intuitive navigation and smooth interactions
- **Code quality**: TypeScript for type safety, organized component structure

---

## Deployment

- **Platform**: Vercel
- **CI/CD**: Automatic deployments on git push
- **Environment Variables**: Configured in Vercel dashboard
- **Domain**: Custom domain support
- **Monitoring**: Built-in Vercel analytics

---

## Learning Outcomes

1. **Full-stack development** with Next.js and Firebase
2. **API integration** with multiple external services
3. **State management** with React Context and hooks
4. **TypeScript** for type-safe development
5. **UI/UX design** with modern CSS and animations
6. **AI integration** with Google Gemini
7. **Authentication flows** and security best practices
8. **Performance optimization** techniques

---

This project demonstrates proficiency in modern web development, API integration, state management, and creating user-friendly applications with complex features.


