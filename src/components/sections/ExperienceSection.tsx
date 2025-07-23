import { MapPin, Calendar } from 'lucide-react';

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
      <section id="experience" className="min-h-screen bg-slate-800 flex items-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="animate-pulse text-slate-400">Loading experience data...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="experience" className="min-h-screen bg-slate-800 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="space-y-16">
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono text-lg">02.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-200">
              Where I've Worked
            </h2>
            <div className="flex-1 h-px bg-slate-700 ml-8"></div>
          </div>
          
          <div className="space-y-12">
            {data.map((job, index) => (
              <div key={job.id} className="group">
                <div className="relative pl-8 border-l-2 border-slate-700 group-hover:border-emerald-400/50 transition-colors duration-300">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-slate-700 border-4 border-slate-800 rounded-full group-hover:bg-emerald-400 group-hover:border-slate-800 transition-colors duration-300"></div>
                  
                  <div className="pb-8">
                    <div className="space-y-3 mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-300">
                        {job.position}
                      </h3>
                      
                      <div className="text-lg font-semibold text-emerald-400">
                        @ {job.company}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-slate-400 font-mono text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        {job.location && (
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{job.location}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      {job.description.split('\n').filter(p => p.trim()).map((paragraph, pIndex) => (
                        <div key={pIndex} className="flex items-start space-x-3">
                          <span className="text-emerald-400 font-mono text-sm mt-2 flex-shrink-0">▹</span>
                          <p className="text-slate-400 leading-relaxed">
                            {paragraph}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    {job.technologies && job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {job.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="px-3 py-1 bg-slate-700/50 text-emerald-400 rounded-md text-sm font-mono border border-slate-600 hover:bg-slate-700 transition-colors duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;