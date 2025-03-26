
import React, { useState } from 'react';
import { useCardContext, CardType } from '@/contexts/CardContext';
import { ThumbsUp, ThumbsDown, Gift, CreditCard, ArrowUpAZ, ArrowDownAZ } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NFTCard from '@/components/NFTCard';
import Card from '@/components/ui/card-custom';
import { Modal } from '@/components/ui/Modal';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

type SortField = 'name' | 'rarity';
type SortDirection = 'asc' | 'desc';

const Profile = () => {
  const { currentUser, nfts, cards } = useCardContext();
  const { language } = useTheme();
  const [activeTab, setActiveTab] = useState("gifts");
  const [likes, setLikes] = useState(currentUser.likes);
  const [dislikes, setDislikes] = useState(currentUser.dislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('rarity');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const selectedNFT = nfts.find(nft => nft.id === selectedItem);
  const selectedCard = cards.find(card => card.id === selectedItem);
  const selectedData = selectedNFT || selectedCard;

  const handleLike = () => {
    if (hasLiked) return;
    
    if (hasDisliked) {
      setDislikes(prev => prev - 1);
      setHasDisliked(false);
    }
    
    setLikes(prev => prev + 1);
    setHasLiked(true);
  };

  const handleDislike = () => {
    if (hasDisliked) return;
    
    if (hasLiked) {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
    
    setDislikes(prev => prev + 1);
    setHasDisliked(true);
  };

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
      }
      return 0;
    });
  };

  const sortedNFTs = sortItems(nfts);
  const sortedCards = sortItems(cards);

  const translations = {
    ru: {
      gifts: 'Подарки/NFT',
      cards: 'Карточки',
      noGifts: 'У вас нет подарков и NFT',
      noCards: 'У вас нет обычных карточек',
      sortBy: 'Сортировать по',
      name: 'Названию',
      rarity: 'Редкости',
      ascending: 'По возрастанию',
      descending: 'По убыванию',
      rarityLabel: 'Редкость:',
      description: 'Описание'
    },
    en: {
      gifts: 'Gifts/NFT',
      cards: 'Cards',
      noGifts: 'You have no gifts or NFTs',
      noCards: 'You have no regular cards',
      sortBy: 'Sort by',
      name: 'Name',
      rarity: 'Rarity',
      ascending: 'Ascending',
      descending: 'Descending',
      rarityLabel: 'Rarity:',
      description: 'Description'
    }
  };

  const t = translations[language];

  return (
    <div className="page-container page-transition pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--accent-color)]/30">
              <img 
                src={currentUser.avatar || "https://via.placeholder.com/128"}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">{currentUser.name}</h1>
              <p className="text-gray-300 mb-4">{currentUser.description}</p>
              
              <div className="flex items-center justify-center md:justify-start space-x-4">
                <button 
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${hasLiked ? 'bg-green-500/20 text-green-400' : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'}`}
                  onClick={handleLike}
                >
                  <ThumbsUp size={16} />
                  <span>{likes}</span>
                </button>
                
                <button 
                  className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${hasDisliked ? 'bg-red-500/20 text-red-400' : 'bg-dark-lighter text-gray-300 hover:bg-dark-light'}`}
                  onClick={handleDislike}
                >
                  <ThumbsDown size={16} />
                  <span>{dislikes}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="gifts" className="flex items-center gap-2">
              <Gift size={16} />
              <span>{t.gifts}</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>{t.cards}</span>
            </TabsTrigger>
          </TabsList>
          
          {(nfts.length > 0 || cards.length > 0) && (
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
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  {sortDirection === 'asc' ? <ArrowUpAZ size={18} /> : <ArrowDownAZ size={18} />}
                </Button>
                <span className="text-sm text-gray-400">
                  {sortDirection === 'asc' ? t.ascending : t.descending}
                </span>
              </div>
            </div>
          )}
          
          <TabsContent value="gifts" className="animate-fade-in">
            {nfts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">{t.noGifts}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedNFTs.map(nft => (
                  <NFTCard 
                    key={nft.id} 
                    nft={nft} 
                    onSelect={() => setSelectedItem(nft.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="cards" className="animate-fade-in">
            {cards.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">{t.noCards}</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {sortedCards.map(card => (
                  <Card 
                    key={card.id} 
                    rarity={card.rarity}
                    onClick={() => setSelectedItem(card.id)}
                    showLikes={true}
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={card.image || "https://via.placeholder.com/300"}
                        alt={card.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[var(--text-color)] mb-2">{card.name}</h3>
                      <p className="text-gray-300 text-sm line-clamp-2">{card.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {selectedData && (
        <Modal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          title={selectedData.name}
        >
          <div className="grid gap-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={selectedData.image || "https://via.placeholder.com/400"}
                alt={selectedData.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">{t.rarityLabel}</span>
                <span className={`text-sm font-bold text-rarity-${selectedData.rarity}`}>
                  {selectedData.rarity.charAt(0).toUpperCase() + selectedData.rarity.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-[var(--text-color)] mb-1">{t.description}</h3>
                <p className="text-gray-300">{selectedData.description}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
