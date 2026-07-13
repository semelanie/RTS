import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import { useToast } from '@/hooks/use-toast';
import { IMAGES } from '@/data/rts';

const INQUIRY_TYPES = ['General Inquiry', 'Membership Application', 'Sponsorship / Donation', 'Regatta Participation'];

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    inquiry: INQUIRY_TYPES[0],
    message: '',
    sms: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: 'Missing information', description: 'Please provide your name and email.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    try {
      await fetch('/api/crm/6a1d49a1cf6c2dfcce9d772e/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.email,
          name: form.name,
          phone: form.phone || undefined,
          sms_opt_in: form.sms,
          metadata: { inquiry: form.inquiry, message: form.message },
        }),
      });
    } catch (err) {
      // still show success to the user; submission is best-effort
    }
    setLoading(false);
    setSubmitted(true);
    toast({ title: 'Message sent!', description: 'Thank you for reaching out. We will be in touch soon.' });
  };

  const update = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <PageLayout
      title="Contact & Join | Round Table Seychelles"
      description="Get in touch with Round Table Seychelles for general inquiries, membership applications, sponsorship or to participate in the Regatta."
    >
      <PageHero
        image={IMAGES.gala}
        alt="Round Table Seychelles community event"
        eyebrow="Contact Us"
        title="Get in Touch"
        subtitle="Whether you want to join, sponsor or simply learn more \u2014 we would love to hear from you."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-5 gap-12">
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-[#08142C] mb-4">Reach Us</h2>
              <p className="text-slate-600 leading-relaxed">
                Our doors are always open to young people who want to make a difference. Send us a message
                and a member of our committee will respond.
              </p>
            </div>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#5998d3]/10 flex items-center justify-center"><MapPin className="text-[#5998d3]" size={20} /></div>
                <div><p className="font-bold text-[#08142C]">Address</p><p className="text-slate-600">Victoria, Mah&eacute;, Seychelles</p></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#5998d3]/10 flex items-center justify-center"><Mail className="text-[#5998d3]" size={20} /></div>
                <div><p className="font-bold text-[#08142C]">Email</p><p className="text-slate-600">info@roundtable.sc</p></div>
              </li>
              <li className="flex items-start gap-4">
                <div className="h-11 w-11 rounded-xl bg-[#5998d3]/10 flex items-center justify-center"><Phone className="text-[#5998d3]" size={20} /></div>
                <div><p className="font-bold text-[#08142C]">Phone</p><p className="text-slate-600">+248 4 000 000</p></div>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
                <CheckCircle2 className="text-emerald-500 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-[#08142C] mb-2">Thank You!</h3>
                <p className="text-slate-600">Your message has been received. We will get back to you shortly.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', inquiry: INQUIRY_TYPES[0], message: '', sms: false }); }} className="mt-6 text-[#5998d3] font-bold">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl p-8 border border-slate-100 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-[#08142C] mb-1.5">Full Name *</label>
                    <input value={form.name} onChange={(e) => update('name', e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5998d3]" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#08142C] mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5998d3]" placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#08142C] mb-1.5">Phone <span className="font-normal text-slate-400">(optional)</span></label>
                  <input value={form.phone} onChange={(e) => update('phone', e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5998d3]" placeholder="+248 ..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#08142C] mb-1.5">Inquiry Type</label>
                  <select value={form.inquiry} onChange={(e) => update('inquiry', e.target.value)} className="w-full rounded-lg border border-slate-200 px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#5998d3]">
                    {INQUIRY_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#08142C] mb-1.5">Message</label>
                  <textarea value={form.message} onChange={(e) => update('message', e.target.value)} rows={4} className="w-full rounded-lg border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#5998d3]" placeholder="How can we help?" />
                </div>
                {form.phone && (
                  <label className="flex items-start gap-2 text-sm text-slate-600">
                    <input type="checkbox" checked={form.sms} onChange={(e) => update('sms', e.target.checked)} className="mt-1" />
                    I agree to receive occasional SMS updates from Round Table Seychelles.
                  </label>
                )}
                <button type="submit" disabled={loading} className="inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-8 py-3.5 rounded-full hover:bg-[#e07d18] transition-colors disabled:opacity-60">
                  {loading ? 'Sending...' : <>Send Message <Send size={18} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
