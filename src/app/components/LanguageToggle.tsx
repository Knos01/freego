'use client';

import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  language: 'en' | 'it';
  setLanguage: (language: 'en' | 'it') => void;
}

export function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'it' : 'en')}
    >
      {language === 'en' ? '🇮🇹 Italiano' : '🇬🇧 English'}
    </Button>
  );
} 