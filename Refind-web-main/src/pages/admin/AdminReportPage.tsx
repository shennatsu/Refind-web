import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { mockReports } from '../../data/adminMockData';
import type { Report } from '../../data/adminMockData';
import { Eye, Trash2, Loader2 } from 'lucide-react';

const AdminReportsPage = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // NANTI: Ganti ini dengan fetch ke GET /api/admin/reports
    setTimeout(() => {
      setReports(mockReports);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin menghapus laporan ini? Tindakan ini tidak akan menghapus postingan aslinya.")) {
      setReports(prev => prev.filter(report => report.id !== id));
      // NANTI: Panggil API DELETE /api/admin/reports/{id}
      console.log(`Menghapus laporan dengan ID: ${id}`);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <tr><td colSpan={4} className="text-center p-8"><Loader2 className="animate-spin mx-auto" /></td></tr>;
    }
    if (reports.length === 0) {
      return <tr><td colSpan={4} className="text-center p-8 text-gray-500">Tidak ada laporan dari pengguna.</td></tr>;
    }
    return reports.map(report => (
      <tr key={report.id} className="border-b hover:bg-gray-50">
        <td className="p-3 font-semibold">{report.postTitle}</td>
        <td className="p-3"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">{report.reason}</span></td>
        <td className="p-3 text-sm text-gray-600">{report.reporter}</td>
        <td className="p-3 flex gap-3">
          <Link to={`/item/${report.postId}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold">
            <Eye size={14} /> Lihat Postingan
          </Link>
          <button onClick={() => handleDelete(report.id)} className="flex items-center gap-1 text-red-600 hover:underline text-sm font-semibold">
            <Trash2 size={14} /> Hapus Laporan
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-2xl font-bold mb-6">Semua Laporan Pengguna</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b text-sm text-gray-600">
              <th className="p-3">Postingan Dilaporkan</th>
              <th className="p-3">Alasan</th>
              <th className="p-3">Pelapor</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {renderContent()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminReportsPage;