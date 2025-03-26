
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RarityType } from '@/contexts/CardContext';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

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
  const { theme, accentColor } = useTheme();
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

  const accentColors = {
    purple: 'from-purple-400 via-purple-500 to-purple-600',
    blue: 'from-blue-400 via-blue-500 to-blue-600',
    green: 'from-green-400 via-green-500 to-green-600',
    red: 'from-red-400 via-red-500 to-red-600',
    yellow: 'from-yellow-400 via-yellow-500 to-yellow-600'
  };

  const rarityGradients = {
    legendary: 'before:bg-gradient-to-r before:from-yellow-300 before:via-yellow-400 before:to-yellow-500',
    epic: 'before:bg-gradient-to-r before:from-purple-400 before:via-purple-500 before:to-purple-600',
    rare: 'before:bg-gradient-to-r before:from-blue-400 before:via-blue-500 before:to-blue-600',
    uncommon: 'before:bg-gradient-to-r before:from-green-400 before:via-green-500 before:to-green-600',
    common: 'before:bg-gradient-to-r before:from-gray-400 before:via-gray-500 before:to-gray-600'
  };

  const rarityColors = {
    legendary: 'ring-yellow-400',
    epic: 'ring-purple-400',
    rare: 'ring-blue-400',
    uncommon: 'ring-green-400',
    common: 'ring-gray-400'
  };

  const legendaryClass = rarity === 'legendary' ? 'legendary-glow' : '';
  const rarityGradientClass = rarity ? rarityGradients[rarity] : '';
  const rarityRingClass = rarity ? rarityColors[rarity] : '';
  const darkModeClass = theme === 'dark' ? 'bg-dark-light/90' : 'bg-white/90';
  const cardBgClass = theme === 'dark' ? 'shadow-[0_4px_12px_-2px_rgba(0,0,0,0.3)]' : 'shadow-lg';
  const textClass = theme === 'dark' ? 'text-white' : 'text-gray-800';

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
        'backdrop-blur-xl rounded-xl overflow-hidden card-hover transition-all duration-300',
        'relative before:absolute before:inset-[-2px] before:rounded-[inherit] before:p-[2px] before:z-[-1]',
        'transform hover:scale-[1.02] hover:-translate-y-1',
        'ring-1 ring-white/10',
        rarity && rarityRingClass,
        darkModeClass,
        cardBgClass,
        rarityGradientClass,
        legendaryClass,
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className={`relative z-10 ${textClass}`}>
        {children}
      </div>
      
      {showLikes && (
        <div className={`flex justify-between items-center p-3 border-t ${theme === 'dark' ? 'border-gray-700/30' : 'border-gray-300/30'}`}>
          <button 
            onClick={handleLike}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-colors ${
              userAction === 'like' 
                ? `bg-${accentColor === 'green' ? 'emerald' : accentColor}-500/20 text-${accentColor === 'green' ? 'emerald' : accentColor}-400` 
                : theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-200/50'
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
                : theme === 'dark' ? 'hover:bg-gray-700/30' : 'hover:bg-gray-200/50'
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
