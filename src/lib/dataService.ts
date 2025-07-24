import apiClient from './apiClient';



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

export interface AboutParagraph {
  id: string;
  order: number;
  text: string;
}

export interface About {
  id: string;
  paragraphs: AboutParagraph[];
}

// Experience API service
export const experienceService = {
  getAll: async (): Promise<Experience[]> => {
    try {
      const response = await apiClient.get('/experiences');
      return response;
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  create: async (experience: Omit<Experience, 'id'>): Promise<Experience> => {
    try {
      const response = await apiClient.post('/experiences', experience);
      return response;
    } catch (error) {
      console.error('Error creating experience:', error);
      throw error;
    }
  },

  update: async (id: string, experience: Partial<Experience>): Promise<Experience> => {
    try {
      const response = await apiClient.put(`/experiences/${id}`, experience);
      return response;
    } catch (error) {
      console.error('Error updating experience:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/experiences/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting experience:', error);
      return false;
    }
  }
};

// Project API service
export const projectService = {
  getAll: async (): Promise<Project[]> => {
    try {
      const response = await apiClient.get('/projects');
      return response;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  create: async (project: Omit<Project, 'id'>): Promise<Project> => {
    try {
      const response = await apiClient.post('/projects', project);
      return response;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    try {
      const response = await apiClient.put(`/projects/${id}`, project);
      return response;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/projects/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting project:', error);
      return false;
    }
  }
};

// Blog API service
export const blogService = {
  getAll: async (): Promise<BlogPost[]> => {
    try {
      const response = await apiClient.get('/blog-posts');
      return response;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  },

  create: async (blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
    try {
      const response = await apiClient.post('/blog-posts', blogPost);
      return response;
    } catch (error) {
      console.error('Error creating blog post:', error);
      throw error;
    }
  },

  update: async (id: string, blogPost: Partial<BlogPost>): Promise<BlogPost> => {
    try {
      const response = await apiClient.put(`/blog-posts/${id}`, blogPost);
      return response;
    } catch (error) {
      console.error('Error updating blog post:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<boolean> => {
    try {
      await apiClient.delete(`/blog-posts/${id}`);
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }
};

// About API service
export const aboutService = {
  get: async (): Promise<About | null> => {
    try {
      const response = await apiClient.get('/about');
      return response;
    } catch (error) {
      if (error.response?.status === 404) {
        return null;
      }
      console.error('Error fetching about:', error);
      throw error;
    }
  },

  update: async (about: About): Promise<About> => {
    try {
      const response = await apiClient.put('/about', about);
      return response;
    } catch (error) {
      console.error('Error updating about:', error);
      throw error;
    }
  },

  create: async (about: Omit<About, 'id'>): Promise<About> => {
    try {
      const response = await apiClient.post('/about', about);
      return response;
    } catch (error) {
      console.error('Error creating about:', error);
      throw error;
    }
  },

  delete: async (): Promise<boolean> => {
    try {
      await apiClient.delete('/about');
      return true;
    } catch (error) {
      console.error('Error deleting about:', error);
      return false;
    }
  }
};

// Auth service for admin functionality
export const authService = {
  login: async (username: string, password: string): Promise<{ access_token: string; token_type: string }> => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await apiClient.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Store token for future requests
      if (response.access_token) {
        localStorage.setItem('authToken', response.access_token);
      }
      
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  register: async (userData: { username: string; email: string; password: string }) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('authToken');
  }
};