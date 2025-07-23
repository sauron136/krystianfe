import { useState } from 'react';
import { createAbout } from '../../api/portfolio';

export default function About() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    current_company: '',
    location: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const aboutData = {
        name: formData.name,
        title: formData.title,
        bio: formData.bio,
        ...(formData.current_company && { current_company: formData.current_company }),
        ...(formData.location && { location: formData.location })
      };
      
      console.log('Sending about data:', aboutData);
      await createAbout(aboutData);
      alert('About section created successfully!');
      
      setFormData({
        name: '',
        title: '',
        bio: '',
        current_company: '',
        location: ''
      });
    } catch (error) {
      console.error('Error creating about:', error);
      alert('Failed to create about section');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit About Section</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name"
          placeholder="Your Full Name" 
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
          required
        />
        <input 
          type="text" 
          name="title"
          placeholder="Your Professional Title" 
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
          required
        />
        <textarea 
          name="bio"
          placeholder="Tell us about yourself..." 
          rows={6} 
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input 
          type="text" 
          name="current_company"
          placeholder="Current Company (optional)" 
          value={formData.current_company}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
        />
        <input 
          type="text" 
          name="location"
          placeholder="Location (optional)" 
          value={formData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded" 
        />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">
          Save About Section
        </button>
      </form>
    </div>
  );
}