'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

export default function BlogPage() {
  const { isAuthenticated, user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const fetchPosts = async () => {
    try {
      const data = await apiClient.getBlogPosts();
      setPosts(data);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Access denied. Please log in.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Posts</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          New Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-600 text-sm">
                  By {post.author?.email || 'Unknown'} • {new Date(post.created_at).toLocaleDateString()}
                </p>
                {post.published_at && (
                  <p className="text-gray-500 text-sm">
                    Published: {new Date(post.published_at).toLocaleDateString()}
                  </p>
                )}
              </div>
              
              <div className="flex space-x-2 items-center">
                <span className={`px-2 py-1 rounded-md text-xs ${
                  post.is_published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {post.is_published ? 'Published' : 'Draft'}
                </span>
                
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  Edit
                </button>
                
                {(user?.role === 'super_admin' || post.author_id === user?.id) && (
                  <button className="text-red-600 hover:text-red-800 text-sm">
                    Delete
                  </button>
                )}
              </div>
            </div>
            
            <p className="text-gray-700">{post.excerpt}</p>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
              <span>Slug: /{post.slug}</span>
              <span>Order: {post.display_order}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
