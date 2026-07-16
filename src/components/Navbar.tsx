import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { NAV_LINKS, IMAGES, SOCIAL } from '@/data/rts';

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={IMAGES.logo}
            alt="Round Table Seychelles logo"
            className="h-10 sm:h-14 w-auto object-contain"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-colors ${
                pathname === l.path
                  ? 'text-[#F88C24]'
                  : 'text-[#08142C] hover:text-[#F88C24]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SOCIAL.tablerWorld}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center gap-1.5 border-2 border-[#08142C] text-[#08142C] font-bold px-4 py-2 rounded-full text-sm hover:bg-[#08142C] hover:text-white transition-colors"
          >
            <Globe size={16} /> Tabler.World
          </a>
          <Link
            to="/#contact-form"
            className="ml-2 bg-[#F88C24] hover:bg-[#e07d18] text-white font-bold px-5 py-2.5 rounded-full text-sm transition-colors"
          >
            Join Us
          </Link>
        </nav>
        <button className="lg:hidden text-[#08142C]" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2.5 rounded-md font-semibold ${
                pathname === l.path ? 'text-[#F88C24]' : 'text-[#08142C]'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={SOCIAL.tablerWorld}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block text-center border-2 border-[#08142C] text-[#08142C] font-bold px-5 py-3 rounded-full mt-3"
          >
            Tabler.World
          </a>
          <Link
            to="/#contact-form"
            onClick={() => setOpen(false)}
            className="block text-center bg-[#F88C24] text-white font-bold px-5 py-3 rounded-full mt-2"
          >
            Join Us
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
