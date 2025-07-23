import { useState } from "react";
import axios from "axios";

export default function Posts() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/posts",
        { title, slug, content, category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Post created");
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Content" rows={6} value={content} onChange={(e) => setContent(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Submit</button>
      </form>
    </div>
  );
}