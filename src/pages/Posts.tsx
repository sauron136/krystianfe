import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import PostForm from '@/components/PostForm';
import { getPosts, deletePost } from '@/lib/api';
import { Post } from '@/lib/api';

const Posts = () => {
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Posts</h2>
        <Button onClick={() => setShowCreateForm(true)}>Create Post</Button>
      </div>

      {showCreateForm && (
        <div className="mb-6 p-4 border rounded-lg">
          <PostForm 
            onSubmit={() => {
              queryClient.invalidateQueries({ queryKey: ['posts'] });
              setShowCreateForm(false);
            }} 
          />
        </div>
      )}

      {editingPost && (
        <div className="mb-6 p-4 border rounded-lg">
          <PostForm
            post={editingPost}
            onSubmit={() => {
              queryClient.invalidateQueries({ queryKey: ['posts'] });
              setEditingPost(null);
            }}
          />
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts?.map((post: Post) => (
            <TableRow key={post.id}>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.category}</TableCell>
              <TableCell>
                <Button variant="outline" onClick={() => setEditingPost(post)} className="mr-2">
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => deleteMutation.mutate(post.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Posts;