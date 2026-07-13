import React from 'react';
import { Facebook, Instagram } from 'lucide-react';

const Footer: React.FC = () => (
  <footer className="bg-black py-5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
      <p className="text-xs text-slate-400">
        Copyrights Round Table Seychelles. All rights Reserved.
      </p>
      <div className="flex gap-4">
        
          href="https://www.facebook.com/roundtable.sc/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="text-white hover:text-[#1877F2] transition-colors"
        >
          <Facebook size={18} />
        </a>
        
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
  </footer>
);

export default Footer;
