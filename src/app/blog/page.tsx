// src/app/blog/page.tsx
import { apiClient } from '@/lib/api';

export default async function AllBlogPage() {
  const posts = await apiClient.getBlogPosts(true); // Only published posts

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900">All Blog Posts</h1>
        </div>

        <div className="space-y-8">
          {posts.map((post: any) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md p-8">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <time>{new Date(post.published_at).toLocaleDateString()}</time>
              </div>
              
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                <a href={`/blog/${post.slug}`} className="hover:text-blue-600">
                  {post.title}
                </a>
              </h2>
              
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              
              <a
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Read More →
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

