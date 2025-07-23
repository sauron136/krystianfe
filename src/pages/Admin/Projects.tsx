import { useState } from "react";
import axios from "axios";

export default function Projects() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/projects",
        { title, slug, description, url },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Project saved");
    } catch (err) {
      alert("Failed to save project");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-2 border rounded" required />
        <textarea placeholder="Description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Project URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Save Project</button>
      </form>
    </div>
  );
}