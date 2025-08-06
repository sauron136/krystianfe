'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

export default function SiteSettingsPage() {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      fetchSettings();
    }
  }, [isAuthenticated]);

  const fetchSettings = async () => {
    try {
      const data = await apiClient.getSiteSettings();
      setSettings(data);
    } catch (error) {
      console.error('Failed to fetch site settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await apiClient.updateSiteSettings(settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Failed to update settings:', error);
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (!isAuthenticated || !isSuperAdmin) {
    return <div>Access denied. Super admin only.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Site Settings</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Site Title</label>
          <input
            type="text"
            value={settings?.site_title || ''}
            onChange={(e) => setSettings({...settings, site_title: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Site Description</label>
          <textarea
            value={settings?.site_description || ''}
            onChange={(e) => setSettings({...settings, site_description: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Name</label>
          <input
            type="text"
            value={settings?.owner_name || ''}
            onChange={(e) => setSettings({...settings, owner_name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Owner Title</label>
          <input
            type="text"
            value={settings?.owner_title || ''}
            onChange={(e) => setSettings({...settings, owner_title: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Name</label>
          <input
            type="text"
            value={settings?.hero_name || ''}
            onChange={(e) => setSettings({...settings, hero_name: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Title</label>
          <input
            type="text"
            value={settings?.hero_title || ''}
            onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Hero Summary</label>
          <textarea
            value={settings?.hero_summary || ''}
            onChange={(e) => setSettings({...settings, hero_summary: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About Content</label>
          <textarea
            value={settings?.about_content || ''}
            onChange={(e) => setSettings({...settings, about_content: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Footer Content</label>
          <textarea
            value={settings?.footer_content || ''}
            onChange={(e) => setSettings({...settings, footer_content: e.target.value})}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </form>
    </div>
  );
}
