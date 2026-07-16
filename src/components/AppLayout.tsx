import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Globe, Users, Calendar, Heart, Trophy, X, User, Briefcase, Award } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SectionTitle from '@/components/SectionTitle';
import HomeContactForm from '@/components/HomeContactForm';
import { IMAGES, TABLERS, SOCIAL } from '@/data/rts';

const stats = [
  { icon: Users, label: 'Active Members', value: '15+' },
  { icon: Calendar, label: 'Years Active', value: '50+' },
  { icon: Heart, label: 'Funds Raised', value: 'US$40K+' },
  { icon: Trophy, label: 'Events Held', value: '100+' },
];

const upcomingEvents = [
  { date: 'Aug 2026', title: 'RTS Regatta 2026', desc: 'Our flagship annual fundraising event on the waters of Mahé.' },
  { date: 'Sep 2026', title: 'Monthly Meeting', desc: 'Regular member gathering to discuss upcoming projects and initiatives.' },
  { date: 'Oct 2026', title: 'Beach Cleanup Drive', desc: 'Community coastal cleanup across three beaches on Mahé.' },
];

type Tabler = { name: string; role: string; img: string };

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

const AppLayout: React.FC = () => {
  const { hash } = useLocation();
  const [selected, setSelected] = useState<Tabler | null>(null);

  useEffect(() => {
    if (hash === '#contact-form') {
      const el = document.getElementById('contact-form');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

  return (
    <PageLayout
      title="Round Table Seychelles | Adopt, Adapt, Improve"
      description="Round Table Seychelles unites young people through fellowship and community service."
    >
      {/* Hero */}
      <section className="relative min-h-[78vh] flex items-center">
        <img src={IMAGES.groupOutdoor} alt="Round Table Seychelles members celebrating together" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08142C]/92 via-[#08142C]/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#F88C24] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">Since 1973</span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
              Adopt. Adapt. <span className="text-[#F88C24]">Improve.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed">
              Round Table Seychelles unites young people through fellowship, friendship and meaningful service to our island community.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={SOCIAL.tablerWorld} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-[#08142C] transition-colors">
                <Globe size={20} /> Tabler.World
              </a>
              <Link to="/#contact-form" className="inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#e07d18] transition-colors">
                Join Us <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#08142C] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-center gap-2">
              <div className="h-12 w-12 rounded-full bg-[#F88C24]/20 flex items-center justify-center">
                <s.icon className="text-[#F88C24]" size={22} />
              </div>
              <span className="text-3xl font-extrabold text-white">{s.value}</span>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Innovations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-start">
          <div className="flex gap-6 items-start">
            <span className="hidden sm:flex text-[#F88C24] font-bold tracking-[0.3em] uppercase text-xs [writing-mode:vertical-rl] rotate-180 self-center">About Us</span>
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#08142C]">Modern Innovations</h2>
              <p className="mt-5 text-lg text-slate-600 leading-relaxed">
                Round Table Seychelles (RTS) is a vibrant community of young leaders dedicated to fellowship, service, and positive change. As members of the worldwide Round Table movement, we proudly support initiatives that uplift communities, inspire leadership, and make a meaningful difference across Seychelles.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 bg-[#F88C24] hover:bg-[#e07d18] text-white font-bold px-6 py-3 rounded-full transition-colors">
                Read More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img src="https://gaofwzgqiyehlsaupjrn.supabase.co/storage/v1/object/public/assets/RTS-Logo-Full-Colour-1-scaled-e1762233280869.png" alt="Round Table Seychelles emblem" className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-xl" />
          </div>
        </div>
      </section>

      {/* What is Round Table + Why — merged navy section */}
      <section className="bg-[#08142C] text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-20">

          {/* What is Round Table */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <img src={IMAGES.groupMeeting} alt="Round Table Seychelles members at a meeting" className="rounded-2xl object-cover w-full h-72 sm:h-96 order-2 md:order-1" />
            <div className="flex gap-6 items-start order-1 md:order-2">
              <div className="flex-1">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What is Round Table</h2>
                <p className="mt-5 text-lg leading-relaxed">
                  Round Table is a worldwide club for young people who want to make new friends and give something back to the community. Members organise social events, fundraisers and hands-on service projects — all underpinned by our motto, Adopt, Adapt, Improve.
                </p>
                <Link to="/about" className="mt-7 inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-6 py-3 rounded-full hover:bg-[#e07d18] transition-colors">
                  Read More <ArrowRight size={18} />
                </Link>
              </div>
              <span className="hidden sm:flex text-[#F88C24] font-bold tracking-[0.3em] uppercase text-xs [writing-mode:vertical-rl] self-center">Commitment</span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10" />

          {/* Why */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why</h2>
              <p className="mt-5 text-lg text-slate-300 leading-relaxed">
                Joining Round Table means building lifelong friendships, developing leadership skills, and creating a genuine, lasting impact across Seychelles. Whatever your background, there is a seat at the table for you.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-6 py-3 rounded-full hover:bg-[#e07d18] transition-colors">
                Read More <ArrowRight size={18} />
              </Link>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-black">
              <img src={IMAGES.globe} alt="Global Round Table network" className="absolute inset-0 w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white/90 font-bold tracking-widest uppercase text-sm">A Global Family</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tablers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Our People" title="Tablers" subtitle="The members driving change across the islands." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TABLERS.slice(0, 4).map((t) => (
              <div
                key={t.name}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelected(t)}
              >
                <div className="relative overflow-hidden aspect-square">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-[#08142C]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-xs font-semibold">Click to view profile</p>
                  </div>
                </div>
                <div className="p-4 text-center border-t border-slate-100">
                  <h4 className="font-bold text-[#08142C] text-sm">{t.name}</h4>
                  <p className="text-xs text-[#5998d3] font-semibold mt-1 leading-tight">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/tablers" className="inline-flex items-center gap-2 text-[#5998d3] font-bold hover:gap-3 transition-all">
              Meet all our Tablers <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="What's On" title="Upcoming Events" subtitle="Stay connected with what RTS has planned." />
          <div className="grid gap-6 md:grid-cols-3">
            {upcomingEvents.map((e) => (
              <div key={e.title} className="border-l-4 border-[#F88C24] bg-white rounded-r-2xl p-6 shadow-sm">
                <span className="inline-block bg-[#F88C24] text-white text-xs font-bold px-3 py-1 rounded-full mb-3">{e.date}</span>
                <h3 className="font-extrabold text-[#08142C] text-lg mb-2">{e.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <HomeContactForm />

      {selected && <TablerModal t={selected} onClose={() => setSelected(null)} />}
    </PageLayout>
  );
};

export default AppLayout;
