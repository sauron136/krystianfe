import React, { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Blog } from './components/Blog';
import { AdminDashboard } from './components/AdminDashboard';
import { AdminToggle } from './components/AdminToggle';

export interface PersonalInfo {
  name: string;
  title: string;
  bio: string;
  email: string;
  location: string;
  avatar: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  technologies: string[];
  current: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  slug: string;
  image: string;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock API calls - replace with actual FastAPI endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Replace with actual API calls
        // const personalInfoResponse = await fetch('/api/personal-info');
        // const experiencesResponse = await fetch('/api/experiences');
        // const projectsResponse = await fetch('/api/projects');
        // const blogPostsResponse = await fetch('/api/blog-posts?limit=4');
        
        // Mock data
        setPersonalInfo({
          name: "Krystian Nmeze",
          title: "Software Engineer",
          bio: "I build exceptional and accessible digital experiences for the web.",
          email: "krystianmaccs@gmail.com",
          location: "Lagos, NG",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b2e2d93b?w=150&h=150&fit=crop&crop=face",
          socialLinks: {
            github: "https://github.com/sauron136",
            linkedin: "https://linkedin.com/in/sauron136",
            twitter: "https://x.com/sauron136"
          }
        });

        setExperiences([
          {
            id: "1",
            title: "Senior Software Engineer",
            company: "Upstatement",
            duration: "2018 — Present",
            description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including developers, designers, and product managers to implement and advocate for best practices in web accessibility.",
            technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
            current: true
          },
          {
            id: "2",
            title: "Software Engineer",
            company: "Mullen",
            duration: "2015 — 2018",
            description: "Worked with a team of three designers to help construct a marketing website and e-commerce platform for blistabloc, an ambitious startup originating from Berlin, Germany.",
            technologies: ["JavaScript", "jQuery", "CSS", "WordPress"],
            current: false
          }
        ]);

        setProjects([
          {
            id: "1",
            title: "Build a Spotify Connected App",
            description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
            technologies: ["React", "Express", "Spotify API", "Styled Components"],
            githubUrl: "https://github.com",
            liveUrl: "https://spotify-profile.herokuapp.com",
            image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=200&fit=crop"
          },
          {
            id: "2",
            title: "Integrating Algolia Search",
            description: "Building a custom search experience with Algolia and React using their JavaScript API and React InstantSearch library.",
            technologies: ["Algolia", "React", "Gatsby", "Node.js"],
            githubUrl: "https://github.com",
            image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop"
          }
        ]);

        setBlogPosts([
          {
            id: "1",
            title: "Building Accessible React Components",
            excerpt: "A comprehensive guide to creating accessible React components that work for everyone.",
            publishedAt: "2024-01-15",
            readTime: "8 min read",
            slug: "building-accessible-react-components",
            image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=200&fit=crop"
          },
          {
            id: "2",
            title: "Modern CSS Techniques",
            excerpt: "Exploring the latest CSS features and how to use them effectively in modern web development.",
            publishedAt: "2024-01-10",
            readTime: "6 min read",
            slug: "modern-css-techniques",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=200&fit=crop"
          }
        ]);

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading...</div>
      </div>
    );
  }

  if (isAdmin) {
    return (
      <AdminDashboard
        personalInfo={personalInfo}
        experiences={experiences}
        projects={projects}
        blogPosts={blogPosts}
        onUpdatePersonalInfo={setPersonalInfo}
        onUpdateExperiences={setExperiences}
        onUpdateProjects={setProjects}
        onUpdateBlogPosts={setBlogPosts}
        onExit={() => setIsAdmin(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 overflow-hidden">
      <div className="flex">
        {/* Hero Section - Sticky */}
        <div className="w-1/2 min-h-screen sticky top-0">
          <Hero personalInfo={personalInfo} />
        </div>

        {/* Content Section - Scrollable */}
        <div className="w-1/2 min-h-screen overflow-y-auto">
          <div className="space-y-24 p-8">
            <About personalInfo={personalInfo} />
            <Experience experiences={experiences} />
            <Projects projects={projects} />
            <Blog blogPosts={blogPosts} />
          </div>
        </div>
      </div>

      <AdminToggle onToggle={() => setIsAdmin(true)} />
    </div>
  );
}

export default App;