import React from 'react';

const projects = [
  {
    title: 'Spotify Profile',
    description: 'Web app for visualizing personalized Spotify data. View your top artists, tracks, and more.',
    tech: ['React', 'Express', 'Spotify API'],
    image: '',
    link: '#',
  },
  {
    title: 'Halcyon Theme',
    description: 'Minimal dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more.',
    tech: ['VS Code', 'Sublime', 'Atom'],
    image: '',
    link: '#',
  },
  // Add more as needed
];

const Projects = () => (
  <section className="py-16" id="projects">
    <h2 className="text-2xl font-bold text-accent mb-8">Projects</h2>
    <div className="grid md:grid-cols-2 gap-8">
      {projects.map((project, idx) => (
        <div key={idx} className="bg-card rounded-lg p-6 shadow text-white flex flex-col">
          <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
          <p className="mb-2">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {project.tech.map((t) => (
              <span key={t} className="bg-accent text-xs px-2 py-1 rounded text-white">{t}</span>
            ))}
          </div>
          {project.link && <a href={project.link} className="mt-auto text-accent hover:underline">View Project</a>}
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
