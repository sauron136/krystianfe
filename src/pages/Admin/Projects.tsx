export default function Projects() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Project</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Project Title" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Slug" className="w-full p-2 border rounded" />
        <textarea placeholder="Description" rows={4} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Project URL" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Save Project</button>
      </form>
    </div>
  );
}