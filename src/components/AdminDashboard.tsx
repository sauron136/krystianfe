import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Save } from 'lucide-react';
import { PersonalInfo, Experience, Project, BlogPost } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { calculateReadTimeFromSources } from './utils/readTime';

interface AdminDashboardProps {
  personalInfo: PersonalInfo | null;
  experiences: Experience[];
  projects: Project[];
  blogPosts: BlogPost[];
  onUpdatePersonalInfo: (info: PersonalInfo) => void;
  onUpdateExperiences: (experiences: Experience[]) => void;
  onUpdateProjects: (projects: Project[]) => void;
  onUpdateBlogPosts: (posts: BlogPost[]) => void;
  onExit: () => void;
}

type EditMode = {
  type: 'experience' | 'project' | 'blog' | null;
  id: string | null;
  isNew: boolean;
};

export function AdminDashboard({
  personalInfo,
  experiences,
  projects,
  blogPosts,
  onUpdatePersonalInfo,
  onUpdateExperiences,
  onUpdateProjects,
  onUpdateBlogPosts,
  onExit
}: AdminDashboardProps) {
  const [editMode, setEditMode] = useState<EditMode>({ type: null, id: null, isNew: false });
  const [formData, setFormData] = useState<any>({});

  // Personal Info handlers
  const handlePersonalInfoUpdate = async (updatedInfo: PersonalInfo) => {
    try {
      // API call: const response = await fetch('/api/personal-info', { method: 'PUT', body: JSON.stringify(updatedInfo) });
      onUpdatePersonalInfo(updatedInfo);
    } catch (error) {
      console.error('Error updating personal info:', error);
    }
  };

  // Experience handlers
  const handleExperienceAdd = () => {
    setEditMode({ type: 'experience', id: 'new', isNew: true });
    setFormData({
      title: '',
      company: '',
      duration: '',
      description: '',
      technologies: [],
      current: false
    });
  };

  const handleExperienceEdit = (exp: Experience) => {
    setEditMode({ type: 'experience', id: exp.id, isNew: false });
    setFormData({ ...exp, technologies: exp.technologies.join(', ') });
  };

  const handleExperienceSave = async () => {
    try {
      const expData = {
        ...formData,
        technologies: formData.technologies.split(',').map((t: string) => t.trim()),
        id: editMode.isNew ? `exp_${Date.now()}` : formData.id
      };

      if (editMode.isNew) {
        onUpdateExperiences([...experiences, expData]);
      } else {
        onUpdateExperiences(experiences.map(exp => exp.id === expData.id ? expData : exp));
      }
      
      setEditMode({ type: null, id: null, isNew: false });
      setFormData({});
    } catch (error) {
      console.error('Error saving experience:', error);
    }
  };

  const handleExperienceDelete = async (id: string) => {
    try {
      onUpdateExperiences(experiences.filter(exp => exp.id !== id));
    } catch (error) {
      console.error('Error deleting experience:', error);
    }
  };

  // Project handlers
  const handleProjectAdd = () => {
    setEditMode({ type: 'project', id: 'new', isNew: true });
    setFormData({
      title: '',
      description: '',
      technologies: [],
      githubUrl: '',
      liveUrl: '',
      image: ''
    });
  };

  const handleProjectEdit = (project: Project) => {
    setEditMode({ type: 'project', id: project.id, isNew: false });
    setFormData({ ...project, technologies: project.technologies.join(', ') });
  };

  const handleProjectSave = async () => {
    try {
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map((t: string) => t.trim()),
        id: editMode.isNew ? `proj_${Date.now()}` : formData.id
      };

      if (editMode.isNew) {
        onUpdateProjects([...projects, projectData]);
      } else {
        onUpdateProjects(projects.map(proj => proj.id === projectData.id ? projectData : proj));
      }
      
      setEditMode({ type: null, id: null, isNew: false });
      setFormData({});
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleProjectDelete = async (id: string) => {
    try {
      onUpdateProjects(projects.filter(proj => proj.id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  // Blog handlers
  const handleBlogAdd = () => {
    setEditMode({ type: 'blog', id: 'new', isNew: true });
    setFormData({
      title: '',
      excerpt: '',
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '',
      slug: '',
      image: ''
    });
  };

  const handleBlogEdit = (post: BlogPost) => {
    setEditMode({ type: 'blog', id: post.id, isNew: false });
    setFormData({ ...post, publishedAt: post.publishedAt.split('T')[0] });
  };

  const handleBlogSave = async () => {
    try {
      // Calculate dynamic read time based on title and excerpt
      const dynamicReadTime = calculateReadTimeFromSources(formData.title, formData.excerpt);
      
      const blogData = {
        ...formData,
        readTime: dynamicReadTime, // Use calculated read time
        id: editMode.isNew ? `blog_${Date.now()}` : formData.id
      };

      if (editMode.isNew) {
        onUpdateBlogPosts([...blogPosts, blogData]);
      } else {
        onUpdateBlogPosts(blogPosts.map(post => post.id === blogData.id ? blogData : post));
      }
      
      setEditMode({ type: null, id: null, isNew: false });
      setFormData({});
    } catch (error) {
      console.error('Error saving blog post:', error);
    }
  };

  const handleBlogDelete = async (id: string) => {
    try {
      onUpdateBlogPosts(blogPosts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting blog post:', error);
    }
  };

  const handleCancel = () => {
    setEditMode({ type: null, id: null, isNew: false });
    setFormData({});
  };

  // Calculate preview read time when editing blog posts
  const previewReadTime = formData.title && formData.excerpt 
    ? calculateReadTimeFromSources(formData.title, formData.excerpt)
    : '';

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl">Admin Dashboard</h1>
          <Button onClick={onExit} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Exit Admin
          </Button>
        </div>

        <Tabs defaultValue="personal" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {personalInfo && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={personalInfo.name}
                        onChange={(e) => handlePersonalInfoUpdate({
                          ...personalInfo,
                          name: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={personalInfo.title}
                        onChange={(e) => handlePersonalInfoUpdate({
                          ...personalInfo,
                          title: e.target.value
                        })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={personalInfo.bio}
                        onChange={(e) => handlePersonalInfoUpdate({
                          ...personalInfo,
                          bio: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={personalInfo.email}
                        onChange={(e) => handlePersonalInfoUpdate({
                          ...personalInfo,
                          email: e.target.value
                        })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={personalInfo.location}
                        onChange={(e) => handlePersonalInfoUpdate({
                          ...personalInfo,
                          location: e.target.value
                        })}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Experience</h2>
              <Button onClick={handleExperienceAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            {editMode.type === 'experience' && (
              <Card>
                <CardHeader>
                  <CardTitle>{editMode.isNew ? 'Add' : 'Edit'} Experience</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="exp-title">Title</Label>
                      <Input
                        id="exp-title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="exp-company">Company</Label>
                      <Input
                        id="exp-company"
                        value={formData.company || ''}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="exp-duration">Duration</Label>
                      <Input
                        id="exp-duration"
                        value={formData.duration || ''}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="exp-technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="exp-technologies"
                        value={formData.technologies || ''}
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="exp-description">Description</Label>
                      <Textarea
                        id="exp-description"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleExperienceSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {experiences.map((exp) => (
                <Card key={exp.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg">{exp.title} at {exp.company}</h3>
                        <p className="text-sm text-slate-400">{exp.duration}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleExperienceEdit(exp)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleExperienceDelete(exp.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 mb-2">{exp.description}</p>
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-teal-400/10 text-teal-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Projects</h2>
              <Button onClick={handleProjectAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {editMode.type === 'project' && (
              <Card>
                <CardHeader>
                  <CardTitle>{editMode.isNew ? 'Add' : 'Edit'} Project</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="proj-title">Title</Label>
                      <Input
                        id="proj-title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="proj-image">Image URL</Label>
                      <Input
                        id="proj-image"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="proj-github">GitHub URL</Label>
                      <Input
                        id="proj-github"
                        value={formData.githubUrl || ''}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="proj-live">Live URL (optional)</Label>
                      <Input
                        id="proj-live"
                        value={formData.liveUrl || ''}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="proj-technologies">Technologies (comma-separated)</Label>
                      <Input
                        id="proj-technologies"
                        value={formData.technologies || ''}
                        onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="proj-description">Description</Label>
                      <Textarea
                        id="proj-description"
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleProjectSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg">{project.title}</h3>
                        <p className="text-sm text-slate-300 mb-2">{project.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleProjectEdit(project)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleProjectDelete(project.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-teal-400/10 text-teal-300 rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Tab */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl">Blog Posts</h2>
              <Button onClick={handleBlogAdd}>
                <Plus className="w-4 h-4 mr-2" />
                Add Blog Post
              </Button>
            </div>

            {editMode.type === 'blog' && (
              <Card>
                <CardHeader>
                  <CardTitle>{editMode.isNew ? 'Add' : 'Edit'} Blog Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="blog-title">Title</Label>
                      <Input
                        id="blog-title"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-slug">Slug</Label>
                      <Input
                        id="blog-slug"
                        value={formData.slug || ''}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-date">Published Date</Label>
                      <Input
                        id="blog-date"
                        type="date"
                        value={formData.publishedAt || ''}
                        onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-image">Featured Image URL</Label>
                      <Input
                        id="blog-image"
                        value={formData.image || ''}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="blog-excerpt">Excerpt</Label>
                      <Textarea
                        id="blog-excerpt"
                        value={formData.excerpt || ''}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                      />
                    </div>
                    {previewReadTime && (
                      <div className="col-span-2">
                        <div className="bg-teal-400/10 text-teal-300 px-3 py-2 rounded text-sm">
                          <strong>Calculated Read Time:</strong> {previewReadTime}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleBlogSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg">{post.title}</h3>
                        <p className="text-sm text-slate-400">
                          {post.publishedAt} · 
                          <span className="bg-teal-400/10 text-teal-300 px-2 py-1 rounded ml-2">
                            {calculateReadTimeFromSources(post.title, post.excerpt)}
                          </span>
                        </p>
                        <p className="text-sm text-slate-300 mt-2">{post.excerpt}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => handleBlogEdit(post)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleBlogDelete(post.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}