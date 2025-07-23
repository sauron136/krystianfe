import { useState, useEffect } from 'react';
import { getAbout, getExperience, getProjects } from '../api/portfolio';
import Hero from './sections/Hero';
import About from './sections/AboutSection';
import Experience from './sections/ExperienceSection';
import Projects from './sections/ProjectsSection';
import Blog from './sections/BlogSection';

const Portfolio = () => {
  const [aboutData, setAboutData] = useState(null);
  const [experienceData, setExperienceData] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch each piece of data independently
      try {
        const about = await getAbout();
        setAboutData(about);
      } catch (err) {
        console.error('Error fetching about data:', err);
        setAboutData(null);
      }

      try {
        const experience = await getExperience();
        setExperienceData(experience);
      } catch (err) {
        console.error('Error fetching experience data:', err);
        setExperienceData([]);
      }

      try {
        const projects = await getProjects();
        setProjectsData(projects);
      } catch (err) {
        console.error('Error fetching projects data:', err);
        setProjectsData([]);
      }

      setBlogData([]);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading portfolio...</div>
      </div>
    );
  }

  const heroData = aboutData ? {
    name: aboutData.name || "Your Name",
    title: aboutData.title || "Software Engineer",
    subtitle: "Building things for the web",
    description: aboutData.bio || "Welcome to my portfolio",
    social_links: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      email: "your.email@example.com"
    }
  } : {
    name: "Your Name",
    title: "Software Engineer", 
    subtitle: "Building things for the web",
    description: "Welcome to my portfolio",
    social_links: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      email: "your.email@example.com"
    }
  };

  return (
    <div className="bg-white">
      <Hero data={heroData} />
      <About data={aboutData} />
      <Experience data={experienceData} />
      <Projects data={projectsData} />
      <Blog data={blogData} />
    </div>
  );
};

export default Portfolio;