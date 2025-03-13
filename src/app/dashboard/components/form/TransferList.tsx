import { useState, useEffect } from 'react';

interface TransferListProps {
  allPermissions: string[];
  initialAssignedPermissions: string[];
  onChange?: (assignedPermissions: string[]) => void;
}

const TransferList = ({
  allPermissions,
  initialAssignedPermissions,
  onChange,
}: TransferListProps) => {
  const [availablePermissions, setAvailablePermissions] = useState<string[]>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<string[]>([]);
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<string[]>([]);

  // Initialize available and assigned permissions
  useEffect(() => {
    const available = allPermissions.filter(
      (permission) => !initialAssignedPermissions.includes(permission)
    );
    setAvailablePermissions(available);
    setAssignedPermissions(initialAssignedPermissions);
  }, [allPermissions, initialAssignedPermissions]);

  // Move selected items from available to assigned
  const assignPermissions = () => {
    const newAssigned = [...assignedPermissions, ...selectedAvailable];
    const newAvailable = availablePermissions.filter((p) => !selectedAvailable.includes(p));
    setAssignedPermissions(newAssigned);
    setAvailablePermissions(newAvailable);
    setSelectedAvailable([]);
    onChange(newAssigned);
  };

  // Move selected items from assigned to available
  const unassignPermissions = () => {
    const newAvailable = [...availablePermissions, ...selectedAssigned];
    const newAssigned = assignedPermissions.filter((p) => !selectedAssigned.includes(p));
    setAssignedPermissions(newAssigned);
    setAvailablePermissions(newAvailable);
    setSelectedAssigned([]);
    onChange(newAssigned);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg" suppressHydrationWarning>
      <h1 className="text-2xl font-bold mb-6 text-center">Assign Permissions</h1>
      <div className="flex space-x-6">
        {/* Available Permissions List */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Available Permissions</h2>
          <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto">
            {availablePermissions.map((permission) => (
              <div
                key={permission}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  selectedAvailable.includes(permission)
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedAvailable((prev) =>
                    prev.includes(permission)
                      ? prev.filter((p) => p !== permission)
                      : [...prev, permission]
                  );
                }}
              >
                {permission}
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Buttons */}
        <div className="flex flex-col justify-center space-y-4">
          <button
            onClick={assignPermissions}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            &gt;
          </button>
          <button
            onClick={unassignPermissions}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            &lt;
          </button>
        </div>

        {/* Assigned Permissions List */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-4">Assigned Permissions</h2>
          <div className="border border-gray-300 rounded-lg p-4 h-64 overflow-y-auto">
            {assignedPermissions.map((permission) => (
              <div
                key={permission}
                className={`p-2 mb-2 rounded cursor-pointer ${
                  selectedAssigned.includes(permission)
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => {
                  setSelectedAssigned((prev) =>
                    prev.includes(permission)
                      ? prev.filter((p) => p !== permission)
                      : [...prev, permission]
                  );
                }}
              >
                {permission}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferList;