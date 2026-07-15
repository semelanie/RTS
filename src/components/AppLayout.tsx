import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Globe } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import SectionTitle from '@/components/SectionTitle';
import HomeContactForm from '@/components/HomeContactForm';
import { IMAGES, TABLERS, SOCIAL } from '@/data/rts';

const AppLayout: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#contact-form') {
      const el = document.getElementById('contact-form');
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

  return (
    <PageLayout
      title="Round Table Seychelles | Adopt, Adapt, Improve"
      description="Round Table Seychelles unites young people through fellowship and community service. Discover our projects, history, the famous Regatta, and how to join."
    >
      {/* Hero */}
      <section className="relative min-h-[78vh] flex items-center">
        <img src={IMAGES.groupOutdoor} alt="Round Table Seychelles members celebrating together" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08142C]/92 via-[#08142C]/70 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="max-w-2xl">
            <span className="inline-block bg-[#F88C24] text-white text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6">
              Since 1973
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
              Adopt. Adapt. <span className="text-[#F88C24]">Improve.</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-200 leading-relaxed">
              Round Table Seychelles unites young people through fellowship, friendship and
              meaningful service to our island community.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href={SOCIAL.tablerWorld}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-bold px-7 py-3.5 rounded-full hover:bg-white hover:text-[#08142C] transition-colors"
              >
                <Globe size={20} /> Tabler.World
              </a>
              <Link
                to="/#contact-form"
                className="inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#e07d18] transition-colors"
              >
                Join Us <ArrowRight size={20} />
              </Link>
            </div>
          </div>
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
                Round Table Seychelles (RTS) is a vibrant community of young leaders dedicated to fellowship,
                service, and positive change. As members of the worldwide Round Table movement, we proudly
                support initiatives that uplift communities, inspire leadership, and make a meaningful
                difference across Seychelles.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 bg-[#F88C24] hover:bg-[#e07d18] text-white font-bold px-6 py-3 rounded-full transition-colors">
                Read More <ArrowRight size={18} />
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src="https://gaofwzgqiyehlsaupjrn.supabase.co/storage/v1/object/public/assets/RTS-Logo-Full-Colour-1-scaled-e1762233280869.png"
              alt="Round Table Seychelles emblem"
              className="w-64 h-64 sm:w-80 sm:h-80 object-contain drop-shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* What is Round Table */}
      <section className="bg-[#08142C] text-slate-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
          <img src={IMAGES.groupMeeting} alt="Round Table Seychelles members at a meeting" className="rounded-2xl object-cover w-full h-72 sm:h-96 order-2 md:order-1" />
          <div className="flex gap-6 items-start order-1 md:order-2">
            <div className="flex-1">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">What is Round Table</h2>
              <p className="mt-5 text-lg leading-relaxed">
                Round Table is a worldwide club for young people who want to make new friends and give something
                back to the community. Members organise social events, fundraisers and hands-on service projects
                — all underpinned by our motto, Adopt, Adapt, Improve.
              </p>
              <Link to="/about" className="mt-7 inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-6 py-3 rounded-full hover:bg-[#e07d18] transition-colors">
                Read More <ArrowRight size={18} />
              </Link>
            </div>
            <span className="hidden sm:flex text-[#F88C24] font-bold tracking-[0.3em] uppercase text-xs [writing-mode:vertical-rl] self-center">Commitment</span>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="bg-[#08142C] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Why</h2>
            <p className="mt-5 text-lg text-slate-300 leading-relaxed">
              Joining Round Table means building lifelong friendships, developing leadership skills, and creating
              a genuine, lasting impact across Seychelles. Whatever your background, there is a seat at the table
              for you.
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
      </section>

      {/* Tablers */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Our People" title="Tablers" subtitle="The members driving change across the islands." />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {TABLERS.slice(0, 4).map((t) => (
              <div key={t.name} className="text-center bg-slate-50 rounded-2xl p-4 border border-slate-100">
                <img src={t.img} alt={`${t.name}, ${t.role}`} className="w-full aspect-square object-cover rounded-xl mb-3" />
                <h4 className="font-bold text-[#08142C]">{t.name}</h4>
                <p className="text-sm text-[#5998d3] font-semibold">{t.role}</p>
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

      {/* Contact form + Regatta details */}
      <HomeContactForm />
    </PageLayout>
  );
};

export default AppLayout;
