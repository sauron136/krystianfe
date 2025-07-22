export default function Posts() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Title" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Slug" className="w-full p-2 border rounded" />
        <textarea placeholder="Content" rows={6} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Category" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Submit</button>
      </form>
    </div>
  );
}