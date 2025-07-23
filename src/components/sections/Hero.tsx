import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

interface HeroProps {
  data: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  if (!data) {
    return (
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-slate-400">Loading hero data...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center px-6 sm:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto w-full">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-slate-400 text-lg font-mono">Hi, my name is</p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-slate-200 leading-tight">
              {data.name}
            </h1>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-slate-400 leading-tight">
              {data.title}
            </h2>
          </div>
          
          <div className="max-w-2xl">
            <p className="text-lg text-slate-400 leading-relaxed">
              {data.description}
            </p>
          </div>

          <div className="flex items-center space-x-6 pt-4">
            {data.social_links?.github && (
              <a 
                href={data.social_links.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-mono text-sm">GitHub</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )}
            
            {data.social_links?.linkedin && (
              <a 
                href={data.social_links.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-mono text-sm">LinkedIn</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              </a>
            )}
            
            {data.social_links?.email && (
              <a 
                href={`mailto:${data.social_links.email}`}
                className="group flex items-center space-x-2 text-slate-400 hover:text-emerald-400 transition-colors duration-200"
              >
                <Mail className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-mono text-sm">Email</span>
              </a>
            )}
          </div>

          <div className="pt-8">
            <a 
              href="#about" 
              className="inline-flex items-center px-8 py-4 border border-emerald-400 text-emerald-400 font-mono text-sm hover:bg-emerald-400/10 transition-colors duration-200 group"
            >
              Check out my work
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;