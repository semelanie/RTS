import React from 'react';

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  center?: boolean;
}

const SectionTitle: React.FC<Props> = ({ eyebrow, title, subtitle, light, center = true }) => (
  <div className={`${center ? 'text-center mx-auto' : ''} max-w-2xl mb-12`}>
    {eyebrow && (
      <span className="inline-block text-[#F88C24] font-bold tracking-widest uppercase text-xs mb-3">
        {eyebrow}
      </span>
    )}
    <h2 className={`text-3xl sm:text-4xl font-extrabold ${light ? 'text-white' : 'text-[#08142C]'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-lg ${light ? 'text-slate-300' : 'text-slate-600'}`}>{subtitle}</p>
    )}
  </div>
);

export default SectionTitle;
