// Mock data service - replace with real Supabase operations when connected

export interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  link?: string;
}

// Mock localStorage-based data storage
const STORAGE_KEYS = {
  EXPERIENCES: 'portfolio_experiences',
  PROJECTS: 'portfolio_projects',
  BLOG_POSTS: 'portfolio_blog_posts'
};

// Initialize with default data
const initializeData = () => {
  if (!localStorage.getItem(STORAGE_KEYS.EXPERIENCES)) {
    const defaultExperiences: Experience[] = [
      {
        id: "1",
        period: "2024 — PRESENT",
        title: "Senior Frontend Engineer, Accessibility",
        company: "Klaviyo",
        description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including designers, product managers, and other engineers, to translate designs into intuitive, optimized UI components that help deliver thoughtful design with robust engineering.",
        technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
        link: "#"
      },
      {
        id: "2",
        period: "2018 — 2024",
        title: "Lead Engineer",
        company: "Upstatement",
        description: "Worked with the UI team to engineer and improve major features of Netlify's platform, with a focus on user experience and customer-facing features. Led process for improving the accessibility of the platform across the entire product.",
        technologies: ["HTML", "CSS", "JavaScript", "jQuery"]
      }
    ];
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(defaultExperiences));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
    const defaultProjects: Project[] = [
      {
        id: "1",
        title: "Build a Spotify Connected App",
        description: "Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
        technologies: ["React", "Express", "Spotify API", "Heroku"],
        link: "#",
        image: "https://images.unsplash.com/photo-1611532736793-4b9fd2e91ba4?w=200&h=120&fit=crop&crop=center"
      },
      {
        id: "2",
        title: "Spotify Profile",
        description: "Web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
        technologies: ["React", "Express", "Spotify API", "Heroku"],
        link: "#",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=120&fit=crop&crop=center"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(defaultProjects));
  }

  if (!localStorage.getItem(STORAGE_KEYS.BLOG_POSTS)) {
    const defaultBlogPosts: BlogPost[] = [
      {
        id: "1",
        title: "Building Accessible React Components",
        description: "A deep dive into creating React components that are accessible by default, covering ARIA patterns, keyboard navigation, and screen reader support.",
        date: "Mar 2024",
        link: "#"
      },
      {
        id: "2",
        title: "Modern CSS Techniques for 2024",
        description: "Exploring the latest CSS features including container queries, cascade layers, and modern layout techniques that are changing how we build interfaces.",
        date: "Jan 2024",
        link: "#"
      }
    ];
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(defaultBlogPosts));
  }
};

// Initialize data on first load
if (typeof window !== 'undefined') {
  initializeData();
}

// Experience CRUD operations
export const experienceService = {
  getAll: (): Experience[] => {
    const data = localStorage.getItem(STORAGE_KEYS.EXPERIENCES);
    return data ? JSON.parse(data) : [];
  },

  create: (experience: Omit<Experience, 'id'>): Experience => {
    const experiences = experienceService.getAll();
    const newExperience: Experience = {
      ...experience,
      id: Date.now().toString()
    };
    experiences.push(newExperience);
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
    return newExperience;
  },

  update: (id: string, experience: Partial<Experience>): Experience | null => {
    const experiences = experienceService.getAll();
    const index = experiences.findIndex(exp => exp.id === id);
    if (index === -1) return null;

    experiences[index] = { ...experiences[index], ...experience };
    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(experiences));
    return experiences[index];
  },

  delete: (id: string): boolean => {
    const experiences = experienceService.getAll();
    const filteredExperiences = experiences.filter(exp => exp.id !== id);
    if (filteredExperiences.length === experiences.length) return false;

    localStorage.setItem(STORAGE_KEYS.EXPERIENCES, JSON.stringify(filteredExperiences));
    return true;
  }
};

// Project CRUD operations
export const projectService = {
  getAll: (): Project[] => {
    const data = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return data ? JSON.parse(data) : [];
  },

  create: (project: Omit<Project, 'id'>): Project => {
    const projects = projectService.getAll();
    const newProject: Project = {
      ...project,
      id: Date.now().toString()
    };
    projects.push(newProject);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return newProject;
  },

  update: (id: string, project: Partial<Project>): Project | null => {
    const projects = projectService.getAll();
    const index = projects.findIndex(proj => proj.id === id);
    if (index === -1) return null;

    projects[index] = { ...projects[index], ...project };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    return projects[index];
  },

  delete: (id: string): boolean => {
    const projects = projectService.getAll();
    const filteredProjects = projects.filter(proj => proj.id !== id);
    if (filteredProjects.length === projects.length) return false;

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filteredProjects));
    return true;
  }
};

// Blog post CRUD operations
export const blogService = {
  getAll: (): BlogPost[] => {
    const data = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
    return data ? JSON.parse(data) : [];
  },

  create: (blogPost: Omit<BlogPost, 'id'>): BlogPost => {
    const blogPosts = blogService.getAll();
    const newBlogPost: BlogPost = {
      ...blogPost,
      id: Date.now().toString()
    };
    blogPosts.push(newBlogPost);
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
    return newBlogPost;
  },

  update: (id: string, blogPost: Partial<BlogPost>): BlogPost | null => {
    const blogPosts = blogService.getAll();
    const index = blogPosts.findIndex(post => post.id === id);
    if (index === -1) return null;

    blogPosts[index] = { ...blogPosts[index], ...blogPost };
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
    return blogPosts[index];
  },

  delete: (id: string): boolean => {
    const blogPosts = blogService.getAll();
    const filteredBlogPosts = blogPosts.filter(post => post.id !== id);
    if (filteredBlogPosts.length === blogPosts.length) return false;

    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(filteredBlogPosts));
    return true;
  }
};

// When integrating with Supabase, replace the above localStorage operations with:
/*
// Example Supabase operations (uncomment when connected):

import { supabase } from './supabase'

export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  create: async (experience: Omit<Experience, 'id'>): Promise<Experience> => {
    const { data, error } = await supabase
      .from('experiences')
      .insert([experience])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  update: async (id: string, experience: Partial<Experience>): Promise<Experience> => {
    const { data, error } = await supabase
      .from('experiences')
      .update(experience)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  }
};
*/