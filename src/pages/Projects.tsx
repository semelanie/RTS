import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, PROJECTS } from '@/data/rts';

const FILTERS = ['All', 'Ongoing', 'Completed', 'Upcoming'] as const;

const statusStyle: Record<string, string> = {
  Ongoing: 'bg-[#5998d3] text-white',
  Completed: 'bg-emerald-500 text-white',
  Upcoming: 'bg-[#F88C24] text-white',
};

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  return (
    <PageLayout
      title="Projects | Round Table Seychelles"
      description="Discover the community service projects of Round Table Seychelles \u2014 ongoing, completed and upcoming initiatives transforming the islands."
    >
      <PageHero
        image={IMAGES.groupOutdoor}
        alt="Round Table Seychelles members celebrating together"
        eyebrow="Community Service"
        title="Adopt. Adapt. Improve."
        subtitle="Turning ideas into impact across the islands of Seychelles."
      />


      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionTitle eyebrow="What We Do" title="Building Stronger Communities" />
          <p className="text-lg text-slate-600 leading-relaxed">
            From environmental conservation to education and healthcare, Round Table Seychelles delivers
            hands-on projects that respond to the real needs of our communities. Explore what we&rsquo;ve
            achieved and what&rsquo;s coming next.
          </p>
        </div>
      </section>

      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {FILTERS.map((f) => {
              const count = f === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.status === f).length;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-5 py-2.5 rounded-full font-bold transition-colors ${
                    filter === f ? 'bg-[#08142C] text-white' : 'bg-slate-100 text-[#08142C] hover:bg-[#5998d3] hover:text-white'
                  }`}
                >
                  {f} <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100">
                <div className="relative">
                  <img src={p.img} alt={p.title} className="w-full h-52 object-cover" />
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full ${statusStyle[p.status]}`}>
                    {p.status}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#08142C]">{p.title}</h3>
                    <span className="text-sm font-semibold text-slate-400">{p.year}</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed mb-4">{p.desc}</p>
                  <p className="text-sm font-semibold text-[#F88C24]">{p.beneficiaries}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Projects;
