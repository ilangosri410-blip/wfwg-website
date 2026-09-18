"use client";
import { site, nav } from '../data/site';
import { useLanguage } from './LanguageProvider';

export default function Footer() {
  const { t, attr, u } = useLanguage();
  return (
    <footer>
      <div className="container footgrid">
        <div>
          <img className="footer-mark" src="/assets/wfwg-logo.png" alt="" width={1254} height={1254} loading="lazy" decoding="async" />
          <div className="footbrand">{site.shortName}</div>
          <p lang={attr}>{t(site.nameL)}<br />{t(site.taglineL)}</p>
        </div>
        <div>
          <small lang={attr}>{t(u.navigate)}</small>
          <nav className="footnav" aria-label={t(u.navigate)}>
            {nav.map(item => <a key={item.label.en} href={item.href} lang={attr}>{t(item.label)}</a>)}
          </nav>
        </div>
        <div>
          <small lang={attr}>{t(u.contact)}</small>
          <div className="footnav"><a href={`mailto:${site.email}`}>{site.email}</a></div>
          <p lang={attr}>{t(site.city)}</p>
        </div>
      </div>
      <div className="container copyright">
        <span>© 2026 {site.shortName}</span>
        <span lang={attr}>{t(u.footerLine)}</span>
      </div>
    </footer>
  );
}
