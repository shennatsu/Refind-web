import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Edit3, LogOut, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileData {
  username: string;
  bio: string;
  photoUrl: string;
}

interface HistoryItem {
  id: number;
  title: string;
  date: string;
  status: 'Hilang' | 'Sudah Ditemukan';
}

const Profile = () => {
  const { username, logout } = useAuth();
  
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [bioInput, setBioInput] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- "COLOKAN" #1: Mengambil Data ---
  useEffect(() => {
    const fetchProfileData = async () => {
      // NANTI: Ganti bagian ini dengan fetch ke API temanmu
      try {
        const dummyProfile: ProfileData = { username: username || "User", bio: "Nak Teknik 24", photoUrl: "" };
        const dummyHistory: HistoryItem[] = [
          { id: 2, title: 'Tumbler Corkcicle Hitam', date: '26 Sep 2025', status: 'Hilang' },
          { id: 3, title: 'Charger Laptop Type-C', date: '25 Sep 2025', status: 'Sudah Ditemukan' },
        ];
        
        await new Promise(res => setTimeout(res, 1000));

        setProfile(dummyProfile);
        setHistory(dummyHistory);
        setBioInput(dummyProfile.bio);
      } catch (error) {
        console.error("Gagal mengambil data profil", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfileData();
  }, [username]);

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  // --- "COLOKAN" #2: Menyimpan Data ---
  const handleSaveChanges = async () => {
    // NANTI: Ganti bagian ini dengan fetch API sungguhan
    const updatedData = { bio: bioInput };
    console.log("Menyimpan data ke backend:", updatedData);
    alert("Profil berhasil diperbarui!");
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-96"><Loader2 className="animate-spin text-blue-600" size={48} /></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border max-w-2xl mx-auto">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <img 
              src={photoPreview || profile?.photoUrl || `https://ui-avatars.com/api/?name=${username}&background=e0e7ff&color=4338ca`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
            />
             <button onClick={() => fileInputRef.current?.click()} className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full hover:bg-blue-700 border-2 border-white">
              <Edit3 size={14} />
            </button>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{profile?.username}</h1>
            <p className="text-gray-500">{bioInput}</p>
          </div>
        </div>
        <div className="mt-6">
          <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Edit Bio</label>
          <input type="text" id="bio" value={bioInput} onChange={(e) => setBioInput(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={logout} className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 flex items-center gap-2 font-semibold">
            <LogOut size={16}/> Logout
          </button>
          <button onClick={handleSaveChanges} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2 font-semibold">
            <Edit3 size={16} /> Save Changes
          </button>
        </div>
      </div>

      <div className="mt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Histori Laporan Saya</h2>
        <div className="space-y-4">
          {history.length > 0 ? history.map(report => (
            <div key={report.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
              <div>
                <p className={`font-semibold ${report.status === 'Hilang' ? 'text-red-600' : 'text-green-600'}`}>{report.title}</p>
                <p className="text-sm text-gray-500">{report.date} • {report.status}</p>
              </div>
              <Link to={`/item/${report.id}`} className="text-sm text-blue-600 font-semibold hover:underline">
                Lihat Detail
              </Link>
            </div>
          )) : (
            <p className="text-center text-gray-500">Kamu belum pernah membuat laporan.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

