import { useState, useEffect } from 'react';
import { Send, ArrowLeft, Loader2 } from 'lucide-react';

// Tipe data untuk menjaga konsistensi
interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
  time: string;
}

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other'; // Untuk menentukan posisi bubble chat
  timestamp: string;
}

const ChatPage = () => {
  // --- State Management ---
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');

  const [isLoadingConvos, setIsLoadingConvos] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // --- Fetch Daftar Percakapan (saat komponen pertama kali dimuat) ---
  useEffect(() => {
    // SIMULASI FETCH DARI /api/conversations
    setTimeout(() => {
      const dummyConversations: Conversation[] = [
        { id: 1, name: "Budi Santoso", avatar: "B", lastMsg: "Iya itu barang kamu kah?", time: "9:15 PM" },
        { id: 2, name: "Andi Wijaya", avatar: "A", lastMsg: "Ok, nanti aku kabarin lagi ya", time: "Kemarin" },
      ];
      setConversations(dummyConversations);
      setIsLoadingConvos(false);
    }, 1000); // Delay 1 detik
  }, []);

  // --- Fetch Isi Pesan (saat pengguna memilih chat) ---
  useEffect(() => {
    if (selectedChatId === null) return;

    setIsLoadingMessages(true);
    // SIMULASI FETCH DARI /api/messages/{selectedChatId}
    setTimeout(() => {
      const dummyMessages: Record<number, Message[]> = {
        1: [
          { id: 101, text: "Hai aku liat postingan kamu yang itu", sender: 'other', timestamp: '9:10 PM' },
          { id: 102, text: "Iya itu barang kamu kah?", sender: 'me', timestamp: '9:15 PM' },
        ],
        2: [
          { id: 201, text: "Gimana bro, udah ketemu belum?", sender: 'other', timestamp: 'Kemarin' },
          { id: 202, text: "Belum nih, masih dicari.", sender: 'me', timestamp: 'Kemarin' },
          { id: 203, text: "Ok, nanti aku kabarin lagi ya", sender: 'other', timestamp: 'Kemarin' },
        ],
      };
      setMessages(dummyMessages[selectedChatId] || []);
      setIsLoadingMessages(false);
    }, 500); // Delay 0.5 detik
  }, [selectedChatId]);

  // --- Handle Pengiriman Pesan ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const sentMessage: Message = {
      id: Date.now(), // ID sementara
      text: newMessage,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Tampilkan pesan langsung di layar (Optimistic UI)
    setMessages(prev => [...prev, sentMessage]);
    setNewMessage(''); // Kosongkan input

    // Nanti, di sini kamu akan mengirim `sentMessage` ke API POST /api/messages
    console.log("Mengirim pesan ke backend:", sentMessage);
  };

  const currentChat = conversations.find(c => c.id === selectedChatId);

  return (
    <div className="container mx-auto h-[calc(100vh-80px)] flex border rounded-lg overflow-hidden shadow-lg">
      <div className={`w-full md:w-1/3 border-r bg-gray-50 flex-shrink-0 ${selectedChatId !== null ? 'hidden md:block' : 'block'}`}>
        <div className="p-4 border-b"><h2 className="text-xl font-bold">Messages</h2></div>
        {isLoadingConvos ? (
            <div className="p-4 text-center text-gray-500">Memuat percakapan...</div>
        ) : (
            <div>{conversations.map(convo => (
                <button key={convo.id} onClick={() => setSelectedChatId(convo.id)} className={`w-full text-left p-4 border-b hover:bg-gray-100 flex gap-3 ${selectedChatId === convo.id ? 'bg-blue-50' : ''}`}>
                    <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">{convo.avatar}</div>
                    <div className="flex-grow overflow-hidden">
                        <p className="font-bold">{convo.name}</p>
                        <p className="text-sm text-gray-500 truncate">{convo.lastMsg}</p>
                    </div>
                    <p className="text-xs text-gray-400 flex-shrink-0">{convo.time}</p>
                </button>
            ))}</div>
        )}
      </div>

      {/* Panel Kanan: Jendela Chat Aktif */}
      <div className={`w-full md:w-2/3 flex flex-col ${selectedChatId === null ? 'hidden md:flex' : 'flex'}`}>
        {currentChat ? (
          <>
            <div className="p-4 border-b flex items-center gap-4 bg-white">
              <button onClick={() => setSelectedChatId(null)} className="md:hidden p-2 rounded-full hover:bg-gray-100"><ArrowLeft /></button>
              <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center font-bold text-blue-700">{currentChat.avatar}</div>
              <h3 className="font-bold">{currentChat.name}</h3>
            </div>
            {/* Area Pesan */}
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-100">
              {isLoadingMessages ? (
                <div className="flex justify-center items-center h-full"><Loader2 className="animate-spin text-gray-400" /></div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`${msg.sender === 'me' ? 'bg-blue-600 text-white' : 'bg-white'} p-3 rounded-lg max-w-xs shadow-sm`}>
                      {msg.text}
                      <p className={`text-xs mt-1 ${msg.sender === 'me' ? 'text-blue-200' : 'text-gray-400'}`}>{msg.timestamp}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Input Pesan */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t flex items-center gap-3">
              <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Tulis pesan..." className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
              <button type="submit" className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"><Send /></button>
            </form>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Pilih percakapan untuk memulai</div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;


