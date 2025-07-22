import React from 'react';

const Hero = () => (
  <section className="flex flex-col gap-4 pt-16 pb-24" id="hero">
    <h1 className="text-accent text-lg font-mono">Hi, my name is</h1>
    <h2 className="text-4xl sm:text-5xl font-extrabold text-primary">Krystian Nmeze</h2>
    <h3 className="text-3xl sm:text-4xl font-bold text-secondary">I build things for the web.</h3>
    <p className="max-w-xl text-gray-500 mt-4">
      I’m a Software Engineer specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on building accessible, human-centered products.
    </p>
    <a href="#projects" className="mt-8 inline-block px-6 py-3 bg-accent text-white font-semibold rounded shadow hover:bg-opacity-80 transition">Check out my work</a>
  </section>
);

export default Hero;
