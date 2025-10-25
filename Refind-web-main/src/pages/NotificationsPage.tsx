import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status === 'success') {
          setNotifications(res.data.data);
        } else {
          setError('Gagal memuat notifikasi');
        }
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  if (loading) return <div className="p-4">Memuat notifikasi...</div>;
  if (error) return <div className="p-4 text-red-600">{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Notifikasi</h1>
      {notifications.length === 0 ? (
        <p>Tidak ada notifikasi saat ini.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((notif) => (
            <li key={notif.id} className="p-3 bg-white rounded shadow flex justify-between">
              <div>
                <p>{notif.text}</p>
                <small className="text-gray-500">{notif.time}</small>
              </div>
              {!notif.read && <span className="text-sm text-blue-600">Baru</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationsPage;
