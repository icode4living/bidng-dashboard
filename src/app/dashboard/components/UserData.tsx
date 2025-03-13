import { useState } from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client/core';
const GET_USER_BY_ID = gql`
  query GetUserById($id:ID!){
  getUserById(id:$id){
    id
        name
        email
        phone
        permissions
        tickets
        badges
        createdAt
        updatedAt
  }
  }
`;

// Define the User type
type User = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  permissions: string[];
  tickets: number;
  badges: string[];
  createdAt: string;
  updatedAt: string;
};

// Define the props for the component
type UserPageProps = {
  user: User;
};

const UserPage: React.FC<UserPageProps> = ({ user }) => {
  const router = useRouter();
  const [permissions, setPermissions] = useState<string[]>(user.permissions);
  const [newPermission, setNewPermission] = useState<string>('');

  const handleAddPermission = async () => {
    if (newPermission.trim() === '') return;

    const updatedPermissions = [...permissions, newPermission];
    setPermissions(updatedPermissions);
    setNewPermission('');

    // Call API to update permissions
    await updateUserPermissions(user.id, updatedPermissions);
  };

  const handleRemovePermission = async (permission: string) => {
    const updatedPermissions = permissions.filter((p) => p !== permission);
    setPermissions(updatedPermissions);

    // Call API to update permissions
    await updateUserPermissions(user.id, updatedPermissions);
  };

  const updateUserPermissions = async (userId: string, updatedPermissions: string[]) => {
    const response = await fetch(`/api/user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ permissions: updatedPermissions }),
    });

    if (!response.ok) {
      console.error('Failed to update permissions');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">User Details</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">ID</label>
            <p className="mt-1 text-sm text-gray-900">{user.id}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-sm text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Permissions</label>
            <div className="mt-1 space-y-2">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-900">{permission}</span>
                  <button
                    onClick={() => handleRemovePermission(permission)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Add Permission</label>
            <div className="mt-1 flex space-x-2">
              <input
                type="text"
                value={newPermission}
                onChange={(e) => setNewPermission(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-lg"
                placeholder="Enter new permission"
              />
              <button
                onClick={handleAddPermission}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserPage;