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
              Round Table Seychelles has a rich history that is deeply rooted in community service and international fellowship. 
              The journey of Round Table Seychelles began when it was chartered in 1973 as a member of the Association of Round Tables of
              Eastern Africa (ARTEA) and, subsequently, in 1974 as part of the World Council of Young Men's Service Clubs (WOCO).
            </p>
            <p>
             Initially, the club was known as RT 22 Seychelles, where "22" signified its designation within the regional grouping. 
              Its early years were marked by camaraderie and the development of the organization's structure and mission. Notable members
              like Mike Dunford and Serge Pool were instrumental in the club's formative events and community service projects.
            </p>
            <p>
              In 1978, Round Table Seychelles gained recognition when it hosted one of the pre-Tours of the WOCO meeting, an 
              important event that brought international attention to the club's activities. By the mid-1980s, the Tables from both 
              Seychelles and Mauritius felt a need to create their own identity separate from ARTEA, leading to the establishment of the
              Association of Round Tables of the Indian Ocean (ARTIO) in 1985, where RT Seychelles played a crucial role.
            </p>
               <p>
              Despite its autonomous status within ARTIO, the fellowship and service ethos remained at the core of RT Seychelles' activities, 
              which included a variety of community projects and service events that engaged members and served the needs of the wider community.
            </p>
            <p>
              The year 2006 was a turning point for the organization when the Tables from Mauritius withdrew from ARTIO, leaving 
              RT Seychelles as the sole member of the association. Consequently, the Seychelles club was renamed RT Seychelles and adopted a 
              new national emblem, the Coco de Mer palm, and in 2011, the club changed the emblem colors and adopted the Coco de Mer shell as part of its logo.
            </p>
              <p>
             Throughout its history, RT Seychelles has been recognized for its active role in service projects and 
              community development. The club has fostered a culture of giving and service, which is evident from its 
              involvement in a diverse range of projects from environmental conservation efforts to health and education initiatives.
            </p>
            <p>
             RT Seychelles is particularly known for its flagship event, the Round Table Seychelles Regatta, a major annual
            fundraising and social event that brings together community members and international visitors for a series 
            of sailing races and celebrations.
            </p>
                <p>
             The history of RT Seychelles reflects a dedication to the Round Table's principles of friendship, collaboration, and
            community service, demonstrating the club's ongoing commitment to making a significant impact in the lives of the 
             Seychellois and upholding the values that define Round Table organizations worldwide.
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
