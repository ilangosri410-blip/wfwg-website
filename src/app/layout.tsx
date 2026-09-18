import './globals.css';
import type { ReactNode } from 'react';
import LanguageProvider from '../components/LanguageProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata={title:'WFWG | Wildlife Federation of Western Ghats',description:'Conserve | Together | Posterity'};

// Decided before the first paint rather than in an effect: a returning visitor
// would otherwise see one frame of the intro before React could take it away,
// and the page would be unlocked for a frame before it was locked. Reading the
// flag here costs nothing and removes both flashes.
const INTRO_FLAG = `try{var h=document.documentElement;
h.className+=(sessionStorage.getItem('wfwg-intro-seen')==='1')?' intro-seen':' intro-lock';
}catch(e){document.documentElement.className+=' intro-lock';}`;

export default function RootLayout({children}:{children:ReactNode}){
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/hero/ghats-portrait.jpg"
          media="(max-width:759px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/assets/hero/ghats-wide.jpg"
          media="(min-width:760px)" fetchPriority="high" />
        <script dangerouslySetInnerHTML={{ __html: INTRO_FLAG }} />
      </head>
      <body>
        <LanguageProvider>
          <a className="skip-link" href="#top">Skip to content</a>
          <Header />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
