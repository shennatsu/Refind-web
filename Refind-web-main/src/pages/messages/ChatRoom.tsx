import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

interface Message {
  _id: string;
  text: string;
  sender: { _id: string; name: string };
  receiver: { _id: string; name: string };
  createdAt: string;
}

export default function ChatRoom() {
  const { userId } = useParams();
  const { token, user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();
  }, [userId, token]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/messages",
        { receiverId: userId, text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages([...messages, res.data.data]);
      setText("");
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="p-6 h-[80vh] flex flex-col">
      <div className="flex-1 overflow-y-auto border p-4 rounded-lg space-y-3">
        {messages.map((m) => (
          <div
            key={m._id}
            className={`flex ${m.sender._id === user?._id ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-2xl max-w-[70%] ${
                m.sender._id === user?._id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <p>{m.text}</p>
              <span className="text-xs opacity-70 block mt-1">
                {new Date(m.createdAt).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}></div>
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Tulis pesan..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded-l-lg"
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded-r-lg"
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
