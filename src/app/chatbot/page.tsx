'use client'
import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link'; // Import Link from Next.js


const ChatbotAccessPage = () => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [generatingAnswer, setGeneratingAnswer] = useState(false);

    async function generateAnswer(e: React.FormEvent<HTMLFormElement>) {
        setGeneratingAnswer(true);
        e.preventDefault();
        setAnswer("Loading your answer... \n It might take up to 10 seconds");

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.NEXT_PUBLIC_GOOGLE_AI_STUDIO_API_KEYY}`,
                method: "post",
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `You are a knowledgeable assistant specialized in providing information about FoodMy, recipes, and nutrients in food. You should only respond to questions that are directly related to these topics. If a question is unrelated, politely inform the user that you can only answer questions about FoodMy, recipes, and nutrients in food. Here are some sample questions and answers to guide your responses:

1. **What is FoodMy?**
   - FoodMy is a web application dedicated to providing delicious recipes and nutritional information to help you make healthy and tasty meals.

2. **How can I find a recipe for spaghetti?**
   - You can find a recipe for spaghetti by searching for 'spaghetti' in the recipes section of the FoodMy website.

3. **What nutrients are found in chicken?**
   - Chicken is a good source of protein, vitamin B6, niacin, selenium, and phosphorus.

4. **How do I sign up for FoodMy?**
   - To sign up for FoodMy, click on the 'Sign Up' button in the top navigation bar and follow the instructions to create an account.

5. **What is the recipe for chicken curry?**
   - To make chicken curry, you will need chicken, curry powder, onions, garlic, ginger, tomatoes, and coconut milk. Detailed steps can be found in the recipe section.

6. **How many calories are in a serving of spaghetti bolognese?**
   - A typical serving of spaghetti bolognese contains around 350-400 calories, depending on the ingredients used.

7. **What are some healthy recipes on FoodMy?**
   - Some healthy recipes on FoodMy include quinoa salad, grilled chicken with vegetables, and avocado toast.

8. **Can I submit my own recipes to FoodMy?**
   - Currently, FoodMy does not support user-submitted recipes, but we are working on adding this feature in the future.

9. **What is a good source of vitamin C?**
   - Citrus fruits like oranges, lemons, and grapefruits are excellent sources of vitamin C.

10. **How can I find low-carb recipes?**
    - You can find low-carb recipes by using the search function and filtering results based on nutritional content.

11. **What are the benefits of eating whole grains?**
    - Whole grains are rich in fiber, vitamins, and minerals. They can help with digestion, reduce the risk of chronic diseases, and keep you full longer.

12. **Does FoodMy offer vegan recipes?**
    - Yes, FoodMy offers a variety of vegan recipes. You can find them by searching for 'vegan' in the recipes section.

13. **What is the best way to store fresh herbs?**
    - Fresh herbs should be stored in the refrigerator, either wrapped in a damp paper towel or placed in a glass of water with the stems submerged.

14. **How do I make a smoothie?**
    - To make a smoothie, blend together fruits like bananas, berries, and a liquid base such as milk or juice. You can also add yogurt or protein powder for extra nutrition.

15. **What is the nutritional value of kale?**
    - Kale is a nutrient-dense leafy green that is high in vitamins A, C, and K, as well as calcium and antioxidants.

Please respond accurately and concisely to questions related to these topics. If the question is unrelated, respond with: "I'm sorry, I can only provide information about FoodMy, recipes, and nutrients in food." \n\nQuestion: ${question}`
                                }
                            ]
                        }
                    ]
                }
            });

            setAnswer(response.data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.log(error);
            setAnswer("Sorry - Something went wrong. Please try again!");
        }

        setGeneratingAnswer(false);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black-100 to-black-300 p-4">
            <div className="bg-white shadow-2xl rounded-lg w-full max-w-3xl p-8 mx-auto">
                <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-indigo-600">
                    Discover Delicious Recipes
                </h2>
                <form onSubmit={generateAnswer} className="space-y-4">
                    <textarea
                        required
                        className="border border-gray-300 rounded w-full p-3 transition-all duration-300 focus:border-indigo-500 focus:shadow-lg text-gray-800"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Ask anything..."
                    ></textarea>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-md bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-all duration-300 ${generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={generatingAnswer}
                    >
                        Generate Answer
                    </button>
                </form>
                <div className="mt-6">
                    <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
                        <ReactMarkdown className="text-gray-800">{answer}</ReactMarkdown>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Link href="/">
                        <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-all duration-300">
                            Go Back Home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ChatbotAccessPage;
