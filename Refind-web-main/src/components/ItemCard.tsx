import { MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

// Struktur data dari backend MongoDB dan frontend (gabungan)
export interface ItemData {
  _id?: string; // dari MongoDB
  id?: number; // dummy atau fallback
  category: string;
  title: string;
  location: string;
  date: string;
  status: 'Ditemukan' | 'Hilang';
  imageUrl?: string;
}

const ItemCard = (props: ItemData) => {
  // Ambil data dari props (pakai _id jika ada, fallback ke id biasa)
  const { _id, id, category, title, location, date, status, imageUrl } = props;
  const { isLoggedIn } = useAuth();

  // Jika belum login → cegah buka halaman detail
  const handleCardClick = (event: React.MouseEvent) => {
    if (!isLoggedIn) {
      event.preventDefault();
      alert('Anda harus login terlebih dahulu untuk melihat detail barang.');
      window.location.href = '/login';
    }
  };

  // Warna berdasarkan status
  const statusStyles = {
    Ditemukan: {
      badgeBg: 'bg-emerald-100',
      badgeText: 'text-emerald-800',
      headerBg: 'bg-emerald-500'
    },
    Hilang: {
      badgeBg: 'bg-red-100',
      badgeText: 'text-red-800',
      headerBg: 'bg-red-500'
    }
  };

  const currentStyle = statusStyles[status] || statusStyles.Ditemukan;

  // URL tujuan detail item
  const itemUrl = `/item/${_id || id}`;

  return (
    <a
      href={itemUrl}
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm border overflow-hidden group block transform hover:-translate-y-1 transition-transform"
    >
      {/* Gambar */}
      <div
        className={`w-full h-40 flex items-center justify-center text-white text-3xl font-bold p-4`}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
          backgroundColor: !imageUrl ? currentStyle.headerBg : 'transparent',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {!imageUrl && category}
      </div>

      {/* Detail Item */}
      <div className="p-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${currentStyle.badgeBg} ${currentStyle.badgeText}`}
        >
          {status}
        </span>
        <h3 className="font-bold text-gray-800 text-lg mt-3 truncate">{title}</h3>
        <p className="flex items-center text-sm text-gray-600 mt-1">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          {location}
        </p>
        <p className="text-xs text-gray-400 mt-3">{date}</p>
      </div>
    </a>
  );
};

export default ItemCard;
