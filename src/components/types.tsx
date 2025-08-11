'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { OptimizedImage } from './ui/optimized-image';
import {
  IconBrandApple,
  IconBone,
  IconSignature,
  IconBread,
  IconArrowBigUp,
} from '@tabler/icons-react';

export function BentoGridDemo() {
  const router = useRouter();
  
  const categories = [
    {
      title: 'Vegetarian',
      description: 'Fresh plant-based recipes',
      apiCategory: 'Vegetarian',
      icon: <IconBrandApple className="text-emerald-400 w-5 h-5" />,
      imageUrl: '/images/vegetration.jpeg',
      color: 'from-emerald-500/20 to-emerald-600/40',
      bgColor: 'bg-emerald-500/10'
    },
    {
      title: 'Non-Vegetarian',
      description: 'Protein-rich meat dishes',
      apiCategory: 'Non-Vegetarian',
      icon: <IconBone className="text-red-400 w-5 h-5" />,
      imageUrl: '/images/nonveg.jpg',
      color: 'from-red-500/20 to-red-600/40',
      bgColor: 'bg-red-500/10'
    },
    {
      title: 'Indian',
      description: 'Spices and traditional flavors',
      apiCategory: 'Indian',
      icon: <IconSignature className="text-orange-400 w-5 h-5" />,
      imageUrl: '/images/indian.jpeg',
      color: 'from-orange-500/20 to-orange-600/40',
      bgColor: 'bg-orange-500/10'
    },
    {
      title: 'French',
      description: 'Elegant culinary artistry',
      apiCategory: 'French',
      icon: <IconBread className="text-blue-400 w-5 h-5" />,
      imageUrl: '/images/french.jpeg',
      color: 'from-blue-500/20 to-blue-600/40',
      bgColor: 'bg-blue-500/10'
    },
    {
      title: 'More',
      description: 'Explore diverse cuisines',
      apiCategory: 'More',
      icon: <IconArrowBigUp className="text-purple-400 w-5 h-5" />,
      imageUrl: '/images/more.jpeg',
      color: 'from-purple-500/20 to-purple-600/40',
      bgColor: 'bg-purple-500/10'
    },
  ];

  const handleCategoryClick = (category: any) => {
    router.push(`/category/${category.apiCategory}`);
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-3xl border border-white/10 p-8 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">Explore Cuisines</h2>
        <p className="text-gray-300">Discover recipes from around the world</p>
      </div>
      
      <BentoGrid className="max-w-5xl mx-auto">
        {categories.map((category, i) => {
          const isMoreCard = i === 4; // "More" card is at index 4
          
          return (
            <BentoGridItem
              key={i}
              title={category.title}
              description={category.description}
              header={
                <div className={`relative flex flex-1 w-full ${isMoreCard ? 'h-48 md:h-64' : 'h-40 md:h-48'} rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:scale-[1.02]`}>
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${category.imageUrl})` }}
                  />
                  
                  {/* Strong overlay for text visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  
                  {/* Icon positioned at top-right with improved visibility */}
                  <div className="absolute top-3 right-3 p-2 bg-black/80 backdrop-blur-sm rounded-full border border-white/40 shadow-xl">
                    {category.icon}
                  </div>
                  
                  {/* Category info overlay with strong text visibility */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-2xl">{category.title}</h3>
                    <p className="text-sm text-white font-medium drop-shadow-2xl">{category.description}</p>
                  </div>
                </div>
              }
              icon={null}
              className={`${isMoreCard ? 'md:col-span-2' : ''} hover:shadow-xl hover:shadow-neutral-500/20 transition-all duration-300`}
              onClick={() => handleCategoryClick(category)}
            />
          );
        })}
      </BentoGrid>
    </div>
  );
}

export default BentoGridDemo;