import React, { useState } from 'react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES, MILESTONES } from '@/data/rts';

const gallery = [IMAGES.groupOutdoor, IMAGES.groupNight, IMAGES.groupFormal, IMAGES.groupMeeting, IMAGES.regatta, IMAGES.trees];

const History: React.FC = () => {
  const [active, setActive] = useState(MILESTONES.length - 1);

  return (
    <PageLayout
      title="History | Round Table Seychelles"
      description="Explore the history of Round Table Seychelles \u2014 from its founding in 1973 through ARTEA, WOCO and ARTIO, key milestones and an interactive timeline."
    >
      <PageHero
        image={IMAGES.groupOutdoor}
        alt="Round Table Seychelles members celebrating together"
        eyebrow="Our History"
        title="Adopt. Adapt. Improve."
        subtitle="Tracing the journey of Round Table Seychelles since 1973."
      />

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="The Beginning" title="Our Legacy" />
          <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
            <p>
              Round Table Seychelles was founded in 1973, originally chartered as a member of ARTEA. The
              following year RTS became a member of WOCO, and RT 22 Seychelles was formed.
            </p>
            <p>
              In 1985, alongside Mauritius, RTS left ARTEA to co-found ARTIO. When Mauritius later left in
              2006, Round Table Seychelles became the sole member and gained autonomy, continuing proudly
              under ARTIO.
            </p>
            <p>
              The emblem evolved in 2008 and again in 2011, cementing the iconic Round Table wheel that we
              proudly carry today. Through it all, RTS has built an enduring reputation for community service
              and its famous Regatta.
            </p>
          </div>
        </div>
      </section>


      {/* Interactive timeline */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Milestones" title="Interactive Timeline" subtitle="Click a year to revisit a defining moment." />
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {MILESTONES.map((m, i) => (
              <button
                key={m.year}
                onClick={() => setActive(i)}
                className={`px-5 py-2.5 rounded-full font-bold transition-colors ${
                  active === i ? 'bg-[#F88C24] text-white' : 'bg-white text-[#08142C] hover:bg-[#5998d3] hover:text-white'
                }`}
              >
                {m.year}
              </button>
            ))}
          </div>
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-10 shadow-sm border border-slate-100 text-center">
            <span className="text-5xl font-extrabold text-[#5998d3]">{MILESTONES[active].year}</span>
            <h3 className="text-2xl font-bold text-[#08142C] mt-4 mb-3">{MILESTONES[active].title}</h3>
            <p className="text-lg text-slate-600 leading-relaxed">{MILESTONES[active].desc}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Archives" title="Through the Years" subtitle="Highlights and memories from our journey." />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((src, i) => (
              <img key={i} src={src} alt={`RTS historical highlight ${i + 1}`} className="w-full h-56 object-cover rounded-xl hover:opacity-90 transition-opacity" />
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default History;
