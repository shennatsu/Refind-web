import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Loader2 } from 'lucide-react';

const UploadItem = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // --- Handler untuk upload foto ---
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // --- Handler untuk submit form ---
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.currentTarget;
    const formData = new FormData();

    // ✅ Sesuaikan nama field agar cocok dengan backend
    formData.append('title', (form.elements.namedItem('title') as HTMLInputElement).value);
    formData.append('description', (form.elements.namedItem('details') as HTMLTextAreaElement).value);
    formData.append('location', (form.elements.namedItem('location') as HTMLInputElement).value);
    formData.append('category', (form.elements.namedItem('itemType') as HTMLInputElement).value);
    
    // backend butuh 'type' = 'found' atau 'lost'
    const statusValue = (form.elements.namedItem('status') as HTMLSelectElement).value;
    const backendType = statusValue === 'Ditemukan' ? 'found' : 'lost';
    formData.append('type', backendType);

    if (selectedFile) {
      formData.append('photo', selectedFile); // ✅ backend expects 'photo'
    }

    try {
      console.log("📤 Data yang akan dikirim:", Object.fromEntries(formData));

      const response = await fetch('http://localhost:5000/api/items', {
        method: 'POST',
        body: formData,
        // ❌ jangan set Content-Type manual, biar otomatis multipart/form-data
      });

      console.log("📥 Response status:", response.status);
      const data = await response.json().catch(() => null);
      console.log("📥 Response body:", data);

      if (!response.ok) {
        throw new Error(data?.message || 'Gagal mengupload laporan');
      }

      alert("✅ Laporan berhasil dibuat dan akan segera dipublikasikan!");
      navigate('/dashboard');
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Terjadi kesalahan saat mengupload laporan. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Lapor Barang Temuan/Hilang</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md border space-y-6">
        {/* Upload Foto */}
        <div>
          <label className="block text-lg font-semibold mb-2">Foto Barang</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
            {imagePreview ? (
              <div className="text-center">
                <img src={imagePreview} alt="Preview" className="mx-auto h-48 w-auto rounded-md" />
                <button
                  type="button"
                  onClick={() => { setImagePreview(null); setSelectedFile(null); }}
                  className="mt-4 text-sm text-red-600 hover:text-red-800"
                >
                  Hapus Gambar
                </button>
              </div>
            ) : (
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4 flex text-sm">
                  <label htmlFor="file-upload" className="cursor-pointer rounded-md font-semibold text-blue-600 hover:text-blue-500">
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-600">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>
        </div>

        {/* Input Fields */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium">Judul Laporan</label>
          <input type="text" id="title" name="title" placeholder="Contoh: Tumbler Corkcicle Hitam" required className="mt-1 block w-full rounded-md border-gray-300 p-2" />
        </div>
        <div>
          <label htmlFor="details" className="block text-sm font-medium">Details</label>
          <textarea id="details" name="details" rows={3} placeholder="Jelaskan ciri-ciri barang..." required className="mt-1 block w-full rounded-md border-gray-300 p-2"></textarea>
        </div>
        <div>
          <label htmlFor="location" className="block text-sm font-medium">Lokasi</label>
          <input type="text" id="location" name="location" placeholder="Contoh: Perpustakaan Pusat, Lt. 2" required className="mt-1 block w-full rounded-md border-gray-300 p-2" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="itemType" className="block text-sm font-medium">Tipe Barang</label>
            <input type="text" id="itemType" name="itemType" placeholder="Contoh: Tumbler, Kunci" required className="mt-1 block w-full rounded-md border-gray-300 p-2" />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium">Status Laporan</label>
            <select id="status" name="status" required className="mt-1 block w-full rounded-md border-gray-300 p-2">
              <option value="Ditemukan">Saya Menemukan Barang</option>
              <option value="Hilang">Saya Kehilangan Barang</option>
            </select>
          </div>
        </div>

        {/* Tombol */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            disabled={isSubmitting}
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" size={16} />}
            {isSubmitting ? 'Mengupload...' : 'Upload Laporan'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadItem;
