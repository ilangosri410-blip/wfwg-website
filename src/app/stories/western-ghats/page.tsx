"use client";
import Reveal from '../../../components/Reveal';
import { useLanguage } from '../../../components/LanguageProvider';
import { wgStory } from '../../../data/site';

const Arw = () => <span className="arw" aria-hidden="true">↗</span>;

export default function WesternGhatsStory() {
  const { t, attr } = useLanguage();

  return (
    <main id="top" className="story-page" lang={attr}>
      <section className="story-hero">
        <div className="story-hero-media">
          <img src="/assets/story/wg-geography.jpg" alt={t(wgStory.heroAlt)} width={1600} height={1200} fetchPriority="high" />
        </div>
        <div className="story-hero-veil" />
        <div className="container story-hero-inner">
          <div className="eyebrow">{t(wgStory.eyebrow)}</div>
          <h1>{t(wgStory.h1)}</h1>
          <p className="story-hero-lead">{t(wgStory.lead)}</p>
        </div>
      </section>

      <section className="story-body">
        <div className="container story-prose">

          <Reveal>
            <div className="story-open">
              <p className="story-lead-p">{t(wgStory.openA)}</p>
              <p className="story-open-side">{t(wgStory.openB)}</p>
            </div>
          </Reveal>

          <Reveal>
            <dl className="story-stats">
              {wgStory.stats.map(st => (
                <div key={st.dt.en}><dt>{t(st.dt)}</dt><dd>{t(st.dd)}</dd></div>
              ))}
            </dl>
          </Reveal>

          {wgStory.blocks.map((b, i) => {
            if (b.kind === 'prose') return (
              <Reveal key={i}>
                <div className="story-col">
                  {b.heading && <h2>{t(b.heading)}</h2>}
                  {b.body.map((p, j) => <p key={j}>{t(p)}</p>)}
                </div>
              </Reveal>
            );
            if (b.kind === 'pull') return (
              <Reveal key={i}><p className="story-pull">{t(b.body)}</p></Reveal>
            );
            return (
              <Reveal key={i}>
                <figure className={`story-fig${b.bleed ? ' is-bleed' : ''}`}>
                  <img src={b.img} alt={t(b.alt)} loading="lazy" decoding="async" width={b.w} height={b.h} />
                  <figcaption>{t(b.caption)}</figcaption>
                </figure>
              </Reveal>
            );
          })}

          <Reveal>
            <div className="story-col">
              <div className="story-cta-block">
                <a className="btn btn-dark" href="/#work">{t(wgStory.ctaWork)} <Arw /></a>
                <a className="btn btn-line-dark" href="/#wildlife">{t(wgStory.ctaIndex)} <Arw /></a>
              </div>
              <p className="story-source-note">{t(wgStory.note)}</p>
            </div>
          </Reveal>

        </div>
      </section>
    </main>
  );
}
