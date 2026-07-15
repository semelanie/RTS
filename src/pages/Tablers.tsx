import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X, User, Award, Briefcase, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, TABLERS } from '@/data/rts';

const ALL_PAST_CHAIRMEN = [
  { no: 1, name: 'Serge Pool', term: '1974–1975' },
  { no: 2, name: 'Mike Dunford', term: '1975–1976' },
  { no: 3, name: 'Bernard Rassool', term: '1976–1977' },
  { no: 4, name: 'Jacque Moulinie', term: '1977–1978' },
  { no: 5, name: 'Bill Dixson', term: '1978–1979' },
  { no: 6, name: 'Bernard Pool', term: '1979–1980' },
  { no: 7, name: 'Steve Butterworth', term: '1980–1981' },
  { no: 8, name: 'Bernard Petit', term: '1981–1982' },
  { no: 9, name: 'Charles Pool', term: '1982–1983' },
  { no: 10, name: 'Jamshed Pardiwalla', term: '1983–1984' },
  { no: 11, name: 'Stephen Rousseau', term: '1984–1985' },
  { no: 12, name: 'Robert Morgan', term: '1985–1986' },
  { no: 13, name: 'Michel Felix', term: '1986–1987' },
  { no: 14, name: 'Percy Grandcourt', term: '1987–1988' },
  { no: 15, name: 'Rene Michel', term: '1988–1989' },
  { no: 16, name: 'Arnold Chetty', term: '1989–1990' },
  { no: 17, name: 'Serge Durup', term: '1990–1991' },
  { no: 18, name: 'Dilip Shah', term: '1991–1992' },
  { no: 19, name: 'Milton Durup', term: '1992–1993' },
  { no: 20, name: 'Philipe Esparon', term: '1993–1994' },
  { no: 21, name: 'Daraius Oliaji', term: '1994–1995' },
  { no: 22, name: 'Bernard Moutia', term: '1995–1996' },
  { no: 23, name: 'Harry Tirant', term: '1996–1997' },
  { no: 24, name: 'Albert Jean-Louis', term: '1997–1998' },
  { no: 25, name: 'Kevin Bresson', term: '1998–1999' },
  { no: 26, name: 'Charles Loizeau', term: '1999–2000' },
  { no: 27, name: 'Marlon Montano', term: '2000–2001' },
  { no: 28, name: 'Michael Bestrong', term: '2001–2002' },
  { no: 29, name: 'Nigel Pillay', term: '2002–2003' },
  { no: 30, name: 'Robert Stravens', term: '2003–2004' },
  { no: 31, name: 'Andy Moncherry', term: '2004–2005' },
  { no: 32, name: 'Ray Hoareau', term: '2005–2006' },
  { no: 33, name: 'Joel Stravens', term: '2006–2007' },
  { no: 34, name: 'Christophe Houareau', term: '2007–2008' },
  { no: 35, name: 'Elvis Chetty', term: '2008–2009' },
  { no: 36, name: 'Ashvin Seeboo', term: '2009–2010' },
  { no: 37, name: 'Christian Larue', term: '2010–2011' },
  { no: 38, name: 'Bernard Belpech', term: '2011–2012' },
  { no: 39, name: 'Danny Fontaine', term: '2012–2013' },
  { no: 40, name: 'Vincent Kim Koon', term: '2013–2014' },
  { no: 41, name: 'Shantilal Dhanjee', term: '2014–2015' },
  { no: 42, name: 'Lenny Gabriel', term: '2015–2016' },
  { no: 43, name: 'Abison De Giorgio', term: '2016–2017' },
  { no: 44, name: 'Rudy De Ker Sauzon Vielle', term: '2017–2018' },
  { no: 45, name: "Allain L'Etourdie", term: '2018–2019' },
  { no: 46, name: 'Gert Smit', term: '2019–2020' },
  { no: 47, name: 'Darrel Benoit', term: '2020–2021' },
  { no: 48, name: 'Rama De Ker Sauzon Vielle', term: '2021–2022' },
  { no: 49, name: 'Alex Freminot', term: '2022–2023' },
  { no: 50, name: 'Andrew Palmyre', term: '2023–2024' },
  { no: 51, name: 'Mick Roucou & Alex Henderson', term: '2024–2025' },
  { no: 52, name: 'Christopher Nicette', term: '2025–2026' },
  { no: 53, name: 'Miguel Nolin', term: '2026–2027' },
];

