import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, TABLERS } from '@/data/rts';

const pastChairmen = [
  { name: 'Andrew Pamlyre', term: '2023 – 2024' },
  { name: 'Alex Henderson', term: '2024 – 2025' },
  { name: 'Christopher Nicette', term: '2025 – 2026' },
  { name: 'Miguel Nolin', term: '2026 – 2027' },
];

const Tablers: React.FC = () => (
  <PageLayout
    title="Tablers | Round Table Seychelles"
    description="Meet the Tablers of Round Table Seychelles — the members, leaders and past chairmen who make our community service possible."
  >
    <PageHero
      image={IMAGES.groupOutdoor}
      alt="Round Table Seychelles members celebrating together"
      eyebrow="Our Members"
      title="Adopt. Adapt. Improve."
      subtitle="The people behind the purpose."
    />

    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SectionTitle eyebrow="The Experience" title="Life as a Tabler" />
        <p className="text-lg text-slate-600 leading-relaxed">
          Being a Tabler means more than attending meetings. It is a journey of friendship, personal growth
          and shared purpose. Members develop leadership skills, build a lifelong network of friends, travel
          to connect with Round Tables worldwide, and most importantly, make a real difference in Seychelles.
        </p>
      </div>
    </section>

    <section className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Membership" title="Our Tablers" subtitle="A diverse family of changemakers." />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {TABLERS.map((t, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-square">
                <img
                  src={t.img}
                  alt={`${t.name}, ${t.role}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[#08142C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-sm font-semibold text-center leading-snug">{t.role}</p>
                </div>
              </div>
              <div className="p-4 text-center border-t border-slate-100">
                <h4 className="font-bold text-[#08142C] text-sm sm:text-base">{t.name}</h4>
                <p className="text-xs text-[#5998d3] font-semibold mt-1 leading-tight">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Legacy" title="Past Chairmen" subtitle="Honouring those who led RTS." />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {pastChairmen.map((c, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm">
              <div className="h-14 w-14 rounded-full bg-[#08142C] flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-extrabold text-lg">{c.name.charAt(0)}</span>
              </div>
              <h4 className="font-bold text-[#08142C]">{c.name}</h4>
              <p className="text-sm text-[#F88C24] font-semibold mt-1">{c.term}</p>
              <p className="text-xs text-slate-500 mt-1">Chairman</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-[#08142C] text-center">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Become a Tabler?</h2>
        <p className="mt-4 text-slate-300 text-lg">Join a movement that grows friendships and gives back.</p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-8 py-4 rounded-full hover:bg-[#e07d18] transition-colors"
        >
          Apply for Membership <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  </PageLayout>
);

export default Tablers;
