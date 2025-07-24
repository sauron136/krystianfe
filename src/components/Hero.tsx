import React from 'react';
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
import { PersonalInfo } from '../App';

interface HeroProps {
  personalInfo: PersonalInfo | null;
}

export function Hero({ personalInfo }: HeroProps) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!personalInfo) {
    return (
      <div className="h-full p-8 flex items-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="h-full p-8 lg:p-16 flex flex-col justify-between relative">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl lg:text-5xl tracking-tight text-slate-200 mb-4">
            {personalInfo.name}
          </h1>
          <h2 className="text-lg text-slate-200 mb-4">
            {personalInfo.title}
          </h2>
          <p className="text-slate-400 max-w-xs leading-normal">
            {personalInfo.bio}
          </p>
        </div>

        {/* Navigation */}
        <nav className="space-y-4" aria-label="Main navigation">
          {[
            { name: 'About', id: 'about' },
            { name: 'Experience', id: 'experience' },
            { name: 'Projects', id: 'projects' },
            { name: 'Blog', id: 'blog' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center text-sm font-medium text-slate-500 hover:text-slate-200 transition-colors"
            >
              <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
              <span className="uppercase tracking-widest">
                {item.name}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Contact & Social Links - Now more prominently sticky */}
      <div className="sticky bottom-8 space-y-6 bg-slate-900/80 backdrop-blur-sm rounded-lg p-4 border border-slate-800/50">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-slate-400">
            <Mail className="w-4 h-4 mr-2" />
            <a 
              href={`mailto:${personalInfo.email}`}
              className="hover:text-slate-200 transition-colors"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center text-sm text-slate-400">
            <MapPin className="w-4 h-4 mr-2" />
            {personalInfo.location}
          </div>
        </div>

        <div className="flex space-x-5">
          <a
            href={personalInfo.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 hover:scale-110 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </a>
          <a
            href={personalInfo.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 hover:scale-110 transition-all duration-200"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href={personalInfo.socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-slate-200 hover:scale-110 transition-all duration-200"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6" />
          </a>
        </div>

        {/* Connection indicator */}
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
          <div className="ml-2 text-xs text-slate-500 uppercase tracking-wide">
            Available for opportunities
          </div>
        </div>
      </div>
    </div>
  );
}