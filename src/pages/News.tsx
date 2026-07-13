import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import PageHero from '@/components/PageHero';
import SectionTitle from '@/components/SectionTitle';
import { supabase } from '@/lib/supabase';
import { IMAGES } from '@/data/rts';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  body: string;
  cover_image: string | null;
  author: string;
  category: string;
  published_at: string;
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const News: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('rts_posts')
        .select('*')
        .order('published_at', { ascending: false });
      setPosts((data as Post[]) || []);
      setLoading(false);
    })();
  }, []);

  return (
    <PageLayout
      title="News & Stories | Round Table Seychelles"
      description="Read the latest news, event recaps, announcements and project updates from Round Table Seychelles."
    >
      <PageHero
        image={IMAGES.gala}
        alt="Round Table Seychelles news and stories"
        eyebrow="News & Stories"
        title="What's Happening at RTS"
        subtitle="Event recaps, announcements and updates from across the islands."
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle eyebrow="Latest" title="From the Round Table" subtitle="Stay in the loop with everything RTS." />

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-slate-200 h-52 rounded-2xl mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <p className="text-center text-slate-500">No articles published yet. Check back soon.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to={`/news/${p.slug}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-100 flex flex-col"
                >
                  <div className="relative">
                    <img src={p.cover_image || IMAGES.hero} alt={p.title} className="w-full h-52 object-cover" />
                    <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-[#5998d3] text-white">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-3">
                      <span className="inline-flex items-center gap-1"><Calendar size={14} /> {fmtDate(p.published_at)}</span>
                      <span className="inline-flex items-center gap-1"><User size={14} /> {p.author}</span>
                    </div>
                    <h3 className="text-lg font-bold text-[#08142C] mb-2 group-hover:text-[#5998d3] transition-colors">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed flex-1">{p.excerpt}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-[#F88C24] font-bold group-hover:gap-3 transition-all">
                      Read more <ArrowRight size={18} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default News;
