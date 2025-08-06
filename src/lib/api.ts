// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiClient {
  private baseURL: string;
  
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }
    }

    try {
      const response = await fetch(url, config);
      
      // Handle token refresh if access token expired
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          const newToken = localStorage.getItem('access_token');
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };
          const retryResponse = await fetch(url, config);
          if (!retryResponse.ok) {
            throw new Error(`HTTP error! status: ${retryResponse.status}`);
          }
          return retryResponse.json();
        } else {
          // Refresh failed, redirect to login
          window.location.href = '/admin/login';
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  private async refreshToken(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    // Clear invalid tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    return false;
  }

  // Auth methods
  async login(email: string, password: string) {
    const response = await this.request<{
      access_token: string;
      refresh_token: string;
      token_type: string;
    }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store tokens
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);
    
    return response;
  }

  async logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  async getCurrentUser() {
    return this.request<{
      id: string;
      email: string;
      role: string;
      is_active: boolean;
    }>('/auth/me');
  }

  // Site Settings
  async getSiteSettings() {
    return this.request('/content/site-settings');
  }

  async updateSiteSettings(data: any) {
    return this.request('/content/site-settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Experiences
  async getExperiences(featuredOnly = false, limit?: number) {
    const params = new URLSearchParams();
    if (featuredOnly) params.append('featured_only', 'true');
    if (limit) params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params}` : '';
    return this.request(`/content/experiences${query}`);
  }

  async createExperience(data: any) {
    return this.request('/content/experiences', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateExperience(id: string, data: any) {
    return this.request(`/content/experiences/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteExperience(id: string) {
    return this.request(`/content/experiences/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderExperiences(itemIds: string[]) {
    return this.request('/content/experiences/reorder', {
      method: 'POST',
      body: JSON.stringify({ item_ids: itemIds }),
    });
  }

  // Projects
  async getProjects(featuredOnly = false, limit?: number) {
    const params = new URLSearchParams();
    if (featuredOnly) params.append('featured_only', 'true');
    if (limit) params.append('limit', limit.toString());
    
    const query = params.toString() ? `?${params}` : '';
    return this.request(`/content/projects${query}`);
  }

  async createProject(data: any) {
    return this.request('/content/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProject(id: string, data: any) {
    return this.request(`/content/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProject(id: string) {
    return this.request(`/content/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Blog Posts
  async getBlogPosts(publishedOnly = false, limit?: number) {
    const endpoint = publishedOnly ? '/content/blog-posts/public' : '/content/blog-posts';
    const params = limit ? `?limit=${limit}` : '';
    return this.request(`${endpoint}${params}`);
  }

  async getBlogPostBySlug(slug: string) {
    return this.request(`/content/blog-posts/${slug}`);
  }

  async createBlogPost(data: any) {
    return this.request('/content/blog-posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlogPost(id: string, data: any) {
    return this.request(`/content/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Social Links
  async getSocialLinks() {
    return this.request('/content/social-links');
  }

  async createSocialLink(data: any) {
    return this.request('/content/social-links', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Tech Stack Options
  async getTechStackOptions() {
    return this.request('/content/tech-stack-options');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
