
import React, { useState } from 'react';
import Card from '@/components/ui/card-custom';
import Button from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/Modal';
import { useCardContext } from '@/contexts/CardContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Loader, ChevronLeft, Star } from 'lucide-react';

const Index = () => {
  const { cards, convertToNFT } = useCardContext();
  const { theme, language } = useTheme();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const selectedCardData = cards.find(card => card.id === selectedCard);

  const handleConvertToNFT = () => {
    if (selectedCard) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        convertToNFT(selectedCard);
        setIsLoading(false);
        setShowDetails(false);
        setSelectedCard(null);
      }, 2000);
    }
  };

  const titles = {
    ru: {
      pageTitle: 'Коллекция карточек',
      pageDescription: 'Просмотрите коллекцию карточек, конвертируйте их в NFT и управляйте вашей коллекцией.',
      loading: 'Создание NFT...',
      convertButton: 'Превратить в NFT',
      confirmTitle: 'Превратить в NFT',
      confirmMessage: 'Вы уверены, что хотите превратить эту карточку в NFT? Этот процесс необратим.'
    },
    en: {
      pageTitle: 'Card Collection',
      pageDescription: 'Browse your card collection, convert them to NFTs and manage your collection.',
      loading: 'Creating NFT...',
      convertButton: 'Convert to NFT',
      confirmTitle: 'Convert to NFT',
      confirmMessage: 'Are you sure you want to convert this card to an NFT? This process is irreversible.'
    }
  };

  const t = titles[language];

  const bgClass = theme === 'dark' 
    ? 'bg-gradient-to-b from-dark to-dark-light' 
    : 'bg-gradient-to-b from-gray-50 to-white';

  return (
    <div className={`page-container page-transition pt-20 ${bgClass} min-h-screen`}>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-gradient mb-4">FPI NFTs</h1>
        <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
          {t.pageDescription}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className={`p-8 rounded-xl ${theme === 'dark' ? 'bg-dark-lighter' : 'bg-white'} shadow-xl`}>
            <Loader size={50} className="text-purple animate-spin-slow mb-4 mx-auto" />
            <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>{t.loading}</p>
          </div>
        </div>
      ) : showDetails && selectedCardData ? (
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => setShowDetails(false)}
            className={`flex items-center mb-6 ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronLeft size={20} />
            <span className="ml-1">{language === 'ru' ? 'Назад к коллекции' : 'Back to collection'}</span>
          </button>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className={`overflow-hidden rounded-xl ${theme === 'dark' ? 'legendary-glow' : 'shadow-2xl'}`}>
              <img 
                src={selectedCardData.image || "https://via.placeholder.com/500"}
                alt={selectedCardData.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                  ${theme === 'dark' 
                    ? `bg-rarity-${selectedCardData.rarity}/20 text-rarity-${selectedCardData.rarity}` 
                    : `bg-rarity-${selectedCardData.rarity}/10 text-rarity-${selectedCardData.rarity}`}`}>
                    {selectedCardData.rarity.charAt(0).toUpperCase() + selectedCardData.rarity.slice(1)}
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <Star size={16} className={`${selectedCardData.rarity !== 'common' ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                    <Star size={16} className={`${['rare', 'epic', 'legendary'].includes(selectedCardData.rarity) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                    <Star size={16} className={`${['epic', 'legendary'].includes(selectedCardData.rarity) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                    <Star size={16} className={`${selectedCardData.rarity === 'legendary' ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} />
                  </div>
                </div>
                <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
                  {selectedCardData.name}
                </h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
                  {selectedCardData.description}
                </p>
              </div>
              <Button 
                className="w-full"
                onClick={() => setShowConfirmModal(true)}
              >
                {t.convertButton}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map(card => (
            <Card 
              key={card.id} 
              rarity={card.rarity}
              onClick={() => {
                setSelectedCard(card.id);
                setShowDetails(true);
              }}
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={card.image || "https://via.placeholder.com/300"}
                  alt={card.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>
                    {card.name}
                  </h3>
                  <span className={`text-sm font-medium text-rarity-${card.rarity}`}>
                    {card.rarity.charAt(0).toUpperCase() + card.rarity.slice(1)}
                  </span>
                </div>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm line-clamp-2`}>
                  {card.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title={t.confirmTitle}
        message={t.confirmMessage}
        onConfirm={handleConvertToNFT}
      />
    </div>
  );
};

export default Index;
