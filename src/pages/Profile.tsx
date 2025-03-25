
import React, { useState } from 'react';
import { useCardContext } from '@/contexts/CardContext';
import { ThumbsUp, ThumbsDown, Gift, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import NFTCard from '@/components/NFTCard';
import Card from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';

const Profile = () => {
  const { currentUser, nfts, cards } = useCardContext();
  const [activeTab, setActiveTab] = useState("gifts");
  const [likes, setLikes] = useState(currentUser.likes);
  const [dislikes, setDislikes] = useState(currentUser.dislikes);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  
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

  return (
    <div className="page-container page-transition pt-20">
      <div className="max-w-4xl mx-auto">
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple/30">
              <img 
                src={currentUser.avatar || "https://via.placeholder.com/128"}
                alt={currentUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{currentUser.name}</h1>
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
              <span>Подарки/NFT</span>
            </TabsTrigger>
            <TabsTrigger value="cards" className="flex items-center gap-2">
              <CreditCard size={16} />
              <span>Карточки</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="gifts" className="animate-fade-in">
            {nfts.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-400">У вас нет подарков и NFT</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {nfts.map(nft => (
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
                <p className="text-gray-400">У вас нет обычных карточек</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                {cards.map(card => (
                  <Card 
                    key={card.id} 
                    rarity={card.rarity}
                    onClick={() => setSelectedItem(card.id)}
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
                <span className="text-sm font-medium text-gray-300">Редкость:</span>
                <span className={`text-sm font-bold text-rarity-${selectedData.rarity}`}>
                  {selectedData.rarity.charAt(0).toUpperCase() + selectedData.rarity.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Описание</h3>
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
