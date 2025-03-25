
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import Card from './ui/card-custom';
import Button from './ui/Button';
import { UserSelectionModal, SellModal, ConfirmationModal } from './ui/Modal';
import { CardType, useCardContext } from '@/contexts/CardContext';

interface NFTCardProps {
  nft: CardType;
  isMarketplace?: boolean;
  onSelect?: () => void;
}

const NFTCard: React.FC<NFTCardProps> = ({ 
  nft, 
  isMarketplace = false,
  onSelect 
}) => {
  const { 
    currentUser, 
    toggleFavorite, 
    putForSale, 
    removeFromSale, 
    buyNFT, 
    giftNFT 
  } = useCardContext();
  
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showConfirmBuyModal, setShowConfirmBuyModal] = useState(false);
  const [showRemoveFromSaleModal, setShowRemoveFromSaleModal] = useState(false);

  const isOwner = nft.owner === currentUser.id;
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(nft.id);
  };

  const handleGift = (userId: string) => {
    giftNFT(nft.id, userId);
  };

  const handleSell = (price: number) => {
    putForSale(nft.id, price);
  };

  const handleBuy = () => {
    buyNFT(nft.id);
  };

  const handleRemoveFromSale = () => {
    removeFromSale(nft.id);
  };

  const rarityColors = {
    common: 'text-rarity-common',
    uncommon: 'text-rarity-uncommon',
    rare: 'text-rarity-rare',
    epic: 'text-rarity-epic',
    legendary: 'text-rarity-legendary'
  };

  return (
    <>
      <Card 
        rarity={nft.rarity} 
        className="w-full max-w-xs mx-auto"
        onClick={onSelect}
        showLikes={true}
      >
        <div className="relative">
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={nft.image || "https://via.placeholder.com/300"}
              alt={nft.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
            <button 
              className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              onClick={handleFavoriteToggle}
            >
              <Heart size={20} className={nft.favorite ? 'fill-red-500 text-red-500' : ''} />
            </button>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-bold text-[var(--text-color)]">{nft.name}</h3>
              <span className={`text-sm font-medium ${rarityColors[nft.rarity]}`}>
                {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{nft.description}</p>
            
            {isMarketplace ? (
              <div className="space-y-2">
                {isOwner ? (
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRemoveFromSaleModal(true);
                    }}
                  >
                    Убрать с продажи
                  </Button>
                ) : (
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmBuyModal(true);
                    }}
                  >
                    Купить за {nft.price} FPI Bank
                  </Button>
                )}
              </div>
            ) : (
              isOwner && (
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSellModal(true);
                    }}
                  >
                    Продать
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGiftModal(true);
                    }}
                  >
                    Подарить
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTradeModal(true);
                    }}
                  >
                    Обменять
                  </Button>
                </div>
              )
            )}
          </div>
        </div>
      </Card>

      <UserSelectionModal
        isOpen={showGiftModal}
        onClose={() => setShowGiftModal(false)}
        title="Выберите, кому подарить"
        onSelectUser={handleGift}
      />

      <UserSelectionModal
        isOpen={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        title="Выберите, с кем обменяться"
        onSelectUser={(userId) => console.log('Trade request sent to:', userId)}
      />

      <SellModal
        isOpen={showSellModal}
        onClose={() => setShowSellModal(false)}
        onSell={handleSell}
      />

      <ConfirmationModal
        isOpen={showConfirmBuyModal}
        onClose={() => setShowConfirmBuyModal(false)}
        title="Подтверждение покупки"
        message={`Вы уверены, что хотите купить "${nft.name}" за ${nft.price} FPI Bank?`}
        onConfirm={handleBuy}
      />

      <ConfirmationModal
        isOpen={showRemoveFromSaleModal}
        onClose={() => setShowRemoveFromSaleModal(false)}
        title="Убрать с продажи"
        message={`Убрать "${nft.name}" с рынка?`}
        onConfirm={handleRemoveFromSale}
      />
    </>
  );
};

export default NFTCard;
