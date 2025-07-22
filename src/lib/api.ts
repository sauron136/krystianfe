import axios, { AxiosInstance } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust to your backend URL
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  language?: string;
  created_at: string;
  user_id: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  link?: string;
  image_url?: string;
  user_id: number;
}

export const register = async (email: string, password: string) => {
  const response = await api.post('/auth/register', { 
    username: email, 
    email: email, 
    password 
  });
  return response.data;
};

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/token', new URLSearchParams({
    username,
    password
  }), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  return response.data;
};

export const createPost = async (post: Omit<Post, 'id' | 'created_at' | 'user_id'>) => {
  const response = await api.post('/posts', post);
  return response.data;
};

export const getPosts = async (skip: number = 0, limit: number = 10, category?: string) => {
  const response = await api.get(`/posts?skip=${skip}&limit=${limit}${category ? `&category=${category}` : ''}`);
  return response.data;
};

export const updatePost = async (id: number, post: Omit<Post, 'id' | 'created_at' | 'user_id'>) => {
  const response = await api.put(`/posts/${id}`, post);
  return response.data;
};

export const deletePost = async (id: number) => {
  await api.delete(`/posts/${id}`);
};

export const createProject = async (project: Omit<Project, 'id' | 'user_id'>) => {
  const response = await api.post('/projects', project);
  return response.data;
};

export const getProjects = async (skip: number = 0, limit: number = 10) => {
  const response = await api.get(`/projects?skip=${skip}&limit=${limit}`);
  return response.data;
};

export const updateProject = async (id: number, project: Omit<Project, 'id' | 'user_id'>) => {
  const response = await api.put(`/projects/${id}`, project);
  return response.data;
};

export const deleteProject = async (id: number) => {
  await api.delete(`/projects/${id}`);
};