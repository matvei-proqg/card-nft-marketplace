import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './Button';
import { useCardContext } from '@/contexts/CardContext';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const [animationClass, setAnimationClass] = useState('opacity-0 scale-95');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen) {
      setAnimationClass('opacity-100 scale-100');
    } else {
      setAnimationClass('opacity-0 scale-95');
      timeoutId = setTimeout(() => {
        onClose();
      }, 300);
    }

    return () => clearTimeout(timeoutId);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
      <div
        className={`relative max-w-md w-full glass-card rounded-xl transform transition-all duration-300 ${animationClass}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-white">{title}</h2>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
  confirmText = 'Да',
  cancelText = 'Нет',
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-300 mb-6">{message}</p>
      <div className="flex justify-end space-x-3">
        <Button variant="ghost" onClick={onClose}>
          {cancelText}
        </Button>
        <Button onClick={handleConfirm}>{confirmText}</Button>
      </div>
    </Modal>
  );
};

interface UserSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSelectUser: (userId: string) => void;
}

export const UserSelectionModal: React.FC<UserSelectionModalProps> = ({
  isOpen,
  onClose,
  title,
  onSelectUser,
}) => {
  const { users, currentUser } = useCardContext();
  const filteredUsers = users.filter(user => user.id !== currentUser.id);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="max-h-60 overflow-y-auto space-y-3 my-4">
        {filteredUsers.map(user => (
          <div 
            key={user.id}
            className="flex items-center p-3 rounded-lg hover:bg-dark-light transition-colors cursor-pointer"
            onClick={() => {
              onSelectUser(user.id);
              onClose();
            }}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 mr-3">
              <img src={user.avatar || "https://via.placeholder.com/40"} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="text-white font-medium">{user.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <Button variant="ghost" onClick={onClose}>
          Отмена
        </Button>
      </div>
    </Modal>
  );
};

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSell: (price: number) => void;
}

export const SellModal: React.FC<SellModalProps> = ({
  isOpen,
  onClose,
  onSell,
}) => {
  const [price, setPrice] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (price && !isNaN(Number(price))) {
      onSell(Number(price));
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Выставить на продажу">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Цена (FPI Bank)
          </label>
          <input
            type="number"
            className="w-full px-3 py-2 bg-dark-lighter border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple"
            placeholder="0.05"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0"
            step="0.01"
            required
          />
        </div>
        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={onClose} type="button">
            Отмена
          </Button>
          <Button type="submit">Продать</Button>
        </div>
      </form>
    </Modal>
  );
};
