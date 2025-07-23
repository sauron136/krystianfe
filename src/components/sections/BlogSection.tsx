import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  published_date: string;
  read_time?: number;
  slug: string;
  category?: string;
}

interface BlogProps {
  data: BlogPost[];
}

const Blog = ({ data }: BlogProps) => {
  if (!data.length) {
    return (
      <section id="blog" className="min-h-screen bg-slate-800 flex items-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="animate-pulse text-slate-400">Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="min-h-screen bg-slate-800 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="space-y-16">
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono text-lg">04.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-200">
              What I've Been Writing
            </h2>
            <div className="flex-1 h-px bg-slate-700 ml-8"></div>
          </div>
          
          <div className="space-y-8">
            {data.map((post, index) => (
              <article key={post.id} className="group">
                <div className="border border-slate-700 rounded-lg p-6 hover:border-emerald-400/50 transition-all duration-300 hover:transform hover:-translate-y-1">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center space-x-2 text-slate-400 font-mono">
                        <Calendar className="w-4 h-4" />
                        <time>{new Date(post.published_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</time>
                      </div>
                      
                      {post.read_time && (
                        <div className="flex items-center space-x-2 text-slate-400 font-mono">
                          <Clock className="w-4 h-4" />
                          <span>{post.read_time} min read</span>
                        </div>
                      )}
                      
                      {post.category && (
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-emerald-400" />
                          <span className="px-2 py-1 bg-emerald-400/10 text-emerald-400 rounded text-xs font-mono border border-emerald-400/20">
                            {post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-300">
                      <a 
                        href={`/blog/${post.slug}`}
                        className="flex items-center justify-between group/link"
                      >
                        <span>{post.title}</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover/link:opacity-100 group-hover/link:translate-x-1 transition-all duration-200" />
                      </a>
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <div className="pt-2">
                      <a 
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-emerald-400 font-mono text-sm hover:underline group/read"
                      >
                        Read more
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/read:translate-x-1 transition-transform duration-200" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center">
            <a 
              href="/blog" 
              className="inline-flex items-center px-6 py-3 border border-emerald-400 text-emerald-400 font-mono hover:bg-emerald-400/10 transition-colors duration-200 group"
            >
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;