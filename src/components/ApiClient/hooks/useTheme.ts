import { useState, useEffect } from 'react';
import { saveTheme, getTheme } from '../utils/storage';

export function useTheme() {
  const [isDark, setIsDark] = useState(() => getTheme());

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    saveTheme(isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return { isDark, toggleTheme };
}