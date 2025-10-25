import { useState, useEffect } from 'react';
import axios from 'axios';
import { FileText, AlertTriangle, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Report {
  id: string;
  postTitle: string;
  reason: string;
  reporter: string;
}

const AdminDashboardHome = () => {
  const [stats, setStats] = useState({ totalItems: 0, totalReports: 0 });
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = { Authorization: `Bearer ${token}` };

        const [statsRes, reportsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/stats', { headers }),
          axios.get('http://localhost:5000/api/admin/reports', { headers })
        ]);

        if (statsRes.data.status === 'success') {
          setStats(statsRes.data.data);
        }
        if (reportsRes.data.status === 'success') {
          setReports(reportsRes.data.data);
        }
      } catch (err) {
        console.error('Error fetching admin data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat data...</p>;

  return (
    <div className="space-y-6">
      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Postingan</p>
            <p className="text-3xl font-bold">{stats.totalItems}</p>
          </div>
          <FileText className="text-green-500" size={32}/>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-lg shadow-sm border flex items-center justify-between col-span-1 md:col-span-2">
          <div>
            <p>Laporan Perlu Ditinjau</p>
            <p className="text-3xl font-bold">{stats.totalReports}</p>
          </div>
          <AlertTriangle size={32}/>
        </div>
      </div>

      {/* Laporan Terbaru */}
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
              {reports.length > 0 ? (
                reports.map(report => (
                  <tr key={report.id} className="border-b hover:bg-gray-50">
                    <td className="p-2 font-semibold">{report.postTitle}</td>
                    <td className="p-2">
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {report.reason}
                      </span>
                    </td>
                    <td className="p-2">{report.reporter}</td>
                    <td className="p-2 flex gap-3">
                      <Link to={`/item/${report.id}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold">
                        <Eye size={14}/> Lihat
                      </Link>
                      <button className="flex items-center gap-1 text-red-600 hover:underline text-sm font-semibold">
                        <Trash2 size={14}/> Hapus
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    Belum ada laporan pengguna.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
