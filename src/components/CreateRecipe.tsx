'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import emailjs from 'emailjs-com';

const CreateRecipe = () => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [steps, setSteps] = useState<string[]>(['']);
  const [category, setCategory] = useState<string>('Veg');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    title: '',
    description: '',
    tag: '',
    servings: ''
  });

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index: number, value: string) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const addIngredient = () => setIngredients([...ingredients, '']);
  const addStep = () => setSteps([...steps, '']);
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index));
  const removeStep = (index: number) => setSteps(steps.filter((_, i) => i !== index));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      ...formData,
      ingredients: ingredients.join(', '),
      steps: steps.join(', '),
      category
    };

    emailjs.send('service_oh4p7zb', 'template_7qwk4zp', templateParams, 'n7H0hGleTBObEnoA5')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Recipe submitted successfully!');
        setFormData({
          name: '',
          email: '',
          photo: '',
          title: '',
          description: '',
          tag: '',
          servings: ''
        });
        setIngredients(['']);
        setSteps(['']);
        setCategory('Veg');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Failed to submit the recipe.');
      });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      photo: '',
      title: '',
      description: '',
      tag: '',
      servings: ''
    });
    setIngredients(['']);
    setSteps(['']);
    setCategory('Veg');
  };

  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto my-5 p-8 bg-white shadow-md rounded-lg">
      <div className="flex justify-end mb-6">
        <button onClick={() => router.push('/')} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg opacity-75 transition duration-200 group-hover:opacity-100" />
          <div className="relative px-8 py-2 bg-black rounded-lg text-white transition duration-200 group-hover:bg-transparent">
            Back to Home
          </div>
        </button>
      </div>
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Create Your Recipe</h1>
      <p className="text-lg mb-6 text-gray-600">Create and share your best recipes</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="border rounded-lg p-2 w-full text-gray-800"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="border rounded-lg p-2 w-full text-gray-800"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Photo (png, jpeg only)</label>
          <input
            type="file"
            accept="image/png, image/jpeg"
            className="border rounded-lg p-2 w-full text-gray-800"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const syntheticEvent = {
                  target: {
                    name: 'photo',
                    value: file.name
                  }
                };
                handleChange(syntheticEvent as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>);
              }
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Recipe Title</label>
          <input
            type="text"
            name="title"
            placeholder="Enter the title"
            className="border rounded-lg p-2 w-full text-gray-800"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Description</label>
          <textarea
            name="description"
            placeholder="Description..."
            className="border rounded-lg p-2 w-full text-gray-800"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Ingredients</label>
          <p className="text-sm mb-2 text-gray-500">Enter one ingredient per line. Include the quantity (i.e., cups, tablespoons) and any special preparation (i.e., sifted, softened, chopped). Use optional headers to organize the different parts of the recipe (i.e., Cake, Frosting, Dressing).</p>
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e.target.value)}
                className="border rounded-lg p-2 w-full text-gray-800"
                placeholder={`e.g. ${index + 1} cup sugar`}
              />
              <button
                type="button"
                className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => removeIngredient(index)}
              >❌</button>
            </div>
          ))}
          <button
            type="button"
            className="border rounded-lg p-2 w-full mt-2 bg-green-500 text-white hover:bg-green-600 transition duration-200"
            onClick={addIngredient}
          >Add ingredient</button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Directions</label>
          <p className="text-sm mb-2 text-gray-500">Explain how to make your recipe, including oven temperatures, baking or cooking times, and pan sizes, etc. Use optional headers to organize the different parts of the recipe (i.e., Prep, Bake, Decorate).</p>
          {steps.map((step, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                className="border rounded-lg p-2 w-full text-gray-800"
                placeholder={`e.g. Preheat oven to 350 degrees F...`}
              />
              <button
                type="button"
                className="ml-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200"
                onClick={() => removeStep(index)}
              >❌</button>
            </div>
          ))}
          <button
            type="button"
            className="border rounded-lg p-2 w-full mt-2 bg-green-500 text-white hover:bg-green-600 transition duration-200"
            onClick={addStep}
          >Add step</button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-700">Tag (Indian, Italian, French)</label>
          <input
            type="text"
            name="tag"
            placeholder="tag"
            className="border rounded-lg p-2 w-full text-gray-800"
            value={formData.tag}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Servings</label>
            <input
              type="text"
              name="servings"
              placeholder="8"
              className="border rounded-lg p-2 w-full text-gray-800"
              value={formData.servings}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg p-2 w-full text-gray-800"
            >
              <option value="Veg">Veg 🌱</option>
              <option value="Non-Veg">Non-Veg 🍗</option>
            </select>
          </div>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            className="border rounded-lg p-2 w-32 bg-gray-200 text-gray-800 hover:bg-gray-300 transition duration-200"
            onClick={handleCancel}
          >Cancel</button>
          <button
            type="submit"
            className="border rounded-lg p-2 w-32 bg-green-500 text-white hover:bg-green-600 transition duration-200"
          >Submit for Review</button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
