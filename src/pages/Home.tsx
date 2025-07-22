import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
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