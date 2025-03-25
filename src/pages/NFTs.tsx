
import React, { useState } from 'react';
import NFTCard from '@/components/NFTCard';
import { useCardContext } from '@/contexts/CardContext';
import { Modal } from '@/components/ui/Modal';

const NFTs = () => {
  const { nfts } = useCardContext();
  const [selectedNFT, setSelectedNFT] = useState<string | null>(null);
  
  const selectedNFTData = nfts.find(nft => nft.id === selectedNFT);

  return (
    <div className="page-container page-transition pt-20">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gradient mb-4">Ваши NFT</h1>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Управляйте вашей коллекцией NFT, продавайте, дарите или обменивайте их.
        </p>
      </div>

      {nfts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="bg-dark-lighter p-6 rounded-xl text-center">
            <h3 className="text-xl font-medium text-white mb-2">Нет NFT</h3>
            <p className="text-gray-300">
              У вас пока нет NFT. Вы можете превратить карточки в NFT на главной странице.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {nfts.map(nft => (
            <NFTCard 
              key={nft.id} 
              nft={nft}
              onSelect={() => setSelectedNFT(nft.id)}
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
          <div className="grid gap-4">
            <div className="rounded-lg overflow-hidden">
              <img 
                src={selectedNFTData.image || "https://via.placeholder.com/400"}
                alt={selectedNFTData.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="space-y-3">
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

export default NFTs;
