
import React from 'react';
import { cn } from '@/lib/utils';
import { RarityType } from '@/contexts/CardContext';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  rarity?: RarityType;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  rarity,
  onClick 
}) => {
  const rarityClass = rarity ? `rarity-border-${rarity}` : '';
  const legendaryClass = rarity === 'legendary' ? 'legendary-glow' : '';
  const rarityGradients = {
    legendary: 'before:bg-gradient-to-r before:from-yellow-300 before:via-yellow-400 before:to-yellow-500',
    epic: 'before:bg-gradient-to-r before:from-purple-400 before:via-purple-500 before:to-purple-600',
    rare: 'before:bg-gradient-to-r before:from-blue-400 before:via-blue-500 before:to-blue-600',
    uncommon: 'before:bg-gradient-to-r before:from-green-400 before:via-green-500 before:to-green-600',
    common: 'before:bg-gradient-to-r before:from-gray-400 before:via-gray-500 before:to-gray-600'
  };

  const rarityGradientClass = rarity ? rarityGradients[rarity] : '';

  return (
    <div 
      onClick={onClick}
      className={cn(
        'glass-card rounded-xl overflow-hidden card-hover transition-all duration-300',
        'relative before:absolute before:inset-[-2px] before:rounded-[inherit] before:p-[2px] before:z-[-1]',
        rarityGradientClass,
        legendaryClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;
