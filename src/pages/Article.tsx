import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import PageLayout from '@/components/PageLayout';
import { supabase } from '@/lib/supabase';
import { IMAGES } from '@/data/rts';
import type { Post } from './News';

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data } = await supabase.from('rts_posts').select('*').eq('slug', slug).maybeSingle();
      setPost((data as Post) || null);
      setLoading(false);
    })();
  }, [slug]);

  return (
    <PageLayout
      title={post ? `${post.title} | RTS News` : 'Article | Round Table Seychelles'}
      description={post?.excerpt || 'Read the latest from Round Table Seychelles.'}
    >
      {loading ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-2/3 mb-6" />
          <div className="h-72 bg-slate-200 rounded-2xl mb-6" />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-4 bg-slate-200 rounded" />)}
          </div>
        </div>
      ) : !post ? (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-32 text-center">
          <h1 className="text-3xl font-extrabold text-[#08142C] mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The story you are looking for may have been moved or removed.</p>
          <Link to="/news" className="inline-flex items-center gap-2 bg-[#F88C24] text-white font-bold px-6 py-3 rounded-full">
            <ArrowLeft size={18} /> Back to News
          </Link>
        </div>
      ) : (
        <>
          <section className="relative h-[48vh] min-h-[320px] flex items-end">
            <img src={post.cover_image || IMAGES.hero} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08142C] via-[#08142C]/60 to-transparent" />
            <div className="relative max-w-3xl mx-auto px-4 sm:px-6 pb-12 w-full">
              <span className="inline-flex items-center gap-1 bg-[#F88C24] text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                <Tag size={14} /> {post.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">{post.title}</h1>
              <div className="flex items-center gap-5 text-sm text-slate-200 mt-4">
                <span className="inline-flex items-center gap-1"><Calendar size={16} /> {fmtDate(post.published_at)}</span>
                <span className="inline-flex items-center gap-1"><User size={16} /> {post.author}</span>
              </div>
            </div>
          </section>

          <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
            {post.excerpt && <p className="text-xl text-slate-700 font-medium leading-relaxed mb-8">{post.excerpt}</p>}
            <div className="prose prose-lg max-w-none">
              {post.body.split('\n').filter((p) => p.trim()).map((para, i) => (
                <p key={i} className="text-slate-600 leading-relaxed mb-5">{para}</p>
              ))}
            </div>
            <div className="mt-12 pt-8 border-t border-slate-100">
              <Link to="/news" className="inline-flex items-center gap-2 text-[#5998d3] font-bold hover:gap-3 transition-all">
                <ArrowLeft size={18} /> Back to all news
              </Link>
            </div>
          </article>
        </>
      )}
    </PageLayout>
  );
};

export default Article;
