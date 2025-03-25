
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RarityType } from '@/contexts/CardContext';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  rarity?: RarityType;
  onClick?: () => void;
  showLikes?: boolean;
}

const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  rarity,
  onClick,
  showLikes = false
}) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

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

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userAction === 'like') {
      setLikes(likes - 1);
      setUserAction(null);
    } else {
      if (userAction === 'dislike') {
        setDislikes(dislikes - 1);
      }
      setLikes(likes + 1);
      setUserAction('like');
    }
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userAction === 'dislike') {
      setDislikes(dislikes - 1);
      setUserAction(null);
    } else {
      if (userAction === 'like') {
        setLikes(likes - 1);
      }
      setDislikes(dislikes + 1);
      setUserAction('dislike');
    }
  };

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
      
      {showLikes && (
        <div className="flex justify-between items-center p-3 border-t border-gray-700/30">
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              userAction === 'like' 
                ? 'bg-green-500/20 text-green-400' 
                : 'hover:bg-gray-700/30'
            }`}
          >
            <ThumbsUp size={16} />
            <span>{likes}</span>
          </button>
          
          <button 
            onClick={handleDislike}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              userAction === 'dislike' 
                ? 'bg-red-500/20 text-red-400' 
                : 'hover:bg-gray-700/30'
            }`}
          >
            <ThumbsDown size={16} />
            <span>{dislikes}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
