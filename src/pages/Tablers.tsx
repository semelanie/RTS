import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, TABLERS } from '@/data/rts';

const pastChairmen = TABLERS.slice(0, 4);

const Tablers: React.FC = () => (
  <PageLayout
    title="Tablers | Round Table Seychelles"
    description="Meet the Tablers of Round Table Seychelles \u2014 the members, leaders and past chairmen who make our community service possible."
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
            <div key={i} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-shadow">
              <img src={t.img} alt={`${t.name}, ${t.role}`} className="w-full aspect-square object-cover" />
              <div className="p-4 text-center">
                <h4 className="font-bold text-[#08142C]">{t.name}</h4>
                <p className="text-sm text-[#5998d3] font-semibold">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Legacy" title="Past Chairmen & Founders" subtitle="Honouring those who shaped RTS." />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {pastChairmen.map((t, i) => (
            <div key={i} className="text-center">
              <img src={t.img} alt={`${t.name}, past chairman`} className="w-full aspect-square object-cover rounded-2xl mb-3 grayscale hover:grayscale-0 transition-all" />
              <h4 className="font-bold text-[#08142C]">{t.name}</h4>
              <p className="text-sm text-slate-500 font-semibold">Past Chairman</p>
            </div>
          ))}
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
  </PageLayout>
);

export default Tablers;
