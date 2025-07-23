import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Globe } from 'lucide-react';
import apiClient from '../../../api/client';

export interface ContactInfo {
  id?: number;
  email: string;
  phone?: string;
  location?: string;
  linkedin_url?: string;
  github_url?: string;
  twitter_url?: string;
  website_url?: string;
  resume_url?: string;
}

export const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    location: '',
    linkedin_url: '',
    github_url: '',
    twitter_url: '',
    website_url: '',
    resume_url: ''
  });

  useEffect(() => {
    loadContactInfo();
  }, []);

  const loadContactInfo = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/contact');
      if (response.data) {
        setContactInfo(response.data);
        setFormData({
          email: response.data.email || '',
          phone: response.data.phone || '',
          location: response.data.location || '',
          linkedin_url: response.data.linkedin_url || '',
          github_url: response.data.github_url || '',
          twitter_url: response.data.twitter_url || '',
          website_url: response.data.website_url || '',
          resume_url: response.data.resume_url || ''
        });
      }
    } catch (err) {
      setError('Failed to load contact info');
      console.error('Load error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const contactData = {
        ...formData,
        phone: formData.phone || undefined,
        location: formData.location || undefined,
        linkedin_url: formData.linkedin_url || undefined,
        github_url: formData.github_url || undefined,
        twitter_url: formData.twitter_url || undefined,
        website_url: formData.website_url || undefined,
        resume_url: formData.resume_url || undefined
      };

      if (contactInfo?.id) {
        await apiClient.put(`/api/contact/${contactInfo.id}`, contactData);
      } else {
        await apiClient.post('/api/contact', contactData);
      }

      await loadContactInfo();
    } catch (err) {
      setError('Failed to save contact info');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border space-y-6">
        <h3 className="text-lg font-semibold">Contact Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Mail size={16} className="inline mr-2" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <Phone size={16} className="inline mr-2" />
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin size={16} className="inline mr-2" />
              Location
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleChange('location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, State / Country"
            />
          </div>
        </div>

        <div className="border-t pt-6">
          <h4 className="text-md font-semibold mb-4">Social Links</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Linkedin size={16} className="inline mr-2" />
                LinkedIn URL
              </label>
              <input
                type="url"
                value={formData.linkedin_url}
                onChange={(e) => handleChange('linkedin_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Github size={16} className="inline mr-2" />
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github_url}
                onChange={(e) => handleChange('github_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://github.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Twitter size={16} className="inline mr-2" />
                Twitter URL
              </label>
              <input
                type="url"
                value={formData.twitter_url}
                onChange={(e) => handleChange('twitter_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://twitter.com/yourusername"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Globe size={16} className="inline mr-2" />
                Personal Website
              </label>
              <input
                type="url"
                value={formData.website_url}
                onChange={(e) => handleChange('website_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Resume/CV URL
              </label>
              <input
                type="url"
                value={formData.resume_url}
                onChange={(e) => handleChange('resume_url', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://yoursite.com/resume.pdf"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Contact Information'}
        </button>
      </form>

      {contactInfo && (
        <div className="bg-white p-6 rounded-lg border">
          <h4 className="text-md font-semibold mb-4">Current Contact Info</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Mail size={14} className="inline mr-2" /> {contactInfo.email}</li>
            {contactInfo.phone && (
              <li><Phone size={14} className="inline mr-2" /> {contactInfo.phone}</li>
            )}
            {contactInfo.location && (
              <li><MapPin size={14} className="inline mr-2" /> {contactInfo.location}</li>
            )}
            {contactInfo.linkedin_url && (
              <li><Linkedin size={14} className="inline mr-2" />
                <a href={contactInfo.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  LinkedIn
                </a>
              </li>
            )}
            {contactInfo.github_url && (
              <li><Github size={14} className="inline mr-2" />
                <a href={contactInfo.github_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  GitHub
                </a>
              </li>
            )}
            {contactInfo.twitter_url && (
              <li><Twitter size={14} className="inline mr-2" />
                <a href={contactInfo.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Twitter
                </a>
              </li>
            )}
            {contactInfo.website_url && (
              <li><Globe size={14} className="inline mr-2" />
                <a href={contactInfo.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Website
                </a>
              </li>
            )}
            {contactInfo.resume_url && (
              <li>
                <span className="inline-block mr-2">📄</span>
                <a href={contactInfo.resume_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  View Resume
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
