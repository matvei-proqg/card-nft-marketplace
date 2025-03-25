
import React, { createContext, useContext, useState } from 'react';

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
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>('dark');
  const [accentColor, setAccentColor] = useState<AccentColor>('purple');
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <ThemeContext.Provider
      value={{
        theme,
        accentColor,
        language,
        setTheme,
        setAccentColor,
        setLanguage,
      }}
    >
      <div className={`${theme} ${accentColor}`}>
        {children}
      </div>
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
