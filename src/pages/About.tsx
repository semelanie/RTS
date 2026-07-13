import React from 'react';
import { Eye, Target, Gem, Globe } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, LEADERSHIP } from '@/data/rts';

const pillars = [
  { icon: Eye, title: 'Our Vision', text: 'A united, thriving Seychelles where young people lead positive change through service and fellowship.' },
  { icon: Target, title: 'Our Mission', text: 'To bring together young men and women to develop their potential, build friendships, and serve their communities.' },
  { icon: Gem, title: 'Core Values', text: 'Fellowship, integrity, service, leadership and respect for diversity guide everything we do.' },
];

const About: React.FC = () => (
  <PageLayout
    title="About Us | Round Table Seychelles"
    description="Learn about Round Table Seychelles \u2014 our vision, mission, core values, leadership team and connection to the global Round Table movement."
  >
    <PageHero
      image={IMAGES.groupOutdoor}
      alt="Round Table Seychelles members celebrating together"
      eyebrow="About Us"
      title="Adopt. Adapt. Improve."
      subtitle="A fellowship of young people dedicated to serving Seychelles."
    />

    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Our Purpose" title="A little something about us" subtitle="Founded on friendship and powered by purpose." />
        <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>
            Round Table Seychelles is a branch of the international Round Table service organisation. It was
            originally chartered under ARTIO and later ARTEA, before becoming fully autonomous in 2006.
          </p>
          <p>
            Our focus is firmly on community service projects and fundraising. Our flagship Regatta, the
            Shop 4 Hope secondhand store, and ongoing support for the SSPCA and local sports medicine are just
            a few of the ways we give back.
          </p>
          <p>
            Through meetings and regional conferences we enjoy international fellowship, which has enabled
            donations such as a Colposcope to Seychelles Hospital and drainage systems for President&rsquo;s
            Village.
          </p>
          <p>
            The Regatta remains our flagship event, drawing around 10,000 attendees for a day of sports,
            performances and community activities that fund our charitable work all year round.
          </p>
          <p>
            With an active and dedicated membership, we continue to live by the Round Table motto:
            <span className="text-[#F88C24] font-semibold"> Adopt, Adapt, Improve.</span>
          </p>
        </div>
        <img src={IMAGES.groupNight} alt="Round Table Seychelles members holding the RTS banner" className="mt-10 w-full h-72 sm:h-96 object-cover rounded-2xl" />
      </div>
    </section>


    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center mb-10">
          <img src={IMAGES.waxSeal} alt="Round Table Seychelles wax seal" className="h-20 w-20 object-contain mb-3" />
          <SectionTitle eyebrow="What Drives Us" title="Vision, Mission & Values" />
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
              <div className="h-14 w-14 rounded-xl bg-[#F88C24]/10 flex items-center justify-center mb-6">
                <p.icon className="text-[#F88C24]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#08142C] mb-3">{p.title}</h3>
              <p className="text-slate-600 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>


    <section className="py-20 bg-[#08142C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="h-14 w-14 rounded-xl bg-[#5998d3]/20 flex items-center justify-center mb-6">
            <Globe className="text-[#5998d3]" size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-5">Part of a Global Movement</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Round Table is an international organisation founded in 1927 in Norwich, England, with the motto
            <span className="text-[#F88C24] font-semibold"> &ldquo;Adopt, Adapt, Improve.&rdquo;</span> Today it
            connects tens of thousands of members across more than 60 countries.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Round Table Seychelles proudly carries this tradition into the Indian Ocean, linking our island
            community to a worldwide family of like-minded changemakers.
          </p>
        </div>
        <img src={IMAGES.trees} alt="RTS members volunteering together" className="rounded-2xl w-full h-80 object-cover" />
      </div>
    </section>

    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Leadership" title="The Committee" subtitle="Meet the team steering Round Table Seychelles." />
        <img src={IMAGES.groupFormal} alt="Round Table Seychelles committee members" className="w-full h-72 sm:h-96 object-cover rounded-2xl mb-12" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {LEADERSHIP.map((m) => (
            <div key={m.name} className="text-center">
              <img src={IMAGES.memberPortrait} alt={`${m.name}, ${m.role}`} className="w-full aspect-square object-cover rounded-2xl mb-3" />
              <h4 className="font-bold text-[#08142C]">{m.name}</h4>
              <p className="text-sm text-[#5998d3] font-semibold">{m.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </PageLayout>
);

export default About;
