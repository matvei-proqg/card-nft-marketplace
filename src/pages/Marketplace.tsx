
import React, { useState } from 'react';
import NFTCard from '@/components/NFTCard';
import { useCardContext } from '@/contexts/CardContext';
import { Modal } from '@/components/ui/Modal';

const Marketplace = () => {
  const { marketplaceItems } = useCardContext();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  
  const selectedNFTData = marketplaceItems.find(nft => nft.id === selectedNFT);

  return (
    <div className="page-container page-transition pt-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gradient mb-4">Рынок NFT</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Исследуйте доступные NFT, покупайте редкие карточки и расширяйте свою коллекцию.
        </p>
      </div>

      {marketplaceItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-dark-lighter p-6 rounded-xl text-center">
            <h3 className="text-xl font-medium text-white mb-2">Рынок пуст</h3>
            <p className="text-gray-300">
              На данный момент на рынке нет NFT. Вы можете выставить свои NFT на продажу.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {marketplaceItems.map(item => (
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
                <span className="text-sm font-medium text-gray-300">Цена:</span>
                <span className="text-sm font-bold text-white">{selectedNFTData.price} ETH</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Редкость:</span>
                <span className={`text-sm font-bold text-rarity-${selectedNFTData.rarity}`}>
                  {selectedNFTData.rarity.charAt(0).toUpperCase() + selectedNFTData.rarity.slice(1)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Описание</h3>
                <p className="text-gray-300">{selectedNFTData.description}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Marketplace;
