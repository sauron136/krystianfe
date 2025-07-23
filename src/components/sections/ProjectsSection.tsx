import { ExternalLink, Github, Folder } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  link?: string;
  image_url?: string;
  technologies?: string[];
  github_url?: string;
}

interface ProjectsProps {
  data: Project[];
}

const Projects = ({ data }: ProjectsProps) => {
  if (!data.length) {
    return (
      <section id="projects" className="min-h-screen bg-slate-900 flex items-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="animate-pulse text-slate-400">Loading projects data...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="space-y-16">
          <div className="flex items-center space-x-4">
            <span className="text-emerald-400 font-mono text-lg">03.</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-200">
              Some Things I've Built
            </h2>
            <div className="flex-1 h-px bg-slate-700 ml-8"></div>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.map((project) => (
              <div key={project.id} className="group">
                <div className="h-full bg-slate-800 rounded-lg border border-slate-700 hover:border-emerald-400/50 transition-all duration-300 hover:transform hover:-translate-y-2">
                  {project.image_url ? (
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img 
                        src={project.image_url} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-emerald-400/10 group-hover:bg-transparent transition-colors duration-300"></div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 bg-slate-700 rounded-t-lg">
                      <Folder className="w-16 h-16 text-emerald-400" />
                    </div>
                  )}
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-mono text-sm">
                        {project.category}
                      </span>
                      <div className="flex items-center space-x-3">
                        {project.github_url && (
                          <a 
                            href={project.github_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                          >
                            <Github className="w-5 h-5" />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-emerald-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {project.description}
                    </p>
                    
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-slate-700 text-slate-300 rounded text-xs font-mono border border-slate-600"
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

export default Projects;