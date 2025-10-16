// Mengimport tipe data dari ItemCard agar data kita konsisten
import type { ItemData } from '../components/ItemCard';

// Ini adalah data dummy yang mensimulasikan data dari database
export const mockItems: ItemData[] = [
  {
    id: 1,
    category: "Elektronik",
    title: "Airpods Pro Generasi 2",
    location: "Kantin Fakultas Teknik",
    date: "28 September 2025",
    status: "Ditemukan",
    imageUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=Airpods"
  },
  {
    id: 2,
    category: "Tumbler",
    title: "Tumbler Corkcicle Hitam",
    location: "Perpustakaan Pusat, Lt. 2",
    date: "28 September 2025",
    status: "Hilang",
  },
  {
    id: 3,
    category: "Aksesoris",
    title: "Jam Tangan Casio",
    location: "Masjid Darul Ilmi",
    date: "27 September 2025",
    status: "Ditemukan",
    imageUrl: "https://placehold.co/600x400/f59e0b/FFFFFF?text=Jam"
  },
  {
    id: 4,
    category: "Kunci",
    title: "Kunci Motor Honda Vario",
    location: "Parkiran Gedung A",
    date: "26 September 2025",
    status: "Ditemukan",
  },
  {
    id: 5,
    category: "Buku",
    title: "Buku Kalkulus Lanjut",
    location: "Ruang Baca Perpustakaan",
    date: "25 September 2025",
    status: "Hilang",
    imageUrl: "https://placehold.co/600x400/14b8a6/FFFFFF?text=Buku"
  }
];

