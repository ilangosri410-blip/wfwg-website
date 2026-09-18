"use client";
import Reveal from '../../../components/Reveal';
import { useLanguage } from '../../../components/LanguageProvider';
import { logoAnimals, logoStory } from '../../../data/site';

const Arw = () => <span className="arw" aria-hidden="true">↗</span>;

export default function LogoStory() {
  const { t, attr } = useLanguage();

  return (
    <main id="top" className="story-page" lang={attr}>
      <section className="story-hero story-hero-logo">
        <div className="container story-hero-inner">
          <div className="eyebrow">{t(logoStory.eyebrow)}</div>
          <div className="logo-hero-ring">
            <img className="logo-hero-mark" src="/assets/wfwg-logo.png" alt={t(logoStory.crestAlt)} width={1254} height={1254} />
          </div>
          <h1>{t(logoStory.h1)}</h1>
          <p className="story-hero-lead">{t(logoStory.lead)}</p>
        </div>
      </section>

      <section className="story-body">
        <div className="container story-prose">
          <Reveal>
            <div className="story-open">
              <p className="story-lead-p">{t(logoStory.openA)}</p>
              <p className="story-open-side">{t(logoStory.openB)}</p>
            </div>
          </Reveal>

          {logoAnimals.map((a, i) => (
            <Reveal key={a.no}>
              <div className={`logo-story-row${i % 2 === 1 ? ' is-reverse' : ''}`}>
                <figure className="logo-story-fig">
                  <img src={a.img} alt={t(a.alt)} loading="lazy" decoding="async" width={1536} height={1024}
                    style={a.focus ? { objectPosition: a.focus } : undefined} />
                  <figcaption>{t(a.caption)}</figcaption>
                </figure>
                <div className="logo-story-text">
                  <span className="ls-index">{a.no}</span>
                  <h2 className="ls-name">{t(a.name)}</h2>
                  <p className="ls-role">{t(a.heading)}</p>
                  <p>{t(a.body)}</p>
                  <p className="ls-wg">{t(a.wg)}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal>
            <div className="story-col">
              <div className="story-cta-block story-cta-block-tight">
                <a className="btn btn-dark" href="/#wildlife">{t(logoStory.ctaIndex)} <Arw /></a>
                <a className="btn btn-line-dark" href="/stories/western-ghats">{t(logoStory.ctaWg)} <Arw /></a>
              </div>
              <p className="story-source-note">{t(logoStory.note)}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
