
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

  return (
    <div 
      onClick={onClick}
      className={cn(
        'glass-card rounded-xl overflow-hidden card-hover transition-all duration-300',
        rarityClass,
        legendaryClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
