import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { X, Plus, Edit, Trash2, Eye, Settings } from "lucide-react";
import { toast } from "sonner";

// Mock data types
interface Experience {
  id: string;
  period: string;
  title: string;
  company: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  image?: string;
}

interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  link?: string;
}

export function AdminDashboard() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("experiences");

  // Initialize with mock data
  useEffect(() => {
    // Mock API call - replace with real Supabase calls
    setExperiences([
      {
        id: "1",
        period: "2024 — PRESENT",
        title: "Senior Frontend Engineer, Accessibility",
        company: "Klaviyo",
        description: "Build and maintain critical components used to construct Klaviyo's frontend, across the whole product. Work closely with cross-functional teams, including designers, product managers, and other engineers.",
        technologies: ["JavaScript", "TypeScript", "React", "Storybook"],
        link: "#"
      }
    ]);

    setProjects([
      {
        id: "1",
        title: "Build a Spotify Connected App",
        description: "Video course that teaches how to build a web app with the Spotify Web API. Topics covered include the principles of REST APIs, user auth flows, Node, Express, React, Styled Components, and more.",
        technologies: ["React", "Express", "Spotify API", "Heroku"],
        link: "#",
        image: "https://images.unsplash.com/photo-1611532736793-4b9fd2e91ba4?w=200&h=120&fit=crop&crop=center"
      }
    ]);

    setBlogPosts([
      {
        id: "1",
        title: "Building Accessible React Components",
        description: "A deep dive into creating React components that are accessible by default, covering ARIA patterns, keyboard navigation, and screen reader support.",
        date: "Mar 2024",
        link: "#"
      }
    ]);
  }, []);

  const handleSave = (data: any, type: string) => {
    // Mock API call - replace with real Supabase operations
    if (editingItem) {
      // Update existing item
      if (type === "experience") {
        setExperiences(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
      } else if (type === "project") {
        setProjects(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
      } else if (type === "blog") {
        setBlogPosts(prev => prev.map(item => item.id === editingItem.id ? { ...data, id: editingItem.id } : item));
      }
      toast("Item updated successfully!");
    } else {
      // Create new item
      const newItem = { ...data, id: Date.now().toString() };
      if (type === "experience") {
        setExperiences(prev => [...prev, newItem]);
      } else if (type === "project") {
        setProjects(prev => [...prev, newItem]);
      } else if (type === "blog") {
        setBlogPosts(prev => [...prev, newItem]);
      }
      toast("Item created successfully!");
    }
    
    setIsDialogOpen(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string, type: string) => {
    // Mock API call - replace with real Supabase operations
    if (type === "experience") {
      setExperiences(prev => prev.filter(item => item.id !== id));
    } else if (type === "project") {
      setProjects(prev => prev.filter(item => item.id !== id));
    } else if (type === "blog") {
      setBlogPosts(prev => prev.filter(item => item.id !== id));
    }
    toast("Item deleted successfully!");
  };

  const openEditDialog = (item: any, type: string) => {
    setEditingItem({ ...item, type });
    setIsDialogOpen(true);
  };

  const openCreateDialog = (type: string) => {
    setEditingItem(null);
    setActiveTab(type);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-800/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Settings className="h-6 w-6 text-teal-400" />
              <h1 className="text-xl font-semibold">Portfolio Admin Dashboard</h1>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open("/", "_blank")}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Live Site
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="experiences" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          </TabsList>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Experiences</h2>
              <Button onClick={() => openCreateDialog("experiences")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Experience
              </Button>
            </div>
            
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <Card key={exp.id} className="p-6 bg-slate-800/50 border-slate-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-slate-200">{exp.title}</h3>
                        <span className="text-slate-400">·</span>
                        <span className="text-slate-400">{exp.company}</span>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{exp.period}</p>
                      <p className="text-slate-400 mb-3 line-clamp-2">{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-teal-400/10 text-teal-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(exp, "experience")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(exp.id, "experience")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Projects</h2>
              <Button onClick={() => openCreateDialog("projects")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>
            
            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="p-6 bg-slate-800/50 border-slate-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-200 mb-2">{project.title}</h3>
                      <p className="text-slate-400 mb-3 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <Badge key={tech} variant="secondary" className="bg-teal-400/10 text-teal-300">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(project, "project")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id, "project")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Blog Posts Tab */}
          <TabsContent value="blog" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Manage Blog Posts</h2>
              <Button onClick={() => openCreateDialog("blog")}>
                <Plus className="h-4 w-4 mr-2" />
                Add Blog Post
              </Button>
            </div>
            
            <div className="grid gap-4">
              {blogPosts.map((post) => (
                <Card key={post.id} className="p-6 bg-slate-800/50 border-slate-700">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-200 mb-2">{post.title}</h3>
                      <p className="text-sm text-slate-500 mb-2">{post.date}</p>
                      <p className="text-slate-400 line-clamp-2">{post.description}</p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(post, "blog")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(post.id, "blog")}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Edit" : "Create"} {
                activeTab === "experiences" ? "Experience" : 
                activeTab === "projects" ? "Project" : "Blog Post"
              }
            </DialogTitle>
          </DialogHeader>
          
          {activeTab === "experiences" && (
            <ExperienceForm 
              experience={editingItem} 
              onSave={(data) => handleSave(data, "experience")}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
          
          {activeTab === "projects" && (
            <ProjectForm 
              project={editingItem} 
              onSave={(data) => handleSave(data, "project")}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
          
          {activeTab === "blog" && (
            <BlogForm 
              blogPost={editingItem} 
              onSave={(data) => handleSave(data, "blog")}
              onCancel={() => setIsDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Experience Form Component
function ExperienceForm({ experience, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    period: experience?.period || "",
    title: experience?.title || "",
    company: experience?.company || "",
    description: experience?.description || "",
    technologies: experience?.technologies || [],
    link: experience?.link || ""
  });
  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="period">Period</Label>
          <Input
            id="period"
            value={formData.period}
            onChange={(e) => setFormData(prev => ({ ...prev, period: e.target.value }))}
            placeholder="2024 — PRESENT"
            className="bg-slate-700 border-slate-600"
          />
        </div>
        <div>
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Company Name"
            className="bg-slate-700 border-slate-600"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="title">Job Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="Senior Frontend Engineer"
          className="bg-slate-700 border-slate-600"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your role and responsibilities..."
          className="bg-slate-700 border-slate-600 min-h-24"
        />
      </div>
      
      <div>
        <Label htmlFor="link">Link (optional)</Label>
        <Input
          id="link"
          value={formData.link}
          onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
          placeholder="https://company.com"
          className="bg-slate-700 border-slate-600"
        />
      </div>
      
      <div>
        <Label>Technologies</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            className="bg-slate-700 border-slate-600"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {formData.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-teal-400/10 text-teal-300">
              {tech}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTechnology(tech)} />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

// Project Form Component
function ProjectForm({ project, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    technologies: project?.technologies || [],
    link: project?.link || "",
    image: project?.image || ""
  });
  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, techInput.trim()]
      }));
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Project Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="My Awesome Project"
          className="bg-slate-700 border-slate-600"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your project..."
          className="bg-slate-700 border-slate-600 min-h-24"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="link">Project Link (optional)</Label>
          <Input
            id="link"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            placeholder="https://project.com"
            className="bg-slate-700 border-slate-600"
          />
        </div>
        <div>
          <Label htmlFor="image">Image URL (optional)</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://images.unsplash.com/..."
            className="bg-slate-700 border-slate-600"
          />
        </div>
      </div>
      
      <div>
        <Label>Technologies</Label>
        <div className="flex gap-2 mb-2">
          <Input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add technology"
            className="bg-slate-700 border-slate-600"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
          />
          <Button type="button" onClick={addTechnology}>Add</Button>
        </div>
        <div className="flex flex-wrap gap-1">
          {formData.technologies.map((tech) => (
            <Badge key={tech} variant="secondary" className="bg-teal-400/10 text-teal-300">
              {tech}
              <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTechnology(tech)} />
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

// Blog Form Component
function BlogForm({ blogPost, onSave, onCancel }: any) {
  const [formData, setFormData] = useState({
    title: blogPost?.title || "",
    description: blogPost?.description || "",
    date: blogPost?.date || "",
    link: blogPost?.link || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="title">Blog Post Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
          placeholder="My Latest Blog Post"
          className="bg-slate-700 border-slate-600"
        />
      </div>
      
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Brief description of the blog post..."
          className="bg-slate-700 border-slate-600 min-h-24"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            placeholder="Mar 2024"
            className="bg-slate-700 border-slate-600"
          />
        </div>
        <div>
          <Label htmlFor="link">Link (optional)</Label>
          <Input
            id="link"
            value={formData.link}
            onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            placeholder="https://blog.com/post"
            className="bg-slate-700 border-slate-600"
          />
        </div>
      </div>
      
      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}