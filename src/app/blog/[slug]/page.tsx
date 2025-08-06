// src/app/blog/[slug]/page.tsx
import { apiClient } from '@/lib/api';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await apiClient.getBlogPostBySlug(params.slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <a href="/blog" className="text-blue-600 hover:text-blue-800">
            ← Back to Blog
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <a href="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Blog
          </a>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <time>{new Date(post.published_at).toLocaleDateString()}</time>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
          
          {post.excerpt && (
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">{post.excerpt}</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </div>
  );
}
