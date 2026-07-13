import React from 'react';

interface Props {
  image: string;
  alt: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

const PageHero: React.FC<Props> = ({ image, alt, eyebrow, title, subtitle }) => (
  <section className="relative h-[52vh] min-h-[360px] flex items-center">
    <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#08142C]/90 to-[#08142C]/50" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 w-full">
      {eyebrow && (
        <span className="inline-block bg-[#F88C24] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-4">
          {eyebrow}
        </span>
      )}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white max-w-3xl">{title}</h1>
      {subtitle && <p className="mt-4 text-lg text-slate-200 max-w-2xl">{subtitle}</p>}
    </div>
  </section>
);

export default PageHero;
