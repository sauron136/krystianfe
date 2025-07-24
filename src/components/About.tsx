import React from 'react';
import { PersonalInfo } from '../App';
import { AnimatedSection } from './AnimatedSection';

interface AboutProps {
  personalInfo: PersonalInfo | null;
}

export function About({ personalInfo }: AboutProps) {
  return (
    <AnimatedSection id="about" className="py-16">
      <div className="sticky top-0 z-20 -mx-8 mb-4 w-screen bg-slate-900/75 px-8 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>
      
      <div className="space-y-4">
        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-slate-400 leading-normal">
            Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web development. Fast-forward to today, and I&apos;ve had the privilege of building software for an{' '}
            <a 
              href="#" 
              className="text-slate-200 hover:text-teal-300 transition-colors underline decoration-teal-300/50 underline-offset-4"
            >
              advertising agency
            </a>
            , a{' '}
            <a 
              href="#" 
              className="text-slate-200 hover:text-teal-300 transition-colors underline decoration-teal-300/50 underline-offset-4"
            >
              start-up
            </a>
            , a{' '}
            <a 
              href="#" 
              className="text-slate-200 hover:text-teal-300 transition-colors underline decoration-teal-300/50 underline-offset-4"
            >
              huge corporation
            </a>
            , and a{' '}
            <a 
              href="#" 
              className="text-slate-200 hover:text-teal-300 transition-colors underline decoration-teal-300/50 underline-offset-4"
            >
              digital product studio
            </a>
            .
          </p>
        </div>

        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-slate-400 leading-normal">
            My main focus these days is building accessible, inclusive products and digital experiences at{' '}
            <a 
              href="https://upstatement.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 hover:text-teal-300 transition-colors underline decoration-teal-300/50 underline-offset-4"
            >
              Upstatement
            </a>{' '}
            for a variety of clients. I most enjoy building software in the sweet spot where design and engineering meet — things that look good but are also built well under the hood.
          </p>
        </div>

        <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-slate-400 leading-normal">
            When I&apos;m not at the computer, I&apos;m usually rock climbing, reading, hanging out with my wife and two cats, or running around Hyrule searching for{' '}
            <span className="group/korok relative">
              <span className="text-slate-200 transition-colors group-hover/korok:text-yellow-400">
                Korok seeds
              </span>
              <span className="absolute -top-1 -right-1 opacity-0 transition-opacity group-hover/korok:opacity-100">
                🌰
              </span>
            </span>
            .
          </p>
        </div>
      </div>
    </AnimatedSection>
  );
}