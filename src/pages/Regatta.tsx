import React from 'react';
import { Link } from 'react-router-dom';
import { Sailboat, HeartHandshake, Trophy, ArrowRight, Crown } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES } from '@/data/rts';

const gallery = [IMAGES.regatta, IMAGES.hero, IMAGES.gala, IMAGES.trees, IMAGES.school, IMAGES.archival];

const stories = [
  { name: 'Beau Vallon School', text: 'Funds from the 2022 Regatta built a new library serving over 400 students.' },
  { name: "Children's Cancer Fund", text: 'A record SCR 800,000 was raised in 2023 to support treatment and family care.' },
  { name: 'Marine Conservation', text: 'Proceeds funded reef restoration projects across three protected lagoons.' },
];

const ways = [
  { icon: Sailboat, title: 'Participate', text: 'Enter your boat or join a crew for the race of the year.' },
  { icon: HeartHandshake, title: 'Donate', text: 'Every contribution directly funds RTS community projects.' },
  { icon: Trophy, title: 'Sponsor', text: 'Partner with us and showcase your brand to thousands of attendees.' },
];

const pastMissRegatta = [
  { year: '2024', name: 'Miss Emmaline Contoret', desc: 'Championed youth empowerment and cultural preservation.' },
  { year: '2023', name: 'Miss Blank', desc: '' },
  { year: '2022', name: 'Miss Blank', desc: '' },
];

const Regatta: React.FC = () => (
  <PageLayout
    title="The RTS Regatta | Round Table Seychelles"
    description="The Round Table Seychelles Regatta is our flagship fundraising event. Learn its history, community impact, and how to participate, donate or sponsor."
  >
    <PageHero
      image={IMAGES.regatta}
      alt="Colourful sailing boats racing in the RTS Regatta"
      eyebrow="Flagship Event"
      title="The RTS Regatta"
      subtitle="The biggest fundraising event in our calendar — sailing for a cause."
    />

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <img src={IMAGES.regatta} alt="RTS Regatta sailing boats" className="rounded-2xl w-full h-80 object-cover" />
        <div>
          <SectionTitle eyebrow="Background" title="A Tradition Since 1978" center={false} />
          <p className="text-slate-600 leading-relaxed mb-4">
            The Round Table Seychelles Regatta began in 1978 as a spirited sailing competition and has since
            grown into the island's most anticipated charity event. Each year, sailors, sponsors and
            spectators gather on the turquoise waters to celebrate community and raise vital funds.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Beyond the thrill of the race, the Regatta embodies the RTS spirit: bringing people together for
            fellowship while channelling their energy into causes that transform lives across Seychelles.
          </p>
        </div>
      </div>
    </section>

    {/* Current Miss Regatta */}
    <section className="py-20 bg-[#08142C]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <SectionTitle light eyebrow="Miss Regatta 2025" title="Current Miss Regatta" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col items-center gap-4">
          <div className="h-20 w-20 rounded-full bg-[#F88C24]/20 flex items-center justify-center">
            <Crown className="text-[#F88C24]" size={36} />
          </div>
          <h3 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Gaelle Morel <Crown className="text-[#F88C24]" size={20} />
          </h3>
          <p className="text-[#F88C24] font-semibold">Miss Regatta 2025</p>
          <p className="text-slate-300 leading-relaxed max-w-xl">
            Representing Regatta Kreolite 2025 with grace and community.
          </p>
        </div>
      </div>
    </section>

    {/* Past Miss Regatta */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Legacy" title="Past Miss Regatta" subtitle="Celebrating the ambassadors of our flagship event." />
        <div className="grid gap-6 sm:grid-cols-3">
          {pastMissRegatta.map((m) => (
            <div key={m.year} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
              <div className="h-14 w-14 rounded-full bg-[#F88C24]/10 flex items-center justify-center mx-auto mb-4">
                <Crown className="text-[#F88C24]" size={24} />
              </div>
              <p className="text-sm font-bold text-[#5998d3] mb-1">Miss Regatta {m.year}</p>
              <h3 className="text-lg font-extrabold text-[#08142C] flex items-center justify-center gap-1">
                {m.name} <Crown className="text-[#F88C24]" size={14} />
              </h3>
              {m.desc && <p className="text-slate-500 text-sm mt-2 leading-relaxed">{m.desc}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Gallery" title="Past Regattas" subtitle="Moments from regattas gone by." />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {gallery.map((src, i) => (
            <img key={i} src={src} alt={`Past RTS Regatta highlight ${i + 1}`} className="w-full h-56 object-cover rounded-xl hover:opacity-90 transition-opacity" />
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Impact" title="Stories from Beneficiaries" subtitle="Where the funds go." />
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((s) => (
            <div key={s.name} className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="text-lg font-bold text-[#5998d3] mb-3">{s.name}</h3>
              <p className="text-slate-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-[#08142C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle light eyebrow="Get Involved" title="Be Part of the Regatta" subtitle="Three ways to join the movement on the water." />
        <div className="grid gap-8 md:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
              <div className="h-14 w-14 mx-auto rounded-xl bg-[#F88C24]/20 flex items-center justify-center mb-6">
                <w.icon className="text-[#F88C24]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{w.title}</h3>
              <p className="text-slate-300 leading-relaxed">{w.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-8 py-4 rounded-full hover:bg-[#e07d18] transition-colors">
            Participate, Donate or Sponsor <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Regatta;
