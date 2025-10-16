import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockItems } from '../data/mockItems';
import type { ItemData } from '../components/ItemCard';
import { User, MessageCircle, Flag } from 'lucide-react';

// Komponen Modal Laporan
const ReportModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
  if (!isOpen) return null;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Laporan telah terkirim. Terima kasih atas masukan Anda.");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Laporkan Postingan Ini</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">Mengapa Anda melaporkan postingan ini? Pilih salah satu alasan di bawah.</p>
        <form onSubmit={handleReportSubmit}>
          <div className="space-y-4">
            {['Spam atau iklan', 'Indikasi Penipuan (Scam)', 'Konten Tidak Pantas', 'Informasi Palsu (Hoax)', 'Lainnya'].map(reason => (
              <label key={reason} className="flex items-center space-x-3">
                <input type="radio" name="report_reason" value={reason} className="h-4 w-4" />
                <span>{reason}</span>
              </label>
            ))}
          </div>
          <textarea 
            placeholder="Berikan detail tambahan (opsional)..."
            className="w-full mt-6 p-2 border rounded-md h-24"
          ></textarea>
          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Batal</button>
            <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Kirim Laporan</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ItemDetail = () => {
  const { itemId } = useParams<{ itemId: string }>();
  const [item, setItem] = useState<ItemData | undefined>();
  const [isReportModalOpen, setReportModalOpen] = useState(false);

  useEffect(() => {
    // Simulasi fetch data: mencari item berdasarkan ID dari URL
    const foundItem = mockItems.find(i => i.id.toString() === itemId);
    setItem(foundItem);
  }, [itemId]);

  if (!item) {
    return <div className="text-center py-20">Item tidak ditemukan.</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Kolom Kiri: Gambar */}
          <div className="md:col-span-1">
            <img 
              src={item.imageUrl || `https://placehold.co/600x400/EEE/000?text=${item.category}`} 
              alt={item.title}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
          </div>

          {/* Kolom Kanan: Detail */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{item.title}</h1>
            <div className="space-y-4 text-lg">
              <div>
                <h3 className="font-semibold">Details</h3>
                <p className="text-gray-600">Ditemukan di dekat {item.location}. Kondisi barang masih bagus.</p>
              </div>
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">{item.location}</p>
              </div>
              <div>
                <h3 className="font-semibold">Type Item</h3>
                <p className="text-blue-600">#{item.category.replace(' ', '')}</p>
              </div>
            </div>

            {/* Pelapor & Aksi */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"><User size={20}/></div>
                <span className="font-semibold">Username Pelapor</span>
              </div>
              <div className="flex space-x-3">
                <button className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2">
                  <MessageCircle size={16}/> Message
                </button>
                <button onClick={() => setReportModalOpen(true)} className="bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2">
                  <Flag size={16}/> Laporkan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Komentar */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Comments</h2>
          <form className="mb-6">
            <textarea 
              className="w-full p-3 border rounded-md"
              rows={3}
              placeholder="Tulis komentarmu..."
            ></textarea>
            <button type="submit" className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Send Comment
            </button>
          </form>
          {/* Daftar Komentar (Dummy) */}
          <div className="space-y-4">
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-semibold">Punya gw</p>
              <p className="text-sm text-gray-600">Ini sepertinya punya saya, hilang kemarin di perpus.</p>
              <p className="text-xs text-gray-400 mt-1">16 hours ago</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-semibold">Ini ceritanya lagi komen</p>
              <p className="text-sm text-gray-600">Ciri-cirinya apa ya?</p>
              <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Panggil Komponen Modal */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} />
    </>
  );
};

export default ItemDetail;
