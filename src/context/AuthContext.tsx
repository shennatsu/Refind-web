import { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(() => localStorage.getItem('refind-user'));
  const navigate = useNavigate();

{/*backend-nya udah punya sistem login sungguhan (JWT atau session-based), 
  nanti cukup ubah fungsi const login() jadi tinggal inject API call didalem fungsinya ini
   */}

  const login = (username: string) => {
    localStorage.setItem('refind-user', username);
    setUser(username);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('refind-user');
    setUser(null);
    navigate('/');
  };

  const value = {
    isLoggedIn: !!user,
    username: user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 2. Komentar ini untuk mengatasi error Fast Refresh
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};