import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ItemCard from '../components/ItemCard';
import type { ItemData } from '../components/ItemCard';
import { PlusCircle, Search, Loader2, Frown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { username } = useAuth(); 
  
  // --- STATE MANAGEMENT ---
  const [allItems, setAllItems] = useState<ItemData[]>([]); // Menyimpan data asli dari API
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk filter dan search
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [sortOrder, setSortOrder] = useState('Terbaru');

  // --- FETCH DATA DARI BACKEND (SIMULASI) ---
  useEffect(() => {
    const fetchItems = async () => {
      // NANTI: Ganti bagian ini dengan fetch ke API temanmu
      try {
        // const response = await fetch('/api/items');
        // const data = await response.json();
        
        // SIMULASI DATA DENGAN FORMAT TANGGAL YANG BENAR
        const dummyItems: ItemData[] = [
            { id: 1, category: "Elektronik", title: "Airpods Pro Generasi 2", location: "Kantin Fakultas Teknik", date: "2025-09-28T10:00:00Z", status: "Ditemukan", imageUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=Airpods" },
            { id: 2, category: "Tumbler", title: "Tumbler Corkcicle Hitam", location: "Perpustakaan Pusat, Lt. 2", date: "2025-09-28T09:00:00Z", status: "Hilang" },
            { id: 3, category: "Aksesoris", title: "Jam Tangan Casio", location: "Masjid Darul Ilmi", date: "2025-09-27T14:00:00Z", status: "Ditemukan", imageUrl: "https://placehold.co/600x400/f59e0b/FFFFFF?text=Jam" },
            { id: 4, category: "Kunci", title: "Kunci Motor Honda Vario", location: "Parkiran Gedung A", date: "2025-09-26T18:00:00Z", status: "Ditemukan" },
            { id: 5, category: "Buku", title: "Buku Kalkulus Lanjut", location: "Ruang Baca Perpustakaan", date: "2025-09-25T11:00:00Z", status: "Hilang", imageUrl: "https://placehold.co/600x400/14b8a6/FFFFFF?text=Buku" }
        ];

        await new Promise(res => setTimeout(res, 1000)); // Simulasi delay network
        setAllItems(dummyItems);

      } catch (err: unknown) {
        console.error("Fetch error:", err);
        setError("Gagal memuat data barang. Coba refresh halaman.");
      } finally {
        setIsLoading(false);
        
      }
    };
    fetchItems();
  }, []); // [] berarti hanya dijalankan sekali saat komponen dimuat

  // --- LOGIKA FILTER DAN SORT ---
  const filteredAndSortedItems = useMemo(() => {
    return allItems
      .filter(item => {
        // Filter berdasarkan kategori
        if (categoryFilter !== 'Semua' && item.category !== categoryFilter) {
          return false;
        }
        // Filter berdasarkan pencarian (judul)
        if (searchTerm && !item.title.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        // Sort berdasarkan tanggal
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'Terbaru' ? dateB - dateA : dateA - dateB;
      });
  }, [allItems, searchTerm, categoryFilter, sortOrder]);

  const categories = useMemo(() => ['Semua', ...new Set(allItems.map(item => item.category))], [allItems]);

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Header Dashboard */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Selamat Datang, {username || 'Pengguna'}!</h1>
          <p className="text-gray-500 mt-1">Temukan barang hilang atau laporkan penemuanmu di sini.</p>
        </div>
        <Link to="/lapor" className="mt-4 md:mt-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
          <PlusCircle className="w-5 h-5" /><span>Lapor Barang</span>
        </Link>
      </div>

      {/* Filter dan Search Bar yang Fungsional */}
      <div className="bg-white p-4 rounded-lg shadow-sm border mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-grow w-full">
          <input type="text" placeholder="Cari barang..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border rounded-lg" />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} className="w-full md:w-auto px-4 py-3 border rounded-lg bg-gray-50">
            <option value="Terbaru">Terbaru</option>
            <option value="Terlama">Terlama</option>
          </select>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)} className="w-full md:w-auto px-4 py-3 border rounded-lg bg-gray-50">
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Grid untuk daftar barang (dengan kondisi) */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-blue-600" size={40} /></div>
      ) : error ? (
        <div className="text-center py-10 text-red-500">{error}</div>
      ) : filteredAndSortedItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredAndSortedItems.map(item => <ItemCard key={item.id} {...item} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-lg">
          <Frown className="mx-auto text-gray-400" size={48} />
          <h3 className="mt-2 text-xl font-semibold text-gray-700">Tidak ada hasil ditemukan</h3>
          <p className="mt-1 text-gray-500">Coba ubah kata kunci pencarian atau filter Anda.</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;