import { useState } from 'react';
import { Plus, Edit, Trash2, User, Briefcase, Folder, Mail, Settings } from 'lucide-react';
import AboutForm from './forms/AboutForm';
import { ExperienceForm } from './forms/ExperienceForm';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'contact', label: 'Contact', icon: Mail },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio Admin</h1>
            <a 
              href="/" 
              target="_blank"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              View Portfolio
            </a>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'about' && <AboutSection />}
          {activeTab === 'experience' && <ExperienceSection />}
          {activeTab === 'projects' && <ProjectsSection />}
          {activeTab === 'contact' && <ContactSection />}
          {activeTab === 'settings' && <SettingsSection />}
        </main>
      </div>
    </div>
  );
};

const AboutSection = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">About Section</h2>
    </div>
    
    <AboutForm />
  </div>
);

// FIXED: Use the actual ExperienceForm instead of placeholder
const ExperienceSection = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Experience Management</h2>
    </div>
    
    <ExperienceForm />
  </div>
);

const ProjectsSection = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Projects</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="bg-white rounded-lg shadow overflow-hidden">
          <img 
            src={`https://picsum.photos/400/200?random=${item}`} 
            alt="Project" 
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Project Name {item}</h3>
            <p className="text-gray-600 text-sm mb-3">
              A brief description of what this project does and the problems it solves.
            </p>
            <div className="flex flex-wrap gap-1 mb-3">
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">React</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">API</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">Featured</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ContactSection = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Contact Information</h2>
    </div>
    
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input 
            type="email" 
            className="w-full p-3 border rounded-lg" 
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
          <input 
            type="tel" 
            className="w-full p-3 border rounded-lg" 
            placeholder="+1 (555) 123-4567"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
          <input 
            type="url" 
            className="w-full p-3 border rounded-lg" 
            placeholder="https://github.com/username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
          <input 
            type="url" 
            className="w-full p-3 border rounded-lg" 
            placeholder="https://linkedin.com/in/username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
          <input 
            type="url" 
            className="w-full p-3 border rounded-lg" 
            placeholder="https://twitter.com/username"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input 
            type="url" 
            className="w-full p-3 border rounded-lg" 
            placeholder="https://yourwebsite.com"
          />
        </div>
      </div>
      
      <div className="mt-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Contact Info
        </button>
      </div>
    </div>
  </div>
);

const SettingsSection = () => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Settings</h2>
    </div>
    
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Portfolio Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Show experience section</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" defaultChecked />
              <span>Show projects section</span>
            </label>
          </div>
          <div>
            <label className="flex items-center">
              <input type="checkbox" className="mr-3" />
              <span>Show blog section</span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <input type="color" className="w-20 h-10 border rounded" defaultValue="#3B82F6" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
            <select className="w-full p-3 border rounded-lg">
              <option>Inter</option>
              <option>Roboto</option>
              <option>Open Sans</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminDashboard;