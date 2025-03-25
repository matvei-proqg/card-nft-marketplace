
import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeType = 'dark' | 'light';
type AccentColor = 'purple' | 'blue' | 'green' | 'red' | 'yellow';
type Language = 'ru' | 'en';

interface ThemeContextType {
  theme: ThemeType;
  accentColor: AccentColor;
  language: Language;
  setTheme: (theme: ThemeType) => void;
  setAccentColor: (color: AccentColor) => void;
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as ThemeType) || 'dark';
  });
  
  const [accentColor, setAccentColor] = useState<AccentColor>(() => {
    const savedColor = localStorage.getItem('accentColor');
    return (savedColor as AccentColor) || 'purple';
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language');
    return (savedLanguage as Language) || 'ru';
  });

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('accentColor', accentColor);
    localStorage.setItem('language', language);
  }, [theme, accentColor, language]);

  // Apply theme and accent color classes to document element
  useEffect(() => {
    // Remove all existing theme classes
    document.documentElement.classList.remove('dark', 'light');
    // Remove all existing accent color classes
    document.documentElement.classList.remove('accent-purple', 'accent-blue', 'accent-green', 'accent-red', 'accent-yellow');
    
    // Add current theme class
    document.documentElement.classList.add(theme);
    // Add current accent color class
    document.documentElement.classList.add(`accent-${accentColor}`);
    
    // Update CSS variables
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--background-color', '#121212');
      document.documentElement.style.setProperty('--text-color', '#ffffff');
    } else {
      document.documentElement.style.setProperty('--background-color', '#f8f8f8');
      document.documentElement.style.setProperty('--text-color', '#121212');
    }
    
    // Set accent color variable based on the selected color
    const accentColorValues = {
      purple: '#8B5CF6',
      blue: '#3B82F6',
      green: '#10B981',
      red: '#EF4444',
      yellow: '#F59E0B'
    };
    
    document.documentElement.style.setProperty('--accent-color', accentColorValues[accentColor]);
    
    // Update CSS custom properties for components
    document.documentElement.style.setProperty('--primary', accentColorValues[accentColor]);
    document.documentElement.style.setProperty('--card-bg', theme === 'dark' ? '#1A1A1A' : '#ffffff');
    document.documentElement.style.setProperty('--card-border', theme === 'dark' ? '#333333' : '#e5e7eb');
  }, [theme, accentColor]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        language,
        setTheme,
        setAccentColor,
        setLanguage,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
