export interface Report {
  id: number;
  postId: number;
  postTitle: string;
  reason: 'Penipuan' | 'Spam' | 'Tidak Pantas';
  reporter: string;
}

export interface Category {
  id: number;
  name: string;
  postCount: number;
}

export const mockReports: Report[] = [
  { id: 1, postId: 2, postTitle: 'iPhone 15 Pro Ditemukan', reason: 'Penipuan', reporter: 'user@mail.com' },
  { id: 2, postId: 4, postTitle: 'Dompet Coklat Hilang', reason: 'Spam', reporter: 'user2@mail.com' },
  { id: 3, postId: 5, postTitle: 'Airpods Gen 2', reason: 'Tidak Pantas', reporter: 'user3@mail.com' },
];

export const mockCategories: Category[] = [
    { id: 1, name: 'Elektronik', postCount: 120 },
    { id: 2, name: 'Tumbler', postCount: 85 },
    { id: 3, name: 'Kunci', postCount: 72 },
    { id: 4, name: 'Aksesoris', postCount: 98 },
    { id: 5, name: 'Buku', postCount: 45 },
];
