import { useState, useEffect } from 'react';
import { mockReports } from '../../data/adminMockData';
import { mockItems } from '../../data/mockItems';
import type { Report } from '../../data/adminMockData';
import { FileText, AlertTriangle, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboardHome = () => {
  const [reports, setReports] = useState<Report[]>([]);
  
  useEffect(() => {
    setReports(mockReports);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin menghapus laporan ini?")) {
      setReports(prev => prev.filter(report => report.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Postingan</p>
            <p className="text-3xl font-bold">{mockItems.length}</p>
          </div>
          <FileText className="text-green-500" size={32}/>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-sm border flex items-center justify-between col-span-1 md:col-span-2">
          <div>
            <p>Laporan Perlu Ditinjau</p>
            <p className="text-3xl font-bold">{reports.length}</p>
          </div>
          <AlertTriangle size={32}/>
        </div>
      </div>

      {/* Tabel Laporan Terbaru */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-xl font-bold mb-4">Laporan Pengguna Terbaru</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="p-2">Postingan Dilaporkan</th>
                <th className="p-2">Alasan</th>
                <th className="p-2">Pelapor</th>
                <th className="p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {reports.map(report => (
                <tr key={report.id} className="border-b hover:bg-gray-50">
                  <td className="p-2 font-semibold">{report.postTitle}</td>
                  <td className="p-2"><span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">{report.reason}</span></td>
                  <td className="p-2">{report.reporter}</td>
                  <td className="p-2 flex gap-3">

                    <Link to={`/item/${report.postId}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold">
                      <Eye size={14} /> Lihat
                    </Link>
                    <button onClick={() => handleDelete(report.id)} className="flex items-center gap-1 text-red-600 hover:underline text-sm font-semibold">
                      <Trash2 size={14} /> Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;

