export default function Categories() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
      <form className="space-y-4">
        <input type="text" placeholder="Name" className="w-full p-2 border rounded" />
        <input type="text" placeholder="Slug" className="w-full p-2 border rounded" />
        <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-800">Add Category</button>
      </form>
    </div>
  );
}