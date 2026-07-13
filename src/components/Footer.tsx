import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { NAV_LINKS, IMAGES, SOCIAL } from '@/data/rts';

const Footer: React.FC = () => (
  <footer className="bg-[#08142C] text-slate-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid gap-10 md:grid-cols-4">
      <div>
        <span className="inline-flex items-center justify-center h-14 px-2 rounded-lg bg-white/5 mb-4">
          <img src={IMAGES.logo} alt="Round Table Seychelles logo" className="h-10 w-auto object-contain" />
        </span>
        <p className="text-sm leading-relaxed text-slate-400">
          Adopt, Adapt, Improve. Uniting young people of Seychelles through fellowship,
          service and community impact since 1973.
        </p>
        <div className="flex gap-3 mt-5">
          <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#5998d3] flex items-center justify-center transition-colors text-white"><Facebook size={18} /></a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="h-10 w-10 rounded-full bg-white/10 hover:bg-[#F88C24] flex items-center justify-center transition-colors text-white"><Instagram size={18} /></a>
        </div>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Explore</h4>
        <ul className="space-y-2 text-sm">
          {NAV_LINKS.map((l) => (
            <li key={l.path}>
              <Link to={l.path} className="hover:text-[#F88C24] transition-colors">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Get Involved</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/#contact-form" className="hover:text-[#F88C24]">Become a Tabler</Link></li>
          <li><Link to="/regatta" className="hover:text-[#F88C24]">Sponsor the Regatta</Link></li>
          <li><Link to="/projects" className="hover:text-[#F88C24]">Our Projects</Link></li>
          <li><a href={SOCIAL.tablerWorld} target="_blank" rel="noopener noreferrer" className="hover:text-[#F88C24]">Tabler.World</a></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm">
          <li className="flex items-start gap-2"><MapPin size={18} className="text-[#5998d3] mt-0.5" /> Victoria, Mah&eacute;, Seychelles</li>
          <li className="flex items-center gap-2"><Mail size={18} className="text-[#5998d3]" /> info@roundtable.sc</li>
          <li className="flex items-center gap-2"><Phone size={18} className="text-[#5998d3]" /> +248 4 000 000</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3 text-xs text-slate-400">
          <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#F88C24] shrink-0" />
          <div>
            <p>&copy; 2026 Round Table Seychelles. All Rights Reserved.</p>
            <p className="text-slate-500 mt-1">A non-political fellowship of young Seychellois serving their community through Adopt, Adapt, Improve.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white hover:text-[#5998d3] transition-colors"><Facebook size={18} /></a>
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white hover:text-[#F88C24] transition-colors"><Instagram size={18} /></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
