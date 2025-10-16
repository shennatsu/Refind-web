import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockItems } from '../../data/mockItems';
import type { ItemData } from '../../components/ItemCard';
import { Eye, Trash2, Loader2, Search } from 'lucide-react';

const AdminPostsPage = () => {
  const [posts, setPosts] = useState<ItemData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // NANTI: Ganti ini dengan fetch ke GET /api/admin/posts
    setTimeout(() => {
      setPosts(mockItems);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleDelete = (id: number) => {
    if (window.confirm("PERHATIAN! Yakin ingin menghapus postingan ini secara permanen?")) {
      setPosts(prev => prev.filter(post => post.id !== id));
      // NANTI: Panggil API DELETE /api/admin/posts/{id}
      console.log(`Menghapus postingan dengan ID: ${id}`);
    }
  };

  const filteredPosts = useMemo(() => {
    return posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Semua Postingan Barang</h2>
        <div className="relative w-1/3">
          <input 
            type="text"
            placeholder="Cari postingan..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr className="border-b text-sm text-gray-600">
              <th className="p-3">Judul Postingan</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Status</th>
              <th className="p-3">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={4} className="text-center p-8"><Loader2 className="animate-spin mx-auto" /></td></tr>
            ) : (
              filteredPosts.map(post => (
                <tr key={post.id} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{post.title}</td>
                  <td className="p-3">{post.category}</td>
                  <td className="p-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${post.status === 'Hilang' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="p-3 flex gap-3">
                    <Link to={`/item/${post.id}`} className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-semibold">
                      <Eye size={14} /> Lihat
                    </Link>
                    <button onClick={() => handleDelete(post.id)} className="flex items-center gap-1 text-red-600 hover:underline text-sm font-semibold">
                      <Trash2 size={14} /> Hapus
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPostsPage;