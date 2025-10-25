import { useState } from 'react';
import { Bell, Mail, User } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import NotificationPopover from './NotificationPopover';

const Header = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isNotifOpen, setNotifOpen] = useState(false);

  const renderLogo = () => (
    <div className="flex items-center flex-shrink-0">
      <img src="/kotak.png" alt="Refind logo" className="w-10 h-10" />
      <span className="ml-2 text-2xl font-bold">ReFind</span>
    </div>
  );

console.log("Header debug → isLoggedIn:", isLoggedIn, "user:", user);

  return (
    <>
      <header className="bg-blue-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          {/* LOGO */}
          {isLoggedIn ? <div>{renderLogo()}</div> : <Link to="/">{renderLogo()}</Link>}

          {isLoggedIn ? (
            // === JIKA SUDAH LOGIN ===
            <nav className="flex items-center space-x-2 sm:space-x-4">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md ${isActive ? "bg-blue-700 font-bold" : ""}`
                }
              >
                Dashboard
              </NavLink>

              {/* Tombol Notifikasi */}
              <button
                onClick={() => setNotifOpen(prev => !prev)}
                className="p-2 rounded-full hover:bg-blue-700 relative"
              >
                <Bell size={22} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-blue-600"></span>
              </button>

              {/* Pesan */}
              <Link to="/messages" className="p-2 rounded-full hover:bg-blue-700">
                <Mail size={22} />
              </Link>

              {/* Profil */}
              <div className="relative group">
                <Link to="/profile" className="p-1 rounded-full hover:bg-blue-700 flex items-center">
                  {user?.photoUrl ? (
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-9 h-9 rounded-full border-2 border-white object-cover"
                    />
                  ) : (
                    <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center">
                      <User size={20} className="text-blue-800" />
                    </div>
                  )}
                  <span className="ml-2 hidden sm:inline font-semibold">{user?.name}</span>
                </Link>

                {/* Hover dropdown logout */}
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg hidden group-hover:block">
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </nav>
          ) : (
            // === JIKA BELUM LOGIN ===
            <nav className="hidden md:flex items-center space-x-4">
              <Link to="/about" className="hover:text-blue-200">
                About
              </Link>
              <Link
                to="/login"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-100"
              >
                Login
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Komponen notifikasi */}
      <NotificationPopover isOpen={isNotifOpen} onClose={() => setNotifOpen(false)} />
    </>
  );
};

export default Header;
