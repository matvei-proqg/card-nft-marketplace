
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { name: 'Главная', path: '/' },
    { name: 'NFTs', path: '/nfts' },
    { name: 'Рынок', path: '/marketplace' },
    { name: 'Профиль', path: '/profile' },
    { name: 'Настройки', path: '/settings' }
  ];

  return (
    <header className="w-full fixed top-0 z-50 glass-morphism">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold text-gradient">
          NFT Collection
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative px-2 py-1 transition-all duration-300 text-sm font-medium ${
                isActive(link.path)
                  ? 'text-purple'
                  : 'text-gray-300 hover:text-white'
              } after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-purple after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-light animate-fade-in">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-4 py-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2 py-2 transition-colors duration-200 text-sm font-medium ${
                    isActive(link.path)
                      ? 'text-purple border-l-2 border-purple pl-2'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
