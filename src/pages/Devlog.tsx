import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getPosts } from '@/lib/api';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

const Devlog = () => {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <Navbar />
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-12 px-4 md:px-8 max-w-4xl mx-auto"
        id="devlog"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Devlog</h2>
        {posts.map((post: any) => (
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
      </motion.section>
    </div>
  );
};

export default Devlog;