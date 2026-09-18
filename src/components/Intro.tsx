"use client";
import { useCallback, useEffect, useRef, useState } from 'react';

/*
  WFWG intro — a title card, not a loading screen.

  The opening frame is the hero photograph itself, graded down and held a beat
  behind the identity. When it releases, the grade lifts and the frame settles
  to exactly the crop and scale the hero already sits at, so the intro does not
  dissolve into a different picture: it becomes the page. That is the whole
  transition, and it costs nothing.

  Everything moves on transform and opacity, in CSS. There is no canvas, no
  requestAnimationFrame, no filter and no blur anywhere in this component —
  those were what made the old intro stutter on a phone. The only JavaScript is
  one timer, one skip handler and the scroll lock.
*/

const HOLD = 1900;   // the frame is held while the identity settles
const OUT = 700;     // and released into the homepage
const KEY = 'wfwg-intro-seen';

export default function Intro() {
  // Rendering nothing on the first client pass would flash the hero, so the
  // intro mounts and decides immediately whether it has already been shown.
  const [show, setShow] = useState(true);
  const [out, setOut] = useState(false);
  // The sequence starts when the photograph is actually on screen, so there is
  // no frame of empty ground and no pop-in behind the identity.
  const [ready, setReady] = useState(false);
  const done = useRef(false);
  const started = useRef(false);

  const release = useCallback(() => {
    if (done.current) return;
    done.current = true;
    setOut(true);
    try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
    window.setTimeout(() => {
      setShow(false);
      document.documentElement.classList.remove('intro-lock');
    }, OUT);
  }, []);

  useEffect(() => {
    // Seen once this session — a premium site does not make you watch it twice.
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === '1'; } catch { /* private mode */ }
    if (seen) { setShow(false); return; }

    document.documentElement.classList.add('intro-lock');
    // If the photograph is already in cache the load event may have fired
    // before this ran, and a very slow one must not hold the opening hostage.
    const fallback = window.setTimeout(() => setReady(true), 1200);

    // Any intent to move on takes the viewer straight through.
    const skip = () => release();
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchstart', skip, { passive: true });
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchstart', skip);
      document.documentElement.classList.remove('intro-lock');
    };
  }, [release]);

  // The hold begins once the frame is up, not once the component mounted.
  useEffect(() => {
    if (!ready || started.current) return;
    started.current = true;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(release, reduce ? 700 : HOLD);
    return () => window.clearTimeout(t);
  }, [ready, release]);

  if (!show) return null;

  return (
    <div className={`intro${ready ? ' is-ready' : ''}${out ? ' is-out' : ''}`} onClick={release} role="presentation">
      <div className="intro-frame">
        {/* the hero's own photograph, at the hero's own crop — the handoff is
            a settle rather than a cut, and the file is fetched only once */}
        <picture>
          <source media="(min-width:760px)" srcSet="/assets/hero/ghats-wide.jpg" />
          <img src="/assets/hero/ghats-portrait.jpg" alt="" width={1280} height={720}
            fetchPriority="high" decoding="async"
            onLoad={() => setReady(true)} onError={() => setReady(true)} />
        </picture>
      </div>
      <div className="intro-grade" />
      <div className="intro-id">
        <img className="intro-crest" src="/assets/wfwg-logo.png" alt="" width={1254} height={1254}
          fetchPriority="high" decoding="async" />
        <div className="intro-word">WFWG</div>
        <i className="intro-rule" aria-hidden="true" />
        <div className="intro-org">WILDLIFE FEDERATION OF WESTERN GHATS</div>
      </div>
    </div>
  );
}