const RECENT_CHAIRMEN = ALL_PAST_CHAIRMEN.slice(-4);

type Tabler = { name: string; role: string; img: string };

const TablerCard = ({ t, onClick }: { t: Tabler; onClick: () => void }) => (
  <div
    className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    onClick={onClick}
  >
    <div className="relative overflow-hidden aspect-square">
      <img
        src={t.img}
        alt={t.name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-[#08142C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
        <p className="text-white text-sm font-semibold text-center">Click to view profile</p>
      </div>
    </div>
    <div className="p-4 text-center border-t border-slate-100">
      <h4 className="font-bold text-[#08142C] text-sm sm:text-base">{t.name}</h4>
      <p className="text-xs text-[#5998d3] font-semibold mt-1 leading-tight">{t.role}</p>
    </div>
  </div>
);

const TablerModal = ({ t, onClose }: { t: Tabler; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden" onClick={(e) => e.stopPropagation()}>
      <div className="relative">
        <img src={t.img} alt={t.name} className="w-full h-64 object-cover" />
        <button onClick={onClose} className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 hover:bg-white transition-colors">
          <X size={18} className="text-[#08142C]" />
        </button>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-extrabold text-[#08142C]">{t.name}</h3>
        <p className="text-[#F88C24] font-semibold text-sm mt-1">{t.role}</p>
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#F88C24]/10 flex items-center justify-center shrink-0">
              <User size={16} className="text-[#F88C24]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Member Since</p>
              <p className="text-sm text-[#08142C] font-semibold">2023</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#5998d3]/10 flex items-center justify-center shrink-0">
              <Briefcase size={16} className="text-[#5998d3]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Roles & Positions</p>
              <p className="text-sm text-[#08142C] font-semibold">{t.role}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-9 w-9 rounded-full bg-[#08142C]/10 flex items-center justify-center shrink-0">
              <Award size={16} className="text-[#08142C]" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Awards & Recognition</p>
              <p className="text-sm text-[#08142C] font-semibold">—</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Tablers: React.FC = () => {
  const [selected, setSelected] = useState<Tabler | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <PageLayout
      title="Tablers | Round Table Seychelles"
      description="Meet the Tablers of Round Table Seychelles."
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
          <SectionTitle eyebrow="Membership" title="Our Tablers" subtitle="Click a portrait to view their profile." />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {TABLERS.map((t, i) => (
              <TablerCard key={i} t={t} onClick={() => setSelected(t)} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Legacy" title="Past Chairmen" subtitle="Honouring those who led RTS." />

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-10">
            {RECENT_CHAIRMEN.map((c) => (
              <div key={c.no} className="bg-white rounded-2xl p-6 text-center border border-slate-100 shadow-sm">
                <div className="h-14 w-14 rounded-full bg-[#08142C] flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-extrabold text-lg">{c.name.charAt(0)}</span>
                </div>
                <h4 className="font-bold text-[#08142C] text-sm">{c.name}</h4>
                <p className="text-sm text-[#F88C24] font-semibold mt-1">{c.term}</p>
                <p className="text-xs text-slate-500 mt-1">Chairman</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto">
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-between bg-[#08142C] text-white font-bold px-6 py-4 rounded-xl hover:bg-[#0d1f3c] transition-colors"
            >
              <span>View All Past Chairmen ({ALL_PAST_CHAIRMEN.length})</span>
              {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showAll && (
              <div className="mt-2 bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                {ALL_PAST_CHAIRMEN.map((c) => (
                  <div key={c.no} className="flex items-center justify-between px-6 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-slate-400 w-6">{c.no}</span>
                      <span className="font-semibold text-[#08142C]">{c.name}</span>
                    </div>
                    <span className="text-sm text-[#F88C24] font-semibold">{c.term}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#08142C] text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Ready to Become a Tabler?</h2>
          <p className="mt-4 text-slate-300 text-lg">Join a movement that grows friendships and gives back.</p>
          <Link to="/contact" className="mt-8 inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-8 py-4 rounded-full hover:bg-[#e07d18] transition-colors">
            Apply for Membership <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {selected && <TablerModal t={selected} onClose={() => setSelected(null)} />}
    </PageLayout>
  );
};

export default Tablers;
