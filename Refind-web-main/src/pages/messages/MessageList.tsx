import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";


interface ChatUser {
  _id: string;
  name: string;
  email: string;
}

export default function MessageList() {
  const [users, setUsers] = useState<ChatUser[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pesan</h1>
      <ul className="space-y-3">
        {users.map((u) => (
          <li
            key={u._id}
            className="border p-3 rounded-lg hover:bg-gray-100 transition"
          >
            <Link to={`/messages/${u._id}`} className="block">
              <p className="font-semibold">{u.name}</p>
              <p className="text-sm text-gray-600">{u.email}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
