import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Notification {
  id: number;
  text: string;
  time: string;
  read: boolean;
}

interface NotificationPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationPopover = ({ isOpen, onClose }: NotificationPopoverProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);

      const fetchNotifications = async () => {
        try {
          // GANTI URL INI dengan endpoint API dari temanmu
          const response = await fetch('/api/notifications'); 

          if (!response.ok) {
            throw new Error('Gagal mengambil data notifikasi');
          }

          const data = await response.json();
          // Asumsi data dari backend adalah { notifications: [...] }
          setNotifications(data.notifications); 
        } catch (err: unknown) { // PERBAIKAN 1: Gunakan 'unknown' bukan 'any'

          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError("Terjadi kesalahan yang tidak diketahui");
          }
        } finally {
          setIsLoading(false);
        }
      };

      setTimeout(fetchNotifications, 1000); 
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const renderContent = () => {
    if (isLoading) return <div className="p-4 text-center text-gray-500">Memuat...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
    if (notifications.length === 0) return <div className="p-4 text-center text-gray-500">Tidak ada notifikasi baru.</div>;

    return notifications.map((notif) => (
      <div key={notif.id} className="p-4 flex items-start gap-3 hover:bg-gray-50 border-b">
        <div className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${!notif.read ? 'bg-blue-500' : 'bg-transparent'}`}></div>
        <div>
          <p className="text-sm text-gray-800">{notif.text}</p>
          <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 z-40" onClick={onClose}>
      <div 
        className="absolute top-16 right-4 sm:right-6 md:right-auto md:left-1/2 md:ml-20 lg:ml-48 bg-white rounded-lg shadow-2xl border w-80 max-w-sm text-black z-50"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-4 border-b">
          <h3 className="font-bold text-lg">Notifikasi</h3>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {renderContent()}
        </div>
        <div className="p-2 bg-gray-50 text-center">
          <Link to="/notifications" className="text-sm text-blue-600 font-semibold">
            Lihat Semua Notifikasi
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopover;
