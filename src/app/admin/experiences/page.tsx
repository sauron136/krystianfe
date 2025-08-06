'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';

export default function ExperiencesPage() {
  const { isAuthenticated, isSuperAdmin } = useAuth();
  const [experiences, setExperiences] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingExp, setEditingExp] = useState<any>(null);
  const [techOptions, setTechOptions] = useState<string[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchExperiences();
      fetchTechOptions();
    }
  }, [isAuthenticated]);

  const fetchExperiences = async () => {
    try {
      const data = await apiClient.getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTechOptions = async () => {
    try {
      const data = await apiClient.getTechStackOptions();
      setTechOptions(data);
    } catch (error) {
      console.error('Failed to fetch tech options:', error);
    }
  };

  if (!isAuthenticated || !isSuperAdmin) {
    return <div>Access denied. Super admin only.</div>;
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Experiences</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Add Experience
        </button>
      </div>

      <div className="grid gap-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-gray-600">{exp.company}</p>
                <p className="text-sm text-gray-500">{exp.start_date} - {exp.end_date || 'Present'}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this experience?')) {
                      apiClient.deleteExperience(exp.id).then(() => fetchExperiences());
                    }
                  }}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4">{exp.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-2">
              {exp.tech_stack?.map((tech: string, index: number) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm">
                  {tech}
                </span>
              ))}
            </div>

            {exp.is_featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm">
                Featured
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
