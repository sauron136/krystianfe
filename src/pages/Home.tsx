import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/AboutSection';
import Experience from '@/components/sections/ExperienceSection';
import Projects from '@/components/sections/ProjectsSection';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';

const Home = () => (
  <Layout>
    <Hero />
    <About />
    <Experience />
    <Projects />
    <Writing />
    <Contact />
  </Layout>
);

export default Home;