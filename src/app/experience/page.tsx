// src/app/experience/page.tsx
import { apiClient } from '@/lib/api';

export default async function AllExperiencePage() {
  const experiences = await apiClient.getExperiences();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <a href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Home
          </a>
          <h1 className="text-4xl font-bold text-gray-900">All Experience</h1>
        </div>

        <div className="space-y-8">
          {experiences.map((exp: any) => (
            <div key={exp.id} className="bg-white rounded-lg shadow-md p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{exp.title}</h2>
                  <p className="text-xl text-gray-600">{exp.company}</p>
                </div>
                <span className="text-gray-500 font-medium">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">{exp.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {exp.tech_stack?.map((tech: string, index: number) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
