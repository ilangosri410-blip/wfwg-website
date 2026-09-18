"use client";
import { useState } from 'react';
import Intro from '../components/Intro';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import SpeciesBrowser from '../components/SpeciesBrowser';
import { useLanguage } from '../components/LanguageProvider';
import { site, work, involve, stories } from '../data/site';

// The homepage is an overview. Depth lives one interaction away — the species
// record opens in place, and the long-form pieces have their own pages.
const [featureStory, ...moreStories] = stories;
// One photograph carries the whole section: the people who share this landscape.
const workBand = work.find(w => w.id === 'work-people') ?? work[0];

const Arw = () => <span className="arw" aria-hidden="true">↗</span>;

export default function Home() {
  const { t, attr, u } = useLanguage();
  // On a phone the three pillars open one at a time; on desktop the wrapper is
  // display:contents and every paragraph is simply present, exactly as before.
  const [openPillar, setOpenPillar] = useState<string | null>(null);

  return <>
    <Intro />
    <main id="top" tabIndex={-1}>

      {/* ---- the landscape ---------------------------------------------- */}
      <section className="hero">
        <div className="hero-media">
          <picture>
            <source media="(min-width:760px)" srcSet="/assets/hero/ghats-wide.jpg" />
            <img src="/assets/hero/ghats-portrait.jpg" alt="Mist layering over the forested ridges of the Western Ghats at Agumbe, Karnataka" width={1280} height={720} fetchPriority="high" />
          </picture>
        </div>
        <div className="hero-veil" />
        <div className="container hero-inner">
          <div className="eyebrow" lang={attr}>{t(u.heroEyebrow)}</div>
          <h1 lang={attr}>{t(u.heroH1)}</h1>
          <p className="hero-lead" lang={attr}>{t(u.heroLead)}</p>
          <div className="hero-actions">
            <a className="btn btn-fill" href="/#work" lang={attr}>{t(u.exploreWork)} <Arw /></a>
            <a className="btn btn-line" href="/#involved" lang={attr}>{t(u.supportConservation)} <Arw /></a>
          </div>
          <div className="hero-meta" lang={attr}><span>{t(u.heroPlace)}</span><span>{t(site.taglineL)}</span></div>
        </div>
      </section>

      {/* ---- who we are: one statement, one photograph, one action ----- */}
      <section id="about" className="about">
        <div className="container about-grid">
          <Reveal>
            <span className="section-number about-label" lang={attr}>{t(u.aboutNumber)}</span>
            <p className="about-statement" lang={attr}>{t(u.aboutStatement)}</p>
            <p className="about-copy" lang={attr}>{t(u.aboutCopy)}</p>
            <div className="about-actions">
              <a className="btn btn-dark" href="/stories/western-ghats" lang={attr}>{t(u.aboutCta)} <Arw /></a>
            </div>
            <div className="about-sign" lang={attr}><span>{t(site.taglineL)}</span><i /><span>{t(site.city)}</span></div>
          </Reveal>
          <Reveal>
            <figure className="about-fig">
              <img src="/assets/landscapes/rainforest-river.jpg" alt="Mist drifting over dense evergreen rainforest and a river in the Western Ghats" loading="lazy" decoding="async" width={860} height={688} />
              <figcaption lang={attr}>{t(u.aboutFigCaption)}</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* ---- wildlife: the specimen cabinet ---------------------------- */}
      <section id="wildlife" className="wild">
        <div className="container">
          <Reveal>
            <SectionHeading split number={t(u.wildlifeNumber)} title={t(u.wildlifeTitle)} lang={attr}
              shortLead={t(u.wildlifeLeadShort)}>
              {t(u.wildlifeLead)}
            </SectionHeading>
          </Reveal>
          <SpeciesBrowser />
        </div>
      </section>

      {/* ---- our work: one landscape, three pillars of one mission ----- */}
      <section id="work" className="work">
        <div className="container">
          <Reveal>
            <SectionHeading split number={t(u.workNumber)} title={t(u.workTitle)} lang={attr}>
              {t(u.workLead)}
            </SectionHeading>
          </Reveal>
          <Reveal>
            <figure className="work-band">
              <img src={workBand.img} alt={t(workBand.alt)} loading="lazy" decoding="async" width={1400} height={467} style={workBand.focus ? { objectPosition: workBand.focus } : undefined} />
              <figcaption lang={attr}>{t(u.workBandCaption)}</figcaption>
            </figure>
          </Reveal>
          <Reveal>
            <div className="work-matrix">
              <div className="wm-labels" aria-hidden="true" lang={attr}>
                <span className="wm-head" />
                <span>{t(u.wWhat)}</span><span>{t(u.wWhy)}</span><span>{t(u.wHow)}</span><span>{t(u.wImpact)}</span>
              </div>
              {work.map(w => {
                const open = openPillar === w.no;
                return (
                  <article className={`wm-col${open ? ' is-open' : ''}`} key={w.no} id={w.id} lang={attr}>
                    <header className="wm-head">
                      <span className="work-kicker">{w.no} · {t(w.eyebrow)}</span>
                      <h3>{t(w.title)}</h3>
                      {/* the row is the control on a phone; on desktop the
                          button is display:none and this is just a heading */}
                      <button type="button" className="wm-tap" aria-expanded={open}
                        aria-controls={`${w.id}-more`} onClick={() => setOpenPillar(open ? null : w.no)}>
                        <span className="wm-tap-label">{t(w.title)}</span>
                        <span className="wm-tap-mark" aria-hidden="true">{open ? '\u2013' : '+'}</span>
                      </button>
                    </header>
                    <p data-label={t(u.wWhat)}>{t(w.what)}</p>
                    <div className="wm-more" id={`${w.id}-more`}><div className="wm-more-in">
                      <p data-label={t(u.wWhy)}>{t(w.why)}</p>
                      <p data-label={t(u.wHow)}>{t(w.how)}</p>
                      <p data-label={t(u.wImpact)}>{t(w.impact)}</p>
                    </div></div>
                  </article>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---- stories: one feature, two supporting ---------------------- */}
      <section id="stories" className="stories">
        <div className="container">
          <Reveal>
            <SectionHeading split number={t(u.storiesNumber)} title={t(u.storiesTitle)} lang={attr}>
              {t(u.storiesLead)}
            </SectionHeading>
          </Reveal>
          <div className="st-grid">
            <Reveal className="st-feature-wrap">
              <a className="st-feature" href={featureStory.href} lang={attr}>
                <figure className="st-feature-fig">
                  <img src={featureStory.img} alt={t(featureStory.alt)} loading="lazy" decoding="async" width={1600} height={900} style={featureStory.focus ? { objectPosition: featureStory.focus } : undefined} />
                </figure>
                <div className="st-feature-body">
                  {/* on a phone this pair is set into the photograph above */}
                  <span className="st-feature-top">
                    <span className="st-kicker">{t(featureStory.kicker)}</span>
                    <h3>{t(featureStory.title)}</h3>
                  </span>
                  <p>{t(featureStory.blurb)}</p>
                  <span className="text-link">{t(u.readStory)} <Arw /></span>
                </div>
              </a>
            </Reveal>
            <Reveal className="st-side">
              {moreStories.map(st => (
                <a key={st.slug} className={`st-row${st.ready ? '' : ' is-soon'}${st.mark ? ' has-mark' : ''}`} href={st.href} lang={attr}>
                  {st.mark && (
                    <span className="st-mark"><img src={st.img} alt="" loading="lazy" decoding="async" width={1254} height={1254} /></span>
                  )}
                  <span className="st-kicker">{t(st.kicker)}</span>
                  <h3>{t(st.title)}</h3>
                  <p>{t(st.blurb)}</p>
                  <span className="text-link">{st.ready ? t(u.readStory) : t(u.comingSoon)} <Arw /></span>
                </a>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---- closing: one statement, three ways in --------------------- */}
      <section id="involved" className="cta">
        <div className="container">
          <Reveal>
            <div className="cta-head">
              <div>
                <span className="section-number" lang={attr}>{t(u.ctaNumber)}</span>
                <h2 lang={attr}>{t(u.ctaTitle)}</h2>
              </div>
              <p className="cta-lead" lang={attr}>{t(u.ctaLead)}</p>
            </div>
          </Reveal>
          <div className="inv-list">
            {involve.map((x, i) => (
              <Reveal key={x.no} className={i === 0 ? 'inv-wrap is-lead' : 'inv-wrap'}>
                <a className="inv-row" href={x.href} id={x.id} lang={attr}>
                  <span className="inv-no">{x.no}</span>
                  <h3>{t(x.title)}</h3>
                  <p>{t(x.body)}</p>
                  <span className="inv-go">{t(u.getInTouch)} <Arw /></span>
                </a>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="cta-foot">
              <div className="cta-contact" id="contact">
                <small lang={attr}>{t(u.contact)}</small>
                <a className="mail" href={`mailto:${site.email}`}>{site.email}</a>
                <p lang={attr}>{t(site.address)}</p>
              </div>
              <a className="btn btn-fill" href={`mailto:${site.email}`} lang={attr}>{t(u.sendEnquiry)} <Arw /></a>
            </div>
          </Reveal>
        </div>
      </section>

    </main>
  </>;
}
