
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      className="rounded-full w-9 h-9"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
};

export default ThemeToggle;
