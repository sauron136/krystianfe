interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies?: string[];
  location?: string;
}

interface ExperienceProps {
  data: ExperienceItem[];
}

const Experience = ({ data }: ExperienceProps) => {
  if (!data.length) {
    return (
      <section id="experience" className="min-h-screen flex items-center py-20">
        <div>Loading experience data...</div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          Where I've Worked
        </h2>
        
        <div className="space-y-12">
          {data.map((job, index) => (
            <div key={job.id} className="border-l-4 border-blue-500 pl-8 relative">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full"></div>
              
              <div className="mb-2">
                <h3 className="text-2xl font-semibold text-gray-900">
                  {job.position}
                </h3>
                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                  <span className="font-medium">{job.company}</span>
                  <span>•</span>
                  <span>{job.duration}</span>
                  {job.location && (
                    <>
                      <span>•</span>
                      <span>{job.location}</span>
                    </>
                  )}
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">
                {job.description}
              </p>
              
              {job.technologies && (
                <div className="flex flex-wrap gap-2">
                  {job.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;