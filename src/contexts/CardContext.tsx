
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RarityType = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface User {
  id: string;
  name: string;
  avatar: string;
  description: string;
  likes: number;
  dislikes: number;
}

export interface CardType {
  id: string;
  name: string;
  description: string;
  rarity: RarityType;
  image: string;
  isNFT: boolean;
  owner: string;
  favorite?: boolean;
  forSale?: boolean;
  price?: number;
}

interface CardContextType {
  cards: CardType[];
  nfts: CardType[];
  marketplaceItems: CardType[];
  currentUser: User;
  users: User[];
  addCard: (card: CardType) => void;
  convertToNFT: (cardId: string) => void;
  toggleFavorite: (nftId: string) => void;
  putForSale: (nftId: string, price: number) => void;
  removeFromSale: (nftId: string) => void;
  buyNFT: (nftId: string) => void;
  giftNFT: (nftId: string, recipientId: string) => void;
  toggleUserLike: (userId: string, isLike: boolean) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('useCardContext must be used within a CardProvider');
  }
  return context;
};

export const CardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'тест',
      avatar: '/avatar1.png',
      description: 'Тестовый аккаунт для демонстрации функциональности',
      likes: 42,
      dislikes: 3
    },
    {
      id: '2',
      name: 'Пользователь 2',
      avatar: '/avatar2.png',
      description: 'Второй тестовый аккаунт',
      likes: 18,
      dislikes: 5
    },
    {
      id: '3',
      name: 'Пользователь 3',
      avatar: '/avatar3.png',
      description: 'Третий тестовый аккаунт',
      likes: 35,
      dislikes: 2
    }
  ]);

  const [currentUser] = useState<User>(users[0]);

  const [cards, setCards] = useState<CardType[]>([
    {
      id: '1',
      name: 'тест',
      description: 'Тестовая карточка легендарной редкости',
      rarity: 'legendary',
      image: '/card1.png',
      isNFT: false,
      owner: '1'
    }
  ]);

  const [nfts, setNFTs] = useState<CardType[]>([]);
  const [marketplaceItems, setMarketplaceItems] = useState<CardType[]>([]);

  const addCard = (card: CardType) => {
    setCards([...cards, card]);
  };

  const convertToNFT = (cardId: string) => {
    const card = cards.find(c => c.id === cardId);
    if (card) {
      const newNFT = { ...card, isNFT: true };
      setNFTs([...nfts, newNFT]);
      setCards(cards.filter(c => c.id !== cardId));
    }
  };

  const toggleFavorite = (nftId: string) => {
    setNFTs(nfts.map(nft => 
      nft.id === nftId ? { ...nft, favorite: !nft.favorite } : nft
    ));
    
    setMarketplaceItems(marketplaceItems.map(item => 
      item.id === nftId ? { ...item, favorite: !item.favorite } : item
    ));
  };

  const putForSale = (nftId: string, price: number) => {
    const nft = nfts.find(n => n.id === nftId);
    if (nft) {
      const forSaleNFT = { ...nft, forSale: true, price };
      setNFTs(nfts.filter(n => n.id !== nftId));
      setMarketplaceItems([...marketplaceItems, forSaleNFT]);
    }
  };

  const removeFromSale = (nftId: string) => {
    const item = marketplaceItems.find(i => i.id === nftId);
    if (item) {
      const ownedNFT = { ...item, forSale: false, price: undefined };
      setMarketplaceItems(marketplaceItems.filter(i => i.id !== nftId));
      setNFTs([...nfts, ownedNFT]);
    }
  };

  const buyNFT = (nftId: string) => {
    const item = marketplaceItems.find(i => i.id === nftId);
    if (item) {
      const boughtNFT = { ...item, forSale: false, price: undefined, owner: currentUser.id };
      setMarketplaceItems(marketplaceItems.filter(i => i.id !== nftId));
      setNFTs([...nfts, boughtNFT]);
    }
  };

  const giftNFT = (nftId: string, recipientId: string) => {
    const nft = nfts.find(n => n.id === nftId);
    if (nft) {
      const giftedNFT = { ...nft, owner: recipientId };
      setNFTs(nfts.filter(n => n.id !== nftId));
      // In a real app, you would need to add it to the recipient's NFTs
    }
  };

  const toggleUserLike = (userId: string, isLike: boolean) => {
    // This would update the like/dislike count for a user
    // In a real app, this would be connected to a backend
  };

  return (
    <CardContext.Provider 
      value={{ 
        cards, 
        nfts, 
        marketplaceItems, 
        currentUser, 
        users,
        addCard, 
        convertToNFT, 
        toggleFavorite, 
        putForSale, 
        removeFromSale, 
        buyNFT, 
        giftNFT,
        toggleUserLike
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
