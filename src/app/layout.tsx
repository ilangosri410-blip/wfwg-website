import './globals.css';
import type { ReactNode } from 'react';
import LanguageProvider from '../components/LanguageProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata={title:'PIEC | People’s Initiative for Environmental Conservation',description:'Conserve | Together | Posterity'};


export default function RootLayout({children}:{children:ReactNode}){
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/assets/hero/ghats-portrait.jpg"
          media="(max-width:759px)" fetchPriority="high" />
        <link rel="preload" as="image" href="/assets/hero/ghats-wide.jpg"
          media="(min-width:760px)" fetchPriority="high" />
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
