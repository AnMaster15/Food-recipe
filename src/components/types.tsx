'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
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
      apiCategory: 'Vegetarian', 
      icon: <IconBrandApple className="h-4 w-4 text-white" />, 
      imageUrl: '/images/vegetration.jpeg' 
    },
    { 
      title: 'Non-Vegetarian', 
      apiCategory: 'Non-Vegetarian', 
      icon: <IconBone className="h-4 w-4 text-white" />,
      imageUrl: '/images/nonveg.jpg'
    },
    { 
      title: 'Indian', 
      apiCategory: 'Indian', 
      icon: <IconSignature className="h-4 w-4 text-white" />, 
      imageUrl: '/images/indian.jpeg'
    },
    { 
      title: 'French', 
      apiCategory: 'French', 
      icon: <IconBread className="h-4 w-4 text-white" />, 
      imageUrl: '/images/french.jpeg'
    },
    { 
      title: 'More', 
      apiCategory: 'More', 
      icon: <IconArrowBigUp className="h-4 w-4 text-white" />, 
      imageUrl: '/images/more.jpeg'
    },
  ];

  const handleCategoryClick = (category: any) => {
    router.push(`/category/${category.apiCategory}`);
  };

  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {categories.map((category, i) => (
        <BentoGridItem
          key={i}
          title={category.title}
          header={
            <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white">
              <img 
                src={category.imageUrl} 
                alt={category.title} 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          }
          icon={category.icon}
          className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
          onClick={() => handleCategoryClick(category)}
        />
      ))}
    </BentoGrid>
  );
}

export default BentoGridDemo;
