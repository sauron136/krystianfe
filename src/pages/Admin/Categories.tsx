import { useState } from "react";
import axios from "axios";

export default function Categories() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "/api/categories",
        { name, slug },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Category added");
    } catch (err) {
      alert("Failed to add category");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Add Category</button>
      </form>
    </div>
  );
}