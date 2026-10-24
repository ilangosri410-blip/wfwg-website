"use client";
import { useCallback, useEffect, useRef, useState } from 'react';
import { nav, site } from '../data/site';
import { useLanguage } from './LanguageProvider';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(new Set());
  const { lang, setLang, t, attr, u } = useLanguage();

  // One passive listener that only touches React state when the header actually
  // crosses the threshold, so scrolling itself does no render work.
  const isSolid = useRef(false);
  useEffect(() => {
    const on = () => {
      const next = window.scrollY > 24;
      if (next === isSolid.current) return;
      isSolid.current = next;
      setScrolled(next);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  const solid = scrolled || open;
  const closeAll = useCallback(() => { setOpen(false); setOpenGroups(new Set()); }, []);

  // No document-level class and no overflow lock: the layer contains its own
  // gestures, so opening the menu does no work outside the layer itself.
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeAll(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open, closeAll]);

  const toggleGroup = (label: string) => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label); else next.add(label);
      return next;
    });
  };

  return (
    <>
      <header className={`site-header${solid ? ' is-scrolled' : ''}`}>
        <div className="container nav-wrap">
          <a className="brand" href="/" aria-label={`${site.shortName} — ${t(site.nameL)}, ${t(u.home)}`} onClick={closeAll}>
            <img className="brand-mark" src="/assets/piec-logo.png" alt="" width={1254} height={1254} />
            <span className="brand-text">
              <b>{site.shortName}</b>
              <small lang={attr}>{lang === 'ta' ? t(site.nameL) : t(site.nameL).toUpperCase()}</small>
            </span>
          </a>

          <button
            className={`menu${open ? ' active' : ''}`}
            onClick={() => setOpen(v => !v)}
            aria-label={open ? t(u.menuClose) : t(u.menuOpen)}
            aria-expanded={open}
            aria-controls="mobile-menu"
          ><i /><i /></button>

          {/* desktop navigation — unchanged, and hidden below the mobile breakpoint */}
          <nav>
            {nav.map(item => (
              <div className="nav-item" key={item.label.en}>
                <div className="nav-row">
                  <a className="nav-top" href={item.href} lang={attr}>{t(item.label)}</a>
                </div>
                {item.children && (
                  <div className="nav-drop">
                    {item.children.map(c => (
                      <a key={c.label.en} href={c.href} lang={attr}>{t(c.label)}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="nav-tools">
              <button type="button" className="lang-toggle"
                onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} aria-label={t(u.switchLanguage)}>
                <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
                <i aria-hidden="true">|</i>
                <span className={lang === 'ta' ? 'is-on' : ''} lang="ta">தமிழ்</span>
              </button>
              <a className="nav-cta" href="/#donate" lang={attr}>
                {t(u.donate)} <span className="arw" aria-hidden="true">↗</span>
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/*
        The mobile menu is its own top-level layer, not a panel inside the
        sticky header. It stays mounted and laid out, and opening it flips
        opacity and visibility only — no display change, no subtree layout, no
        document reflow. That is the whole fix for the menu hanging once the
        page had been scrolled: the old panel was display:none inside a sticky
        ancestor and the open also set overflow:hidden on html and body, which
        forces the engine to re-resolve and re-lay-out the whole document at
        whatever scroll offset it was at.

        Because the layer covers the viewport, nothing behind it can be
        touched, and the list contains its own overscroll, so the page beneath
        never scrolls and never jumps.
      */}
      <div className={`mnav${open ? ' is-open' : ''}`} id="mobile-menu" aria-hidden={!open}>
        <div className="mnav-scroll">
          <ul className="mnav-list">
            {nav.map(item => {
              const isOpen = openGroups.has(item.label.en);
              return (
                <li className="mnav-item" key={item.label.en}>
                  <div className="mnav-row">
                    <a className="mnav-link" href={item.href} onClick={closeAll} lang={attr}
                      tabIndex={open ? 0 : -1}>{t(item.label)}</a>
                    {item.children && (
                      <button type="button" className={`mnav-chev${isOpen ? ' is-open' : ''}`}
                        aria-expanded={isOpen} aria-label={t(item.label)} tabIndex={open ? 0 : -1}
                        onClick={() => toggleGroup(item.label.en)}>
                        <span aria-hidden="true">⌄</span>
                      </button>
                    )}
                  </div>
                  {item.children && (
                    <div className={`mnav-sub${isOpen ? ' is-open' : ''}`}>
                      <div className="mnav-sub-in">
                        {item.children.map(c => (
                          <a key={c.label.en} href={c.href} onClick={closeAll} lang={attr}
                            tabIndex={open && isOpen ? 0 : -1}>{t(c.label)}</a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="mnav-foot">
            <button type="button" className="lang-toggle" tabIndex={open ? 0 : -1}
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')} aria-label={t(u.switchLanguage)}>
              <span className={lang === 'en' ? 'is-on' : ''}>EN</span>
              <i aria-hidden="true">|</i>
              <span className={lang === 'ta' ? 'is-on' : ''} lang="ta">தமிழ்</span>
            </button>
            <a className="nav-cta" href="/#donate" onClick={closeAll} lang={attr} tabIndex={open ? 0 : -1}>
              {t(u.donate)} <span className="arw" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
