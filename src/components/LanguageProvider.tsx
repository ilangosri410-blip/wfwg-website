"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ui, tx } from '../data/site';
import type { Lang, L } from '../data/site';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** Translate a bilingual field. */
  t: (v: L) => string;
  /** The lang attribute to put on rendered Tamil, or undefined in English. */
  attr: Lang | undefined;
  u: typeof ui;
};

const LanguageContext = createContext<Ctx | null>(null);
const KEY = 'wfwg-lang';

// English is the default. The choice is remembered for the visit so it survives
// navigation between the homepage and the story routes, and the document's own
// lang attribute follows it so screen readers and Tamil font fallbacks apply.
export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY);
      if (saved === 'ta' || saved === 'en') setLangState(saved);
    } catch { /* storage unavailable — English stays the default */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'ta' ? 'ta' : 'en';
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(KEY, l); } catch { /* ignore */ }
  }, []);

  const value = useMemo<Ctx>(() => ({
    lang, setLang,
    t: (v: L) => tx(v, lang),
    attr: lang === 'ta' ? 'ta' : undefined,
    u: ui,
  }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
