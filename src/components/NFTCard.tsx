import React, { useState } from 'react';
import { Heart, BadgeInfo } from 'lucide-react';
import Card from './ui/card-custom';
import { Button } from './ui/Button';
import { UserSelectionModal, SellModal, ConfirmationModal } from './ui/Modal';
import { CardType, useCardContext } from '@/contexts/CardContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

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
  
  const { theme, language } = useTheme();
  const { toast } = useToast();
  
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);
  const [showConfirmBuyModal, setShowConfirmBuyModal] = useState(false);
  const [showRemoveFromSaleModal, setShowRemoveFromSaleModal] = useState(false);

  const isOwner = nft.owner === currentUser.id;
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(nft.id);
    toast({
      title: nft.favorite ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const handleGift = (userId: string) => {
    giftNFT(nft.id, userId);
    toast({
      title: "Gift sent successfully!",
      description: "The NFT has been transferred to the recipient.",
      duration: 3000,
    });
  };

  const handleSell = (price: number) => {
    putForSale(nft.id, price);
    toast({
      title: "NFT listed for sale",
      description: `Your NFT is now available on the marketplace for ${price} FPI Bank.`,
      duration: 3000,
    });
  };

  const handleBuy = () => {
    buyNFT(nft.id);
    toast({
      title: "Purchase successful!",
      description: `You now own "${nft.name}"`,
      duration: 3000,
    });
  };

  const handleRemoveFromSale = () => {
    removeFromSale(nft.id);
    toast({
      title: "Removed from marketplace",
      description: "Your NFT has been removed from sale.",
      duration: 3000,
    });
  };

  const translations = {
    ru: {
      sell: 'Продать',
      gift: 'Подарить',
      trade: 'Обменять',
      buy: `Купить за ${nft.price} FPI Bank`,
      removeFromSale: 'Убрать с продажи',
      confirmBuyTitle: 'Подтверждение покупки',
      confirmBuyMessage: `Вы уверены, что хотите купить "${nft.name}" за ${nft.price} FPI Bank?`,
      confirmRemoveTitle: 'Убрать с продажи',
      confirmRemoveMessage: `Убрать "${nft.name}" с рынка?`,
      selectGiftTitle: 'Выберите, кому подарить',
      selectTradeTitle: 'Выберите, с кем обменяться',
      info: 'Информация'
    },
    en: {
      sell: 'Sell',
      gift: 'Gift',
      trade: 'Trade',
      buy: `Buy for ${nft.price} FPI Bank`,
      removeFromSale: 'Remove from sale',
      confirmBuyTitle: 'Confirm Purchase',
      confirmBuyMessage: `Are you sure you want to buy "${nft.name}" for ${nft.price} FPI Bank?`,
      confirmRemoveTitle: 'Remove from Sale',
      confirmRemoveMessage: `Remove "${nft.name}" from the marketplace?`,
      selectGiftTitle: 'Select recipient',
      selectTradeTitle: 'Select trade partner',
      info: 'Details'
    }
  };

  const t = translations[language];

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
            
            <div className="absolute top-3 right-3 flex gap-2">
              <button 
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/70 hover:bg-white/90'} transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect && onSelect();
                }}
              >
                <BadgeInfo size={16} className="text-gray-200" />
              </button>
              
              <button 
                className={`p-2 rounded-full ${theme === 'dark' ? 'bg-black/50 hover:bg-black/70' : 'bg-white/70 hover:bg-white/90'} transition-colors`}
                onClick={handleFavoriteToggle}
              >
                <Heart size={16} className={nft.favorite ? 'fill-red-500 text-red-500' : 'text-gray-200'} />
              </button>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full bg-opacity-80 text-white ${
                nft.rarity === 'legendary' ? 'bg-yellow-600' : 
                nft.rarity === 'epic' ? 'bg-purple-600' : 
                nft.rarity === 'rare' ? 'bg-blue-600' : 
                nft.rarity === 'uncommon' ? 'bg-green-600' : 
                'bg-gray-600'
              }`}>
                {nft.rarity.charAt(0).toUpperCase() + nft.rarity.slice(1)}
              </span>
            </div>
          </div>
          
          <div className="p-4">
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-2`}>{nft.name}</h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm mb-4 line-clamp-2`}>
              {nft.description}
            </p>
            
            {isMarketplace ? (
              <div className="space-y-2">
                {isOwner ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowRemoveFromSaleModal(true);
                    }}
                  >
                    {t.removeFromSale}
                  </Button>
                ) : (
                  <Button 
                    className="w-full group"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmBuyModal(true);
                    }}
                  >
                    {t.buy}
                  </Button>
                )}
              </div>
            ) : (
              isOwner && (
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSellModal(true);
                    }}
                  >
                    {t.sell}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowGiftModal(true);
                    }}
                  >
                    {t.gift}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowTradeModal(true);
                    }}
                  >
                    {t.trade}
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
        title={t.selectGiftTitle}
        onSelectUser={handleGift}
      />

      <UserSelectionModal
        isOpen={showTradeModal}
        onClose={() => setShowTradeModal(false)}
        title={t.selectTradeTitle}
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
        title={t.confirmBuyTitle}
        message={t.confirmBuyMessage}
        onConfirm={handleBuy}
      />

      <ConfirmationModal
        isOpen={showRemoveFromSaleModal}
        onClose={() => setShowRemoveFromSaleModal(false)}
        title={t.confirmRemoveTitle}
        message={t.confirmRemoveMessage}
        onConfirm={handleRemoveFromSale}
      />
    </>
  );
};

export default NFTCard;
