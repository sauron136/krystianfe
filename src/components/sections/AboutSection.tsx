import { MapPin, Building2 } from 'lucide-react';

interface AboutData {
  name: string;
  title: string;
  bio: string;
  current_company?: string;
  location?: string;
  skills?: string[];
  image_url?: string;
}

interface AboutProps {
  data: AboutData | null;
}

const About = ({ data }: AboutProps) => {
  if (!data) {
    return (
      <section id="about" className="min-h-screen bg-slate-900 flex items-center">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="animate-pulse text-slate-400">Loading about data...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="min-h-screen bg-slate-900 py-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-emerald-400 font-mono text-lg">01.</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-200">
                  {data.title || "About Me"}
                </h2>
                <div className="flex-1 h-px bg-slate-700 ml-8"></div>
              </div>
            </div>
            
            <div className="space-y-6">
              {(data.bio || "").split('\n').filter(p => p.trim()).map((paragraph, index) => (
                <p key={index} className="text-slate-400 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
              
              {(data.current_company || data.location) && (
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {data.current_company && (
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Building2 className="w-5 h-5 text-emerald-400" />
                      <span className="font-mono text-sm">Currently at {data.current_company}</span>
                    </div>
                  )}
                  {data.location && (
                    <div className="flex items-center space-x-2 text-slate-400">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <span className="font-mono text-sm">{data.location}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {data.skills && data.skills.length > 0 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-slate-200">
                  Technologies I work with:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-3 group">
                      <span className="text-emerald-400 font-mono text-sm group-hover:translate-x-1 transition-transform duration-200">▹</span>
                      <span className="text-slate-400 font-mono text-sm group-hover:text-slate-200 transition-colors duration-200">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {data.image_url && (
            <div className="relative group">
              <div className="relative">
                <div className="absolute -inset-4 border-2 border-emerald-400 rounded-lg transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <img 
                  src={data.image_url} 
                  alt="About" 
                  className="relative z-10 rounded-lg grayscale hover:grayscale-0 transition-all duration-300 w-full max-w-sm mx-auto lg:max-w-none"
                />
                <div className="absolute inset-0 bg-emerald-400/20 rounded-lg group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;