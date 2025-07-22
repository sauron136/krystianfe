import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createProject, updateProject } from '@/lib/api';
import { Project } from '@/lib/api';

interface ProjectFormProps {
  project?: Project;
  onSubmit: () => void;
}

const ProjectForm = ({ project, onSubmit }: ProjectFormProps) => {
  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [category, setCategory] = useState(project?.category || '');
  const [link, setLink] = useState(project?.link || '');
  const [imageUrl, setImageUrl] = useState(project?.image_url || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (project) {
        await updateProject(project.id, { title, description, category, link, image_url: imageUrl });
      } else {
        await createProject({ title, description, category, link, image_url: imageUrl });
      }
      onSubmit();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <Input
        placeholder="Link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <Input
        placeholder="Image URL (optional)"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
    </form>
  );
};

export default ProjectForm;
