"use client";
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // The reduced-motion rule in globals.css only stops CSS animations and
    // transitions; GSAP tweens inline styles frame by frame and would still
    // run. Skip the reveal outright so the content is simply there.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // On a phone every one of these is a ScrollTrigger measuring and tweening
    // on the main thread while the user is scrolling, which is what made the
    // page feel heavy on a real device. Mobile gets no entrance animation at
    // all: the content is simply there, which also reads calmer.
    if (window.matchMedia('(max-width: 760px)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } });
    }, el);
    // Late-loading images (e.g. the hero/feature photos) change the page's
    // height after ScrollTrigger has already measured it, which can leave a
    // trigger's cached position stale and the reveal stuck mid-animation.
    // Re-measuring once everything has finished loading keeps every Reveal
    // instance reliable without altering the animation itself.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh);
    return () => { window.removeEventListener('load', refresh); ctx.revert(); };
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
