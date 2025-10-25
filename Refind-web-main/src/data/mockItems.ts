// src/data/mockItems.ts
import type { ItemData } from "../components/ItemCard";

/**
 * Data dummy (fallback).
 * Jangan hapus, simpan untuk testing offline.
 */
export const mockItems: ItemData[] = [
  {
    id: 1,
    category: "Elektronik",
    title: "Airpods Pro Generasi 2",
    location: "Kantin Fakultas Teknik",
    date: "28 September 2025",
    status: "Ditemukan",
    imageUrl: "https://placehold.co/600x400/3b82f6/FFFFFF?text=Airpods",
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
    imageUrl: "https://placehold.co/600x400/f59e0b/FFFFFF?text=Jam",
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
    imageUrl: "https://placehold.co/600x400/14b8a6/FFFFFF?text=Buku",
  },
];

/**
 * Fungsi fetchItems: akan mencoba ambil data dari backend di /api/items.
 * Jika sukses (data tersedia) -> kembalikan data backend.
 * Jika gagal atau backend kosong -> fallback ke mockItems.
 */
export async function fetchItems(): Promise<ItemData[]> {
  try {
    const response = await fetch("http://localhost:5000/api/items");
    const data = await response.json();

    if (data?.status === "success" && data?.data?.items?.length > 0) {
      console.log("✅ Menggunakan data dari backend:", data.data.items.length, "item");
      return data.data.items;
    } else {
      console.warn("⚠️ Data kosong dari backend, fallback ke mockItems");
      return mockItems;
    }
  } catch (error) {
    console.error("❌ Gagal fetch dari backend:", error);
    return mockItems;
  }
}
