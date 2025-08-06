// src/app/admin/dashboard/page.tsx
'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, logout, isAuthenticated, isSuperAdmin } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/admin/login');
    return <div>Redirecting to login...</div>;
  }

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Welcome, {user?.email}!
                </h2>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Role: <span className="font-medium">{user?.role}</span></p>
                  <p>Status: <span className="font-medium">{user?.is_active ? 'Active' : 'Inactive'}</span></p>
                  {isSuperAdmin && (
                    <p className="text-green-600 font-medium">Super Admin Access</p>
                  )}
                </div>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900">Site Settings</h3>
                    <p className="text-sm text-blue-700 mt-1">Manage hero, about & footer</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900">Experiences</h3>
                    <p className="text-sm text-green-700 mt-1">Add & edit work history</p>
                  </div>
                  
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-900">Projects</h3>
                    <p className="text-sm text-purple-700 mt-1">Showcase your work</p>
                  </div>
                  
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="font-medium text-yellow-900">Blog Posts</h3>
                    <p className="text-sm text-yellow-700 mt-1">Write & publish articles</p>
                  </div>
                  
                  {isSuperAdmin && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h3 className="font-medium text-red-900">User Management</h3>
                      <p className="text-sm text-red-700 mt-1">Manage blog editors</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
