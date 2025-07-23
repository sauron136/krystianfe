import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar, Building, User } from 'lucide-react';
import apiClient from '../../../api/client';

export interface Experience {
  id?: number;
  company: string;
  position: string;
  start_date: string;
  end_date?: string;
  description: string;
  technologies?: string[];
  order?: number;
}

export const ExperienceForm = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    start_date: '',
    end_date: '',
    description: '',
    technologies: [] as string[],
    order: 0
  });

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/experience');
      setExperiences(response.data.sort((a: Experience, b: Experience) => (a.order || 0) - (b.order || 0)));
    } catch (err) {
      setError('Failed to load experiences');
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

      const experienceData = {
        ...formData,
        technologies: formData.technologies.length > 0 ? formData.technologies : undefined,
        end_date: formData.end_date || undefined
      };

      if (editingId) {
        await apiClient.put(`/api/experience/${editingId}`, experienceData);
      } else {
        await apiClient.post('/api/experience', experienceData);
      }

      await loadExperiences();
      resetForm();
    } catch (err) {
      setError('Failed to save experience');
      console.error('Save error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience.id!);
    setFormData({
      company: experience.company,
      position: experience.position,
      start_date: experience.start_date,
      end_date: experience.end_date || '',
      description: experience.description,
      technologies: experience.technologies || [],
      order: experience.order || 0
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this experience?')) return;
    
    try {
      setLoading(true);
      await apiClient.delete(`/api/experience/${id}`);
      await loadExperiences();
    } catch (err) {
      setError('Failed to delete experience');
      console.error('Delete error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      start_date: '',
      end_date: '',
      description: '',
      technologies: [],
      order: 0
    });
  };

  const addTechnology = (tech: string) => {
    if (tech.trim() && !formData.technologies.includes(tech.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, tech.trim()]
      }));
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  if (loading && experiences.length === 0) {
    return <div className="p-4">Loading experiences...</div>;
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border space-y-4">
        <h3 className="text-lg font-semibold">
          {editingId ? 'Edit Experience' : 'Add New Experience'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="month"
              required
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="month"
              value={formData.end_date}
              onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Leave blank if current"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe your role and achievements..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechnology(tech)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <input
            type="text"
            placeholder="Add technology (press Enter)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addTechnology(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : editingId ? 'Update Experience' : 'Add Experience'}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Experiences</h3>
        {experiences.map((exp) => (
          <div key={exp.id} className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Building size={16} className="text-gray-500" />
                  <span className="font-semibold">{exp.company}</span>
                  <span className="text-gray-500">•</span>
                  <span>{exp.position}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <Calendar size={14} />
                  <span>{exp.start_date} - {exp.end_date || 'Present'}</span>
                </div>
                
                <p className="text-gray-700 mb-2">{exp.description}</p>
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(exp.id!)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};