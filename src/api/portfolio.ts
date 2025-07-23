console.log('portfolio.ts file loaded');

import apiClient from './client';

export const getAbout = async () => {
  const response = await apiClient.get('/api/about');
  return response.data;
};

export const getExperience = async () => {
  const response = await apiClient.get('/api/experience');
  return response.data;
};

export const getProjects = async () => {
  const response = await apiClient.get('/api/projects');
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/api/categories');
  return response.data;
};

export const createAbout = async (data) => {
  const response = await apiClient.post('/api/about', data);
  return response.data;
};

export const updateAbout = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/about/1`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update about data');
  }
  
  return response.json();
};

export const createExperience = async (data) => {
  const response = await apiClient.post('/api/experience', data);
  return response.data;
};

export const createProject = async (data) => {
  const response = await apiClient.post('/api/projects', data);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const formData = new FormData();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  
  const response = await apiClient.post('/auth/token', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};