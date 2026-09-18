"use client";
import { useEffect, useRef, useState } from 'react';
import type { L, Lang, Species } from '../data/site';
import { wildlife, tx } from '../data/site';
import { useLanguage } from './LanguageProvider';

const Arw = () => <span className="arw" aria-hidden="true">↗</span>;

type Cat = 'animal' | 'bird' | 'plant';
const CATS: { id: Cat; hash: string }[] = [
  { id: 'animal', hash: 'wildlife-animals' },
  { id: 'bird', hash: 'wildlife-birds' },
  { id: 'plant', hash: 'wildlife-plants' },
];

// Index numbers run 01–10 across the whole collection, in data order, so a
// species can be referred to by number the way a catalogue would.
const num = (slug: string) => String(wildlife.findIndex(s => s.slug === slug) + 1).padStart(2, '0');
const flagshipOf = (c: Cat) => {
  const inCat = wildlife.filter(s => s.group === c);
  return inCat.find(s => s.featured) ?? inCat.find(s => s.lead) ?? inCat[0];
};

// A specimen cabinet: a typographic index on the left, one large plate on the
// right. Only one photograph is ever on screen, so each one can be shown
// properly; the full research record opens beneath on demand.
export default function SpeciesBrowser() {
  const [cat, setCat] = useState<Cat>('animal');
  const [slug, setSlug] = useState<string>(() => flagshipOf('animal').slug);
  const [openRecord, setOpenRecord] = useState(false);
  // Which plate has actually decoded. Switching species swaps a photograph that
  // may not be cached yet; rather than show a half-drawn image the plate holds
  // its surface and the new one fades in once it is ready.
  const [loaded, setLoaded] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { lang, t, attr, u } = useLanguage();

  // The header's Wildlife menu links to #wildlife-animals / -birds / -plants;
  // honour those so the nav reaches a category without scrolling the page.
  useEffect(() => {
    const apply = () => {
      const hit = CATS.find(c => `#${c.hash}` === window.location.hash);
      if (hit) select(hit.id);
    };
    apply();
    window.addEventListener('hashchange', apply);
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  const select = (c: Cat) => { setCat(c); setSlug(flagshipOf(c).slug); setOpenRecord(false); };

  // On mobile the index is a horizontal rail; keep the chosen species in view
  // so the selection never scrolls itself off screen.
  const choose = (next: string) => {
    setSlug(next);
    setOpenRecord(false);
    const el = listRef.current?.querySelector<HTMLElement>(`[data-slug="${next}"]`);
    el?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  };

  // The record opens as a sheet on small screens. Lock the page behind it and
  // let Escape close it, the way any dialog should behave.
  useEffect(() => {
    document.documentElement.classList.toggle('sx-open', openRecord);
    if (!openRecord) return;
    const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpenRecord(false); };
    window.addEventListener('keydown', esc);
    return () => { window.removeEventListener('keydown', esc); document.documentElement.classList.remove('sx-open'); };
  }, [openRecord]);

  // Warm the neighbours of the current selection so stepping along the rail —
  // which is how nearly all switching happens — is instant. Two images, on idle,
  // and only after the visible one has decoded.
  useEffect(() => {
    if (loaded !== slug) return;
    const list = wildlife.filter(s => s.group === cat);
    const i = list.findIndex(s => s.slug === slug);
    const near = [list[i - 1], list[i + 1]].filter(Boolean);
    const warm = () => near.forEach(s => { const im = new Image(); im.src = s.img; });
    const ric = (window as unknown as { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback;
    const id = ric ? ric(warm) : window.setTimeout(warm, 400);
    return () => { if (!ric) window.clearTimeout(id as number); };
  }, [slug, cat, loaded]);

  const catLabel = (c: Cat) => t(c === 'animal' ? u.catAnimals : c === 'bird' ? u.catBirds : u.catPlants);
  const oneLabel = (c: Cat) => t(c === 'animal' ? u.oneAnimal : c === 'bird' ? u.oneBird : u.onePlant);

  const items = wildlife.filter(s => s.group === cat);
  const shown = wildlife.find(s => s.slug === slug) ?? items[0];

  return (
    <>
      <div className="cab">
        {/* the index rail: categories, the species in that category, the sources */}
        <div className="cab-rail">
          <div className="wtabs" role="tablist" aria-label={t(u.catAnimalsAria)}>
            {CATS.map(c => (
              <button key={c.id} type="button" role="tab" id={c.hash} className="wtab"
                aria-selected={cat === c.id} aria-controls="species-plate"
                onClick={() => select(c.id)} lang={attr}>
                {catLabel(c.id)}<i>{String(wildlife.filter(s => s.group === c.id).length).padStart(2, '0')}</i>
              </button>
            ))}
          </div>
          {/* on a phone the index is a swipe rail, so it states its own length */}
          <div className="cab-count" aria-hidden="true">
            <b>{String(items.findIndex(s => s.slug === shown.slug) + 1).padStart(2, '0')}</b>
            <i>/</i>
            <span>{String(items.length).padStart(2, '0')}</span>
          </div>
          <div className="cab-list" ref={listRef}>
            {items.map(s => (
              <button key={s.slug} type="button" className="cab-row" data-slug={s.slug}
                aria-current={s.slug === shown.slug}
                aria-controls="species-plate" onClick={() => choose(s.slug)}>
                <span className="cab-n">{num(s.slug)}</span>
                <span>
                  <span className="cab-name" lang={attr}>{t(s.name)}</span>
                  {/* the documented Tamil name rides with the English one in the
                      index, so a Tamil reader can scan the list directly */}
                  {s.nameTamil && <span className="cab-ta" lang="ta">{s.nameTamil}</span>}
                  <span className="cab-sci">{s.sci}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* the plate: one species, shown properly */}
        <div className="cab-main" id="species-plate" role="tabpanel">
          <figure className={`cab-plate${shown.frame === 'tall' ? ' is-tall' : ''}${loaded === shown.slug ? '' : ' is-loading'}`}>
            <img key={shown.slug} src={shown.img} alt={`${t(shown.name)} (${shown.sci})`} loading="lazy" decoding="async" width={1300} height={780}
              onLoad={() => setLoaded(shown.slug)}
              style={shown.focus ? { objectPosition: shown.focus } : undefined} />
            {shown.flag && <figcaption className="wflag" lang={attr}>{t(shown.flag)}</figcaption>}
            {shown.specimen && <figcaption className="sx-plate" lang={attr}>{t(u.specimenNote)}</figcaption>}
          </figure>
          <div className="cab-id">
            <div>
              <span className="section-number" lang={attr}>{num(shown.slug)} · {oneLabel(cat)}</span>
              <h3 lang={attr}>{t(shown.name)}</h3>
              {shown.nameTamil && <p className="sx-ta" lang="ta">{shown.nameTamil}</p>}
              <p className="sx-sci">{shown.sci}</p>
              <div className="pills" lang={attr}>
                {shown.endemic && <span className="pill">{t(u.pillEndemic)}</span>}
                <span className={shown.rare ? 'pill is-rare' : 'pill'}>{t(shown.statusLabel)}</span>
                <span className="pill">IUCN {shown.status}</span>
              </div>
            </div>
            <div>
              <p className="cab-blurb" lang={attr}>{t(shown.intro)}</p>
              <button type="button" className="cab-open" aria-expanded={openRecord} aria-controls="species-record"
                onClick={() => setOpenRecord(v => !v)} lang={attr}>
                <span className="cab-mark" aria-hidden="true">{openRecord ? '–' : '+'}</span>
                <span>{openRecord ? t(u.closeRecord) : t(u.openRecord)}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="cab-note" id="wildlife-sources">
          <p className="lead-lg" lang={attr}>{t(u.sourcesNote)}</p>
          {/* the phone is served the sourcing claim only; this one is display:none there */}
          <p className="lead-sm" lang={attr}>{t(u.sourcesNoteShort)}</p>
          <a className="text-link" href="/stories/western-ghats" lang={attr}>{t(u.whySpecies)} <Arw /></a>
        </div>
      </div>

      {openRecord && <Record s={shown} lang={lang} onClose={() => setOpenRecord(false)} />}
    </>
  );
}

// The full research record — every field we hold on a species.
function Record({ s, lang, onClose }: { s: Species; lang: Lang; onClose: () => void }) {
  const { t, attr, u } = useLanguage();
  const v = (f: L | undefined) => (f ? tx(f, lang) : undefined);
  return (
    <>
    <div className="sx-scrim" onClick={onClose} aria-hidden="true" />
    <div className="sx-record" id="species-record" lang={attr} role="dialog" aria-modal="true"
      aria-label={t(s.name)}>
      <div className="sx-record-head">
        <h4>{t(s.name)}
          {s.nameTamil && <span className="sx-rec-ta" lang="ta">{s.nameTamil}</span>}
          <span className="sx-sci">{s.sci}</span></h4>
        <button type="button" className="sx-close" onClick={onClose}>
          <span className="sx-mark" aria-hidden="true">–</span><span>{t(u.closeRecordShort)}</span>
        </button>
      </div>
      <div className="sx-record-grid">
        <dl className="facts">
          <div><dt>{t(u.fHabitat)}</dt><dd>{v(s.habitat)}</dd></div>
          {s.range && <div><dt>{t(u.fRange)}</dt><dd>{v(s.range)}</dd></div>}
          {s.elevation && <div><dt>{t(u.fElevation)}</dt><dd>{v(s.elevation)}</dd></div>}
          {s.size && <div><dt>{t(u.fSize)}</dt><dd>{v(s.size)}</dd></div>}
          {s.diet && <div><dt>{t(u.fDiet)}</dt><dd>{v(s.diet)}</dd></div>}
          {s.lifespan && <div><dt>{t(u.fLifespan)}</dt><dd>{v(s.lifespan)}</dd></div>}
          {s.population && <div><dt>{t(u.fPopulation)}</dt><dd>{v(s.population)}</dd></div>}
          {s.populationTrend && <div><dt>{t(u.fTrend)}</dt><dd>{v(s.populationTrend)}</dd></div>}
          <div><dt>{t(u.fStatus)}</dt><dd>{t(s.statusLabel)} · IUCN {s.status}
            {s.statusNote && <em className="fact-note">{v(s.statusNote)}</em>}</dd></div>
        </dl>
        <div className="sx-prose">
          {s.behaviour && <p className="sx-para"><b>{t(u.pBehaviour)} — </b>{v(s.behaviour)}</p>}
          {s.breeding && <p className="sx-para"><b>{t(u.pBreeding)} — </b>{v(s.breeding)}</p>}
          {s.threats && <p className="sx-para"><b>{t(u.pThreats)} — </b>{v(s.threats)}</p>}
          {s.significance && <p className="sx-para"><b>{t(u.pSignificance)} — </b>{v(s.significance)}</p>}
          {s.wgConnection && <p className="sx-para"><b>{t(u.pWgConnection)} — </b>{v(s.wgConnection)}</p>}
          {s.interesting && <p className="sx-para"><b>{t(u.pInteresting)} — </b>{v(s.interesting)}</p>}
          {s.imageNote && <p className="sx-image-note">{v(s.imageNote)}</p>}
        </div>
        <div className="sx-meta">
          <span>{t(u.photograph)} — {s.credit} · {s.license}</span>
          <a className="sx-source" href={s.source} target="_blank" rel="noopener noreferrer">{t(s.sourceLabel)} <Arw /></a>
        </div>
      </div>
    </div>
    </>
  );
}
