import React, { useState } from 'react';
import { TreePine, Heart, GraduationCap, DollarSign } from 'lucide-react';
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

const impactStats = [
  { icon: DollarSign, value: 'SCR 1.2M+', label: 'Funds Raised' },
  { icon: Heart, value: '5,000+', label: 'People Helped' },
  { icon: TreePine, value: '5,000+', label: 'Trees Planted' },
  { icon: GraduationCap, value: '800+', label: 'Students Supported' },
];

const progressProjects = [
  { title: 'Beach Cleanup Drive', progress: 75, status: 'Ongoing', target: '16 beaches', current: '12 beaches restored' },
  { title: 'Reforestation Programme', progress: 50, status: 'Ongoing', target: '10,000 trees', current: '5,000 trees planted' },
  { title: 'Youth Mentorship Initiative', progress: 20, status: 'Upcoming', target: 'Launch Q2 2025', current: 'Planning phase' },
];

const beforeAfter = [
  {
    title: 'Beau Vallon Beach Cleanup',
    before: IMAGES.hero,
    after: IMAGES.trees,
    desc: 'Tonnes of waste removed and coastline restored to its natural beauty.',
  },
  {
    title: 'Reforestation Site',
    before: IMAGES.archival,
    after: IMAGES.trees,
    desc: 'Barren land transformed into thriving native forest.',
  },
];

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [beforeAfterActive, setBeforeAfterActive] = useState<number[]>([0, 0]);
  const list = filter === 'All' ? PROJECTS : PROJECTS.filter((p) => p.status === filter);

  const toggleBA = (i: number) => {
    setBeforeAfterActive((prev) => {
      const next = [...prev];
      next[i] = next[i] === 0 ? 1 : 0;
      return next;
    });
  };

  return (
    <PageLayout
      title="Projects | Round Table Seychelles"
      description="Discover the community service projects of Round Table Seychelles — ongoing, completed and upcoming initiatives transforming the islands."
    >
      <PageHero
        image={IMAGES.groupOutdoor}
        alt="Round Table Seychelles members celebrating together"
        eyebrow="Community Service"
        title="Adopt. Adapt. Improve."
        subtitle="Turning ideas into impact across the islands of Seychelles."
      />

      {/* Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <SectionTitle eyebrow="What We Do" title="Building Stronger Communities" />
          <p className="text-lg text-slate-600 leading-relaxed">
            From environmental conservation to education and healthcare, Round Table Seychelles delivers
            hands-on projects that respond to the real needs of our communities. Explore what we've
            achieved and what's coming next.
          </p>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="bg-[#08142C] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle light eyebrow="Our Impact" title="Total Impact Numbers" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
            {impactStats.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-3">
                <div className="h-14 w-14 rounded-full bg-[#F88C24]/20 flex items-center justify-center">
                  <s.icon className="text-[#F88C24]" size={26} />
                </div>
                <span className="text-3xl font-extrabold text-white">{s.value}</span>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracker */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Live Updates" title="Project Progress Tracker" subtitle="See how our ongoing projects are developing." />
          <div className="space-y-6">
            {progressProjects.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-[#08142C]">{p.title}</h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 mb-3">
                  <div
                    className="bg-[#F88C24] h-3 rounded-full transition-all duration-700"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span>{p.current}</span>
                  <span className="font-semibold text-[#08142C]">{p.progress}% — Target: {p.target}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Transformation" title="Before & After" subtitle="Click the image to see the difference we made." />
          <div className="grid gap-8 md:grid-cols-2">
            {beforeAfter.map((item, i) => (
              <div key={item.title} className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                <div className="relative cursor-pointer" onClick={() => toggleBA(i)}>
                  <img
                    src={beforeAfterActive[i] === 0 ? item.before : item.after}
                    alt={item.title}
                    className="w-full h-64 object-cover transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${beforeAfterActive[i] === 0 ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'}`}>
                      {beforeAfterActive[i] === 0 ? 'Before' : 'After'}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/90 text-[#08142C] text-xs font-bold px-3 py-1 rounded-full">
                    Click to toggle
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#08142C] mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="All Projects" title="Our Projects" />
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
