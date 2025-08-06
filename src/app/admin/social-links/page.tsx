'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

export default function SocialLinksPage() {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  const [links, setLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchLinks();
    }
  }, [isAuthenticated]);

  const fetchLinks = async () => {
    try {
      const data = await apiClient.getSocialLinks();
      setLinks(data);
    } catch (error) {
      console.error('Failed to fetch social links:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || !isSuperAdmin) {
    return <div>Access denied. Super admin only.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Social Links</h1>
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
          Add Link
        </button>
      </div>

      <div className="space-y-4">
        {links.map((link) => (
          <div key={link.id} className="bg-white p-4 rounded-lg shadow border flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-2xl">{getPlatformIcon(link.platform)}</div>
              <div>
                <h3 className="font-semibold capitalize">{link.platform}</h3>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  {link.url}
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-md text-xs ${
                link.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
              }`}>
                {link.is_active ? 'Active' : 'Inactive'}
              </span>
              
              <span className="text-gray-500 text-sm">Order: {link.display_order}</span>
              
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                Edit
              </button>
              
              <button className="text-red-600 hover:text-red-800 text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getPlatformIcon(platform: string) {
  const icons: Record<string, string> = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📷',
    facebook: '📘',
    youtube: '📺',
    twitch: '🎮',
    discord: '💬',
    email: '📧',
    website: '🌐',
  };
  return icons[platform] || '🔗';
}
