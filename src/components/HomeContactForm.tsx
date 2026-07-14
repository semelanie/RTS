import React, { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';

const HomeContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', sms: false });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setStatus('sending');
    try {
      await fetch('/api/crm/6a1d49a1cf6c2dfcce9d772e/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          sms_opt_in: form.sms,
          message: form.message,
          source: 'home-contact-form',
        }),
      });
      setStatus('done');
      setForm({ name: '', email: '', phone: '', message: '', sms: false });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact-form" className="scroll-mt-24 bg-slate-100 py-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

        {/* Left: Contact form (orange card) */}
        <div className="bg-[#F88C24] text-white rounded-2xl px-8 py-10">
          <span className="block text-xs font-bold tracking-widest uppercase text-white/80 mb-2">Join Us</span>
          <h2 className="text-3xl font-extrabold mb-6">Contact Us</h2>
          {status === 'done' ? (
            <div className="bg-white/15 rounded-xl p-6 flex items-start gap-3">
              <CheckCircle className="shrink-0 mt-0.5" />
              <p>Thank you! Your message has been received. A Tabler will be in touch with you soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-[#08142C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-[#08142C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-[#08142C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <textarea
                rows={4}
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg px-4 py-3 text-[#08142C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white"
              />
              {form.phone && (
                <label className="flex items-start gap-2 text-sm text-white/90">
                  <input
                    type="checkbox"
                    checked={form.sms}
                    onChange={(e) => setForm({ ...form, sms: e.target.checked })}
                    className="mt-1"
                  />
                  I agree to receive occasional SMS updates from Round Table Seychelles.
                </label>
              )}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-white text-[#F88C24] font-bold px-7 py-3.5 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send Now'} <Send size={18} />
              </button>
              {status === 'error' && <p className="text-sm text-white">Something went wrong. Please try again.</p>}
            </form>
          )}
        </div>

        {/* Right: Get in touch (dark navy card) */}
        <div className="bg-[#08142C] text-slate-300 rounded-2xl px-8 py-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">Regatta</h2>
          <p className="text-[#5998d3] font-semibold mb-8">Get In Touch</p>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <MapPin className="text-[#F88C24]" size={20} />
              </span>
              <div>
                <p className="text-white font-semibold">Address</p>
                <p className="text-sm">Round Table Seychelles, Victoria, Mahé, Seychelles</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="text-[#F88C24]" size={20} />
              </span>
              <div>
                <p className="text-white font-semibold">Phone</p>
                <p className="text-sm">+248 4 000 000</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="text-[#F88C24]" size={20} />
              </span>
              <div>
                <p className="text-white font-semibold">Email</p>
                <p className="text-sm">info@roundtable.sc</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default HomeContactForm;
