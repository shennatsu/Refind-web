import { MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
// Bagian ini tolong Item Card udah siap API lu map data hasil fetch nya apus aja dummy importnnya (mock items) ini gw pake buat lu ada bayangin aja. Nanti lu cuma perlu map data hasil fetch
export interface ItemData {
  id: number;
  category: string;
  title: string;
  location: string;
  date: string;
  status: 'Ditemukan' | 'Hilang';
  imageUrl?: string;
}

const ItemCard = (props: ItemData) => {
  const { id, category, title, location, date, status, imageUrl } = props;
  const { isLoggedIn } = useAuth();

  const handleCardClick = (event: React.MouseEvent) => {
    if (!isLoggedIn) { 
      event.preventDefault(); 
      alert("Anda harus login terlebih dahulu untuk melihat detail barang.");
      window.location.href = '/login'; 
    }
  };
  
  const statusStyles = { Ditemukan: { badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-800', headerBg: 'bg-emerald-500' }, Hilang: { badgeBg: 'bg-red-100', badgeText: 'text-red-800', headerBg: 'bg-red-500' }};
  const currentStyle = statusStyles[status];

  return (
    <a href={`/item/${id}`} onClick={handleCardClick} className="bg-white rounded-lg shadow-sm border overflow-hidden group block transform hover:-translate-y-1 transition-transform">
      {/*Backend tolong tambahin handling image URL */}
      <div className={`w-full h-40 flex items-center justify-center text-white text-3xl font-bold p-4`} style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none', backgroundColor: !imageUrl ? currentStyle.headerBg : 'transparent', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        {!imageUrl && category}
      </div>
      <div className="p-4">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${currentStyle.badgeBg} ${currentStyle.badgeText}`}>{status}</span>
        <h3 className="font-bold text-gray-800 text-lg mt-3 truncate">{title}</h3>
        <p className="flex items-center text-sm text-gray-600 mt-1"><MapPin className="w-4 h-4 mr-2 text-gray-400" />{location}</p>
        <p className="text-xs text-gray-400 mt-3">{date}</p>
      </div>
    </a>
  );
};

export default ItemCard;