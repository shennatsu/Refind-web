import { useState, useEffect } from 'react';
import { mockCategories } from '../../data/adminMockData';
import type { Category } from '../../data/adminMockData';
import { Tag, Trash2, Plus } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    // NANTI: fetch data kategori dari API
    setCategories(mockCategories);
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.trim() === '') return;
    
    const newCat: Category = {
      id: Date.now(), // ID sementara
      name: newCategory,
      postCount: 0,
    };
    setCategories(prev => [newCat, ...prev]);
    setNewCategory('');
    // NANTI: panggil API POST /api/admin/categories
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Yakin ingin menghapus kategori ini? Semua postingan terkait mungkin akan terpengaruh.")) {
      setCategories(prev => prev.filter(cat => cat.id !== id));
      // NANTI: panggil API DELETE /api/admin/categories/{id}
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-bold mb-4">Manajemen Kategori Barang</h2>
      {/* Form Tambah Kategori */}
      <form onSubmit={handleAddCategory} className="flex gap-2 mb-6">
        <input 
          type="text"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          placeholder="Nama kategori baru..."
          className="flex-grow p-2 border rounded-lg"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Tambah
        </button>
      </form>

      {/* Daftar Kategori */}
      <div className="space-y-3">
        {categories.map(cat => (
          <div key={cat.id} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center border">
            <div className="flex items-center gap-3">
              <Tag className="text-gray-500" />
              <div>
                <p className="font-semibold">{cat.name}</p>
                <p className="text-xs text-gray-500">{cat.postCount} postingan</p>
              </div>
            </div>
            <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-500 hover:bg-red-100 rounded-full">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCategories;
