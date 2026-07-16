import React from 'react';
import { Eye, Target, Gem, Globe, RefreshCw, Lightbulb, Zap } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { IMAGES } from '@/data/rts';

const pillars = [
  { icon: Eye, title: 'Our Vision', text: 'A united, thriving Seychelles where young people lead positive change through service and fellowship.' },
  { icon: Target, title: 'Our Mission', text: 'To bring together young men and women to develop their potential, build friendships, and serve their communities.' },
  { icon: Gem, title: 'Core Values', text: 'Fellowship, integrity, service, leadership and respect for diversity guide everything we do.' },
];

const motto = [
  { icon: RefreshCw, word: 'Adopt', desc: 'Take the best ideas and practices from others — within your community, your country, and the world — and make them your own.' },
  { icon: Zap, word: 'Adapt', desc: 'Tailor what you have adopted to suit your own circumstances, culture, and the needs of those around you.' },
  { icon: Lightbulb, word: 'Improve', desc: 'Always strive to make things better — for your organisation, your community, and yourself.' },
];

const partners = [
  { name: 'Round Table International', type: 'International Body' },
  { name: 'ARTIO', type: 'Regional Association' },
  { name: 'SSPCA', type: 'Community Partner' },
  { name: 'Seychelles Hospital', type: 'Health Partner' },
  { name: 'Ministry of Education', type: 'Government' },
  { name: 'Local Businesses', type: 'Corporate Sponsors' },
];

const About: React.FC = () => (
  <PageLayout
    title="About Us | Round Table Seychelles"
    description="Learn about Round Table Seychelles — our vision, mission, core values, leadership team and connection to the global Round Table movement."
  >
    <PageHero
      image={IMAGES.groupOutdoor}
      alt="Round Table Seychelles members celebrating together"
      eyebrow="About Us"
      title="Adopt. Adapt. Improve."
      subtitle="A fellowship of young people dedicated to serving Seychelles."
    />

    {/* About text */}
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Our Purpose" title="A little something about us" subtitle="Founded on friendship and powered by purpose." />
        <div className="space-y-5 text-lg text-slate-600 leading-relaxed">
          <p>
            Round Table Seychelles is a vibrant branch of the international service organization known for its commitment to community service,
            fellowship, and the development of young men. Chartered as part of ARTIO (Association of Round Tables of Indian Ocean) and
            later as part of the Association of Round Tables of Eastern Africa (ARTEA), the group became autonomous in 2006 after the dissolution of ARTIO.
          </p>
          <p>
            The organization is renowned for various community service projects, with a strong focus on helping children and those in
            need. Notable efforts include fundraising through events like the annual Regatta, opening a second-hand shop called Shop 4 Hope, and
            various health-related initiatives. They've notably supported the Seychelles Society for the Prevention of Cruelty
            to Animals (SSPCA), contributed to local sport facility renovations, and donated medical equipment to boost local sports medicine.
          </p>
          <p>
            Round Table Seychelles has a tradition of holding international meetings and regional conferences to foster fellowship and
            service. They've been pivotal in various social projects, such as the donation of a Colposcope to the Seychelles Hospital and
            drainage systems to President's Village, a home for children.
          </p>
          <p>
            Their biggest annual event is the Round Table Seychelles Regatta, which draws around 10,000 attendees and
            features a variety of sports competitions, live performances, and community activities, alongside
            fundraising for different causes.
          </p>
          <p>
            With an active membership and a commitment to service and fellowship, Round Table Seychelles is a key
            player in local community development and exemplifies the Round Table motto of
            <span className="text-[#F88C24] font-semibold"> Adopt, Adapt, Improve.</span>
          </p>
        </div>
        <img src={IMAGES.groupNight} alt="Round Table Seychelles members holding the RTS banner" className="mt-10 w-full h-72 sm:h-96 object-cover rounded-2xl" />
      </div>
    </section>

    {/* Motto explained */}
    <section className="py-20 bg-[#08142C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle light eyebrow="Our Motto" title="Adopt. Adapt. Improve." subtitle="Three words that define everything we do." />
        <div className="grid gap-8 md:grid-cols-3">
          {motto.map((m) => (
            <div key={m.word} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <div className="h-14 w-14 rounded-xl bg-[#F88C24]/20 flex items-center justify-center mb-6 mx-auto">
                <m.icon className="text-[#F88C24]" size={28} />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-3">{m.word}</h3>
              <p className="text-slate-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Vision Mission Values */}
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

    {/* Global Movement */}
    <section className="py-20 bg-[#08142C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="h-14 w-14 rounded-xl bg-[#5998d3]/20 flex items-center justify-center mb-6">
            <Globe className="text-[#5998d3]" size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-5">Part of a Global Movement</h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            Round Table is an international organisation founded in 1927 in Norwich, England, with the motto
            <span className="text-[#F88C24] font-semibold"> "Adopt, Adapt, Improve."</span> Today it
            connects tens of thousands of members across more than 60 countries.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Round Table Seychelles proudly carries this tradition into the Indian Ocean, linking our island
            community to a worldwide family of like-minded changemakers.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              { value: '60+', label: 'Countries' },
              { value: '1927', label: 'Founded' },
              { value: '100K+', label: 'Members Worldwide' },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                <p className="text-2xl font-extrabold text-[#F88C24]">{s.value}</p>
                <p className="text-xs text-slate-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
        <img src={IMAGES.trees} alt="RTS members volunteering together" className="rounded-2xl w-full h-80 object-cover" />
      </div>
    </section>

    {/* Partners & Sponsors */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionTitle eyebrow="Our Network" title="Partners & Supporters" subtitle="Organisations that stand with us in service." />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {partners.map((p) => (
            <div key={p.name} className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-[#5998d3]/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="text-[#5998d3]" size={22} />
              </div>
              <h4 className="font-bold text-[#08142C]">{p.name}</h4>
              <p className="text-xs text-[#F88C24] font-semibold mt-1">{p.type}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

  </PageLayout>
);

export default About;
