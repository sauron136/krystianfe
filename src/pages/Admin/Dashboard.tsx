import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/posts" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          Manage Posts
        </Link>
        <Link to="/admin/categories" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          Manage Categories
        </Link>
        <Link to="/admin/projects" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          Manage Projects
        </Link>
        <Link to="/admin/experience" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          Manage Experience
        </Link>
        <Link to="/admin/about" className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200">
          Edit About Section
        </Link>
      </div>
    </div>
  );
}