
import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { ConfirmationModal } from '@/components/ui/Modal';
import { useCardContext } from '@/contexts/CardContext';
import { Loader } from 'lucide-react';

const Index = () => {
  const { cards, convertToNFT } = useCardContext();
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

  return (
    <div className="page-container page-transition pt-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gradient mb-4">Коллекция карточек</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Просмотрите коллекцию карточек, конвертируйте их в NFT и управляйте вашей коллекцией.
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader size={50} className="text-purple animate-spin-slow mb-4" />
          <p className="text-gray-300">Создание NFT...</p>
        </div>
      ) : showDetails && selectedCardData ? (
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="glass-card rounded-xl overflow-hidden rarity-border-legendary legendary-glow">
            <img 
              src={selectedCardData.image || "https://via.placeholder.com/500"}
              alt={selectedCardData.name}
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-block bg-purple/20 text-purple px-3 py-1 rounded-full text-sm font-medium mb-2">
                {selectedCardData.rarity.charAt(0).toUpperCase() + selectedCardData.rarity.slice(1)}
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">{selectedCardData.name}</h2>
              <p className="text-gray-300 mb-6">{selectedCardData.description}</p>
            </div>
            <Button 
              className="w-full"
              onClick={() => setShowConfirmModal(true)}
            >
              Превратить в NFT
            </Button>
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
                <h3 className="text-lg font-bold text-white mb-2">{card.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-2">{card.description}</p>
              </div>
            </Card>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Превратить в NFT"
        message="Вы уверены, что хотите превратить эту карточку в NFT? Этот процесс необратим."
        onConfirm={handleConvertToNFT}
      />
    </div>
  );
};

export default Index;
