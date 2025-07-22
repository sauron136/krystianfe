import React from 'react';

const experiences = [
  {
    company: 'Klaviyo',
    title: 'Senior Frontend Engineer, Accessibility',
    period: '2018 — 2024',
    description: 'Build and maintain critical components used to construct Klaviyo’s frontend, focusing on accessibility and best practices.'
  },
  {
    company: 'Upstatement',
    title: 'Lead Engineer',
    period: '2017',
    description: 'Built, styled, and shipped high-quality websites, design systems, and digital experiences for a diverse array of projects.'
  },
  // Add more as needed
];

const Experience = () => (
  <section className="py-16" id="experience">
    <h2 className="text-2xl font-bold text-accent mb-8">Experience</h2>
    <ul className="space-y-8">
      {experiences.map((exp, idx) => (
        <li key={idx} className="bg-card rounded-lg p-6 shadow text-white">
          <h3 className="text-lg font-semibold">{exp.title} <span className="text-accent">@ {exp.company}</span></h3>
          <span className="block text-sm text-muted mb-2">{exp.period}</span>
          <p>{exp.description}</p>
        </li>
      ))}
    </ul>
  </section>
);

export default Experience;
