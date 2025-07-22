import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { getProjects, getPosts } from '@/lib/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  const categories = [...new Set(projects.map((p: any) => p.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-4 md:px-8 max-w-4xl mx-auto text-center"
        id="home"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4">
          Welcome to Krystian's Portfolio
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-6">
          Technical Writer & Software Engineer | Sharing insights on coding, DevOps, and more.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
            <Link to="/projects">View Projects</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Contact Me</Link>
          </Button>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
        id="about"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 mb-4">
              I'm Krystian, a passionate technical writer and software engineer with expertise in creating clear documentation and building robust applications.
            </p>
            <p className="text-lg text-gray-700">
              My skills include React, FastAPI, TypeScript, and DevOps practices. Explore my projects and devlog to learn more about my work!
            </p>
          </CardContent>
        </Card>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-6xl mx-auto"
        id="projects"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">My Projects</h2>
        <Tabs defaultValue={categories[0] || 'all'} className="w-full">
          <TabsList className="mb-4">
            {categories.map((category: string) => (
              <TabsTrigger key={category} value={category} className="text-lg">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {categories.map((category: string) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects
                  .filter((p: any) => p.category === category)
                  .map((project: any) => (
                    <Card key={project.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {project.image_url && (
                          <img src={project.image_url} alt={project.title} className="w-full h-40 object-cover rounded-md mb-4" />
                        )}
                        <p className="text-gray-700 mb-4">{project.description}</p>
                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            View Project
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </motion.section>

      {/* Devlog Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
        id="devlog"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Devlog</h2>
        {posts.slice(0, 3).map((post: any) => ( // Limit to 3 posts for preview
          <Card key={post.id} className="mb-6 shadow-lg">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{post.content}</p>
              {post.language && (
                <div className="relative">
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => navigator.clipboard.writeText(post.content)}
                  >
                    Copy
                  </Button>
                  <SyntaxHighlighter language={post.language} style={vscDarkPlus}>
                    {post.content}
                  </SyntaxHighlighter>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        <Button asChild variant="outline">
          <Link to="/devlog">View All Posts</Link>
        </Button>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
        id="contact"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900">Contact Me</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <Input placeholder="Name" />
              <Input placeholder="Email" type="email" />
              <Textarea placeholder="Message" />
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
};

export default Home;