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
      <section id="blog" className="min-h-screen flex items-center py-20">
        <div>Loading blog posts...</div>
      </section>
    );
  }

  return (
    <section id="blog" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          What I've Been Writing
        </h2>
        
        <div className="space-y-8">
          {data.map((post) => (
            <article key={post.id} className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                <time>{new Date(post.published_date).toLocaleDateString()}</time>
                {post.read_time && (
                  <>
                    <span>•</span>
                    <span>{post.read_time} min read</span>
                  </>
                )}
                {post.category && (
                  <>
                    <span>•</span>
                    <span className="text-blue-600">{post.category}</span>
                  </>
                )}
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                <a href={`/blog/${post.slug}`}>
                  {post.title}
                </a>
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;