import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';

const About = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
    <Navbar />
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
  </div>
);

export default About;