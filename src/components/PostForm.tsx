import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from '@/components/ui/select';
import { createPost, updatePost } from '@/lib/api';
import { Post } from '@/lib/api';

interface PostFormProps {
  post?: Post;
  onSubmit: () => void;
}

// Grouped category data
const groupedCategories: Record<string, { value: string; label: string }[]> = {
  "Computer Science": [
    { value: 'computer-architecture', label: 'Computer Architecture' },
    { value: 'algorithm', label: 'Algorithm' },
    { value: 'telecommunication-networks', label: 'Telecommunication Networks' },
    { value: 'compiler', label: 'Compiler' },
    { value: 'operating-system', label: 'Operating & System' },
    { value: 'database', label: 'Database' },
    { value: 'software-architecture', label: 'Software Architecture' },
    { value: 'artificial-intelligence', label: 'Artificial Intelligence' },
  ],
  DevOps: [
    { value: 'aws', label: 'AWS' },
  ],
  Frameworks: [
    { value: 'django', label: 'Django' },
    { value: 'django-rest-framework', label: 'Django REST Framework' },
    { value: 'fastapi', label: 'FastAPI' },
    { value: 'flask', label: 'Flask' },
  ],
  "Programming Languages": [
    { value: 'c', label: 'C' },
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
  ],
};

const PostForm = ({ post, onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState(post?.title || '');
  const [content, setContent] = useState(post?.content || '');
  const [category, setCategory] = useState(post?.category || '');
  const [language, setLanguage] = useState(post?.language || '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (post) {
        await updatePost(post.id, { title, content, category, language });
      } else {
        await createPost({ title, content, category, language });
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
        required
      />
      <Textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-32"
        required
      />

      <Select
        value={category || '__placeholder__'}
        onValueChange={(val) => {
          if (val !== '__placeholder__') setCategory(val);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          <SelectGroup>
            <SelectItem value="__placeholder__" disabled>
              Select a category
            </SelectItem>
          </SelectGroup>
          {Object.entries(groupedCategories).map(([group, items]) => (
            <SelectGroup key={group}>
              <SelectLabel>{group}</SelectLabel>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      <Input
        placeholder="Language (e.g., python)"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      />
      <Button type="submit">{post ? 'Update' : 'Create'} Post</Button>
    </form>
  );
};

export default PostForm;
