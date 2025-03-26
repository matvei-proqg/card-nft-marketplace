import React, { useState } from 'react';
import NFTCard from '@/components/NFTCard';
import { useCardContext, CardType } from '@/contexts/CardContext';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowUpAZ, ArrowDownAZ, ArrowDownWideNarrow, ArrowUpWideNarrow } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

type SortField = 'name' | 'rarity' | 'price';
type SortDirection = 'asc' | 'desc';

const Marketplace = () => {
  const { marketplaceItems, currentUser, removeFromSale } = useCardContext();
  const { language } = useTheme();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('rarity');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const selectedNFTData = marketplaceItems.find(nft => nft.id === selectedNFT);

  const handleRemoveFromSale = () => {
    if (selectedNFTData) {
      removeFromSale(selectedNFTData.id);
      setSelectedNFT(null);
    }
  };

  const isOwner = selectedNFTData ? selectedNFTData.owner === currentUser.id : false;

  const sortItems = (items: CardType[]): CardType[] => {
    const rarityOrder = { legendary: 5, epic: 4, rare: 3, uncommon: 2, common: 1 };
    
    return [...items].sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'rarity') {
        return sortDirection === 'asc'
          ? rarityOrder[a.rarity] - rarityOrder[b.rarity]
          : rarityOrder[b.rarity] - rarityOrder[a.rarity];
      } else if (sortField === 'price') {
        const priceA = a.price || 0;
        const priceB = b.price || 0;
        return sortDirection === 'asc' ? priceA - priceB : priceB - priceA;
      }
      return 0;
    });
  };

  const sortedItems = sortItems(marketplaceItems);

  const translations = {
    ru: {
      title: 'Рынок NFT',
      description: 'Исследуйте доступные NFT, покупайте редкие карточки и расширяйте свою коллекцию.',
      empty: 'Рынок пуст',
      emptyDesc: 'На данный момент на рынке нет NFT. Вы можете выставить свои NFT на продажу.',
      sortBy: 'Сортировать по',
      name: 'Названию',
      rarity: 'Редкости',
      price: 'Цене',
      ascending: 'По возрастанию',
      descending: 'По убыванию',
      removeFromSale: 'Убрать с продажи',
      buy: `Купить за`,
      cancel: 'Отмена',
      rarityLabel: 'Редкость:',
      priceLabel: 'Цена:',
      descriptionLabel: 'Описание'
    },
    en: {
      title: 'NFT Marketplace',
      description: 'Explore available NFTs, buy rare cards and expand your collection.',
      empty: 'Marketplace is empty',
      emptyDesc: 'There are currently no NFTs on the market. You can list your NFTs for sale.',
      sortBy: 'Sort by',
      name: 'Name',
      rarity: 'Rarity',
      price: 'Price',
      ascending: 'Ascending',
      descending: 'Descending',
      removeFromSale: 'Remove from sale',
      buy: 'Buy for',
      cancel: 'Cancel',
      rarityLabel: 'Rarity:',
      priceLabel: 'Price:',
      descriptionLabel: 'Description'
    }
  };

  const t = translations[language];

  return (
    <div className="page-container page-transition pt-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gradient mb-4">{t.title}</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          {t.description}
        </p>
      </div>

      {marketplaceItems.length > 0 && (
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Select 
              value={sortField} 
              onValueChange={(value) => setSortField(value as SortField)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">{t.name}</SelectItem>
                <SelectItem value="rarity">{t.rarity}</SelectItem>
                <SelectItem value="price">{t.price}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
              className="relative"
            >
              {sortDirection === 'asc' ? 
                (sortField === 'name' ? <ArrowUpAZ size={18} /> : <ArrowUpWideNarrow size={18} />) : 
                (sortField === 'name' ? <ArrowDownAZ size={18} /> : <ArrowDownWideNarrow size={18} />)
              }
            </Button>
            <span className="text-sm text-gray-400">
              {sortDirection === 'asc' ? t.ascending : t.descending}
            </span>
          </div>
        </div>
      )}

      {marketplaceItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-dark-lighter p-6 rounded-xl text-center">
            <h3 className="text-xl font-medium text-white mb-2">{t.empty}</h3>
            <p className="text-gray-300">
              {t.emptyDesc}
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedItems.map(item => (
            <NFTCard 
              key={item.id} 
              nft={item}
              isMarketplace={true}
              onSelect={() => setSelectedNFT(item.id)}
            />
          ))}
        </div>
      )}

      {selectedNFTData && (
        <Modal
          isOpen={!!selectedNFT}
          onClose={() => setSelectedNFT(null)}
          title={selectedNFTData.name}
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={selectedNFTData.image || "https://via.placeholder.com/400"}
                alt={selectedNFTData.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{t.priceLabel}</span>
                <span className="text-sm font-bold text-white">{selectedNFTData.price} FPI Bank</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{t.rarityLabel}</span>
                <span className={`text-sm font-bold text-rarity-${selectedNFTData.rarity}`}>
                  {selectedNFTData.rarity.charAt(0).toUpperCase() + selectedNFTData.rarity.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{t.descriptionLabel}</h3>
                <p className="text-gray-300">{selectedNFTData.description}</p>
              </div>
              
              <div className="pt-4">
                {isOwner ? (
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleRemoveFromSale}
                  >
                    {t.removeFromSale}
                  </Button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      className="w-full"
                      onClick={() => {
                        if (selectedNFTData) {
                          useCardContext().buyNFT(selectedNFTData.id);
                          setSelectedNFT(null);
                        }
                      }}
                    >
                      {t.buy} {selectedNFTData.price} FPI Bank
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedNFT(null)}
                    >
                      {t.cancel}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Marketplace;
