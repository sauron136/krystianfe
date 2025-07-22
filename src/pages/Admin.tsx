import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Posts from './Posts';
import AdminProjects from './AdminProject';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { Link, Navigate } from 'react-router-dom';

const Admin = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-6xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="posts" className="text-lg">Posts</TabsTrigger>
            <TabsTrigger value="projects" className="text-lg">Projects</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <Posts />
          </TabsContent>
          <TabsContent value="projects">
            <AdminProjects />
          </TabsContent>
        </Tabs>
      </motion.section>
    </div>
  );
};

export default Admin;