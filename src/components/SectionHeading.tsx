import type { ReactNode } from 'react';

// Section openers read like a museum wall label: a hairline, a small index
// number, the title, and a short lead. `split` sets the lead beside the title
// instead of beneath it, so consecutive sections don't open identically.
export default function SectionHeading({ number, title, children, shortLead, dark = false, split = false, lang }:
  { number: string; title: ReactNode; children?: ReactNode; shortLead?: ReactNode; dark?: boolean; split?: boolean; lang?: string }) {
  return (
    <div className={`sh${dark ? ' on-dark' : ''}${split && children ? ' sh-split' : ''}`} lang={lang}>
      <div className="section-number">{number}</div>
      <h2 className="title">{title}</h2>
      {children && <p className={`lead${shortLead ? ' lead-lg' : ''}`}>{children}</p>}
      {/* the phone is served a condensed lead; this one is display:none there */}
      {shortLead && <p className="lead lead-sm">{shortLead}</p>}
    </div>
  );
}
