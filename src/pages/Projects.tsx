import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { useQuery } from '@tanstack/react-query';
import { getProjects } from '@/lib/api';

type Project = {
  id: string | number;
  title: string;
  description: string;
  category: string;
  image_url?: string;
  link?: string;
};

const Projects = () => {
  const { data } = useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: getProjects,
  });
  const projects: Project[] = Array.isArray(data) ? data : [];

  const categories = Array.from(new Set(projects.map((p: Project) => p.category))) as string[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
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
    </div>
  );
};

export default Projects;