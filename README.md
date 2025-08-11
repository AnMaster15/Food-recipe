## FoodMy — Food Recipe & Nutrition (AI)

### Live Demo
- Visit the deployed app: `https://food-recipe-gules.vercel.app`

### Overview
FoodMy is a modern recipe discovery app that combines AI-powered assistance with practical cooking tools. Users can search recipes by ingredients in their pantry, browse by categories and cuisines, view step-by-step instructions, estimate nutrition per serving, save favorites, and use a multi-timer while cooking. An integrated Gemini AI chatbot answers questions about recipes, cooking, and nutrition.

### Features
- **Pantry to Recipe search**: Enter one or more ingredients to find matching recipes using TheMealDB. Results are merged/ranked across ingredients and hydrated with details for richer previews.
- **Recipe discovery & categories**: Explore curated sections and browse by cuisine and dietary preferences.
- **Recipe details**: Ingredients, instructions, image, like/save, and an adjustable per‑serving nutrition estimate computed from parsed ingredients and measures.
- **AI chatbot (Gemini)**: Real-time Q&A for recipes, cooking tips, and nutrition with Markdown rendering.
- **User dashboard & favorites**: Firebase Auth + Firestore to persist liked recipes and manage user profile details.
- **Recipe Timer**: Create multiple timers with audio and browser notifications.
- **Create/Submit recipe**: EmailJS form to submit your own recipes for review.
- **Polished UI**: Next.js App Router, Tailwind CSS, and custom 3D card interactions for engaging visuals.

### Tech Stack
- **Framework**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS
- **Backend-as-a-Service**: Firebase Authentication, Firestore
- **AI**: Google Generative Language API (Gemini)
- **Data Source**: TheMealDB public API
- **Utilities**: EmailJS, React Markdown

### Getting Started
#### Prerequisites
- Node.js LTS (v18+)
- pnpm, npm, or yarn

#### 1) Clone and install
```bash
git clone <your-fork-or-repo-url>
cd Food-recipe
npm install
```

#### 2) Environment variables
Create a `.env.local` file in the project root with the following keys. Values should come from your Firebase project and Google AI Studio.

```bash
# Firebase (used in src/config.ts)
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...

# Google Generative Language API (Gemini)
# Note: key name intentionally matches code usage (double Y)
NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEYY=...
```

TheMealDB is a public API and does not require a key for the endpoints used here.

#### 3) Run the app
```bash
npm run dev
# open http://localhost:3000
```

### Scripts
- `dev`: start the local development server
- `build`: production build
- `start`: run the production server
- `lint`: run linting checks

### Notable Implementation Details
- **Ingredient search**: multi‑ingredient intersection with fallback ranking; details hydration for top results.
- **Nutrition estimates**: derived from a small per‑100g database and unit parsing; recalculates per serving.
- **Favorites**: likes stored under each user in Firestore and rendered on the dashboard.
- **AI assistant**: prompts Gemini for domain‑scoped Q&A and renders Markdown responses.
- **Accessibility/performance**: optimized images with custom loader; responsive layouts; keyboard-friendly inputs.

### Project Structure (high level)
- `src/app` — Next.js routes (home, recipes, categories, chatbot, dashboards)
- `src/components` — UI components (cards, search, timer, builder, etc.)
- `src/context` — auth provider
- `src/utils` — nutrition estimation utilities
- `src/types` — TypeScript types

### Deployment
Deployed on Vercel. Configure environment variables in your Vercel project and connect the repository; push to main to trigger builds.

### Acknowledgments
- Recipes provided by TheMealDB
- Gemini by Google AI for the chatbot

---
Made with ❤️ for food lovers.
