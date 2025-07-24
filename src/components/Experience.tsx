import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Experience as ExperienceType } from '../App';
import { AnimatedSection } from './AnimatedSection';

interface ExperienceProps {
  experiences: ExperienceType[];
}

export function Experience({ experiences }: ExperienceProps) {
  return (
    <AnimatedSection id="experience" className="py-16">
      <div className="sticky top-0 z-20 -mx-8 mb-4 w-screen bg-slate-900/75 px-8 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm uppercase tracking-widest text-slate-200 lg:sr-only">
          Experience
        </h2>
      </div>

      <div className="space-y-8">
        {experiences.slice(0, 4).map((experience, index) => (
          <div
            key={experience.id}
            className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 opacity-0 animate-slide-in-left"
            style={{
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            
            <header
              className="z-10 mb-2 mt-1 text-xs uppercase tracking-wide text-slate-500 sm:col-span-2"
              aria-label={`${experience.duration} at ${experience.company}`}
            >
              {experience.duration}
            </header>
            
            <div className="z-10 sm:col-span-6">
              <h3 className="leading-snug text-slate-200">
                <div>
                  <a
                    className="inline-flex items-baseline text-base leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link"
                    href="#"
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`${experience.title} at ${experience.company} (opens in a new tab)`}
                  >
                    <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                    <span>
                      {experience.title} · {experience.company}
                      <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                    </span>
                  </a>
                </div>
              </h3>
              
              <p className="mt-2 text-sm leading-normal text-slate-400">
                {experience.description}
              </p>
              
              <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                {experience.technologies.map((tech, techIndex) => (
                  <li key={tech} className="mr-1.5 mt-2">
                    <div 
                      className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs leading-5 text-teal-300 opacity-0 animate-fade-in"
                      style={{
                        animationDelay: `${(index * 0.2) + (techIndex * 0.1) + 0.4}s`
                      }}
                    >
                      {tech}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <a
          className="inline-flex items-center text-base leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group"
          href="/resume.pdf"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="View Full Résumé (opens in a new tab)"
        >
          <span>
            <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
              View Full Résumé
            </span>
            <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
          </span>
        </a>
      </div>
    </AnimatedSection>
  );
}