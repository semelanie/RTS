import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-slate-100 py-6">
    <div className="flex justify-center px-4">
      <div className="bg-black rounded-xl px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 w-full max-w-3xl">
        <div className="flex flex-col gap-1">
          <p className="text-xs text-white">
            Copyrights Round Table Seychelles. All rights Reserved.
          </p>
          <p className="text-xs text-slate-400">
            Developed by Tabler for Tabler
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://www.facebook.com/roundtable.sc/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="text-white hover:text-[#1877F2] transition-colors"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.instagram.com/roundtableseychelles/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white hover:text-[#F88C24] transition-colors"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
