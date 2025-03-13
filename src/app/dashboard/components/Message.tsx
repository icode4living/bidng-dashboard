"use client";
import graphqlHelper from "@/utils/graphqlClient";
import { gql } from "@apollo/client/core";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useDebounce } from "use-debounce";

export interface User {
  name?: string;
  id: string;
  email?: string;
  phone?: string;
}

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      name
      email
      id
      phone
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage($userId: String, $type: String, $message: String, $broadcast: Boolean) {
    sendMessage(userId: $userId, type: $type, message: $message, broadcast: $broadcast) {
      message
    }
  }
`;

const MessageSendingComponent: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);
  const [users, setUsers] = useState<User[]>([]);
  const [sending, setSending] = useState<boolean>(false);
  const [broadcast, setBroadcast] = useState<boolean>(false); // New state for broadcast

  async function getUsers() {
    try {
      const { getUsers } = await graphqlHelper.executeQuery(GET_USERS);
      setUsers(getUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const query = debouncedSearchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.phone?.toLowerCase().includes(query)
    );
  }, [users, debouncedSearchQuery]);

  const handleUserSelection = useCallback((userId: string) => {
    if (broadcast) return; // Prevent selection if broadcast mode is on
    setSelectedUserId((prev) => (prev === userId ? null : userId));
  }, [broadcast]);

  const handleSendMessage = useCallback(async () => {
    if (!message.trim()) {
      alert("Please enter a message.");
      return;
    }

    setSending(true);

    try {
      const messg = await graphqlHelper.executeMutation(SEND_MESSAGE, {
        userId: broadcast ? null : selectedUserId,
        type: "UPDATE",
        message: message,
        broadcast: broadcast,
      });

      if (messg) {
        alert(broadcast ? "Broadcast message sent to all users." : `Sent message to user.`);
        setMessage("");
        setSelectedUserId(null);
        setBroadcast(false);
      } else {
        alert("Message sending failed.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Message sending failed.");
    }

    setSending(false);
  }, [selectedUserId, message, broadcast]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Send Message</h2>

      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={broadcast} // Disable search when broadcasting
        />
      </div>

      {/* Broadcast Checkbox */}
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="checkbox"
          checked={broadcast}
          onChange={(e) => {
            setBroadcast(e.target.checked);
            if (e.target.checked) setSelectedUserId(null); // Deselect user if broadcasting
          }}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <label className="text-sm font-medium text-gray-700">Broadcast to all users</label>
      </div>

      {/* Conditionally render user list only if search query exists */}
      {debouncedSearchQuery && !broadcast && (
        <div className="mb-6 max-h-96 overflow-y-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-3 border-b">
                <div>
                  <p className="font-semibold">{user.name || "No Name"}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-600">{user.phone}</p>
                </div>
                <input
                  type="radio"
                  checked={selectedUserId === user.id}
                  onChange={() => handleUserSelection(user.id)}
                  className="form-radio h-5 w-5 text-blue-600"
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No users found.</p>
          )}
        </div>
      )}

      {/* Message Input */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
      />

      {/* Send Button */}
      <button
        onClick={handleSendMessage}
        className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        {sending ? "Sending..." : "Send Message"}
      </button>
    </div>
  );
};

export default MessageSendingComponent;
