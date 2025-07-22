import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/ProjectForm';
import { getProjects, deleteProject } from '@/lib/api';
import { Project } from '@/lib/api';

const AdminProjects = () => {
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const queryClient = useQueryClient();

  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold">Manage Projects</h3>
        <Button onClick={() => setEditingProject({})}>Add Project</Button>
      </div>

      {editingProject && (
        <div className="mb-6 p-4 border rounded-lg">
          <ProjectForm
            project={editingProject && editingProject.id ? (editingProject as Project) : undefined}
            onSubmit={() => {
              queryClient.invalidateQueries({ queryKey: ['projects'] });
              setEditingProject(null);
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
          {projects?.map((project: Project) => (
            <TableRow key={project.id}>
              <TableCell>{project.title}</TableCell>
              <TableCell>{project.category}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingProject(project)}
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteMutation.mutate(project.id)}
                >
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

export default AdminProjects;