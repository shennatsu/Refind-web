import { Outlet, NavLink, Link } from 'react-router-dom';
import { LayoutDashboard, Flag, FileText, Tag, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { logout } = useAuth();
  
  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
      isActive ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'
    }`;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col p-4">
        <Link to="/admin" className="text-2xl font-bold text-blue-600 mb-8 px-4">
          ReFind (Admin)
        </Link>
        <nav className="flex flex-col gap-2">
          <NavLink to="/admin" end className={navLinkClass}><LayoutDashboard size={20} /> Dashboard</NavLink>
          <NavLink to="/admin/reports" className={navLinkClass}><Flag size={20} /> Laporan Pengguna</NavLink>
          <NavLink to="/admin/posts" className={navLinkClass}><FileText size={20} /> Semua Postingan</NavLink>
          <NavLink to="/admin/categories" className={navLinkClass}><Tag size={20} /> Kategori Barang</NavLink>
        </nav>
        <div className="mt-auto">
           <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full">
                <LogOut size={20} /> Keluar
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="font-semibold">Admin</div>
        </header>
        <main className="p-6 overflow-y-auto">
          {/* Halaman-halaman admin akan dirender di sini */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
