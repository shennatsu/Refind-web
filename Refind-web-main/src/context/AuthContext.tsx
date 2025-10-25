import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// 🔹 Struktur data user dari backend
interface UserData {
  _id: string;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
}

// 🔹 Tipe context untuk aplikasi
interface AuthContextType {
  isLoggedIn: boolean;
  user: UserData | null;      // ✅ untuk { user }
  username: string | null;    // ✅ untuk { username } (kompatibilitas lama)
  token: string | null;       // ✅ untuk { token }
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  // Ambil data user & token dari localStorage saat reload
  const [user, setUser] = useState<UserData | null>(() => {
    const savedUser = localStorage.getItem("refind-user");
    if (!savedUser) return null;

    try {
      // coba parse JSON (data baru)
      return JSON.parse(savedUser);
    } catch {
      // fallback: kalau data lama masih string
      return {
        _id: "",
        name: savedUser,
        email: "",
        role: "user",
      } as UserData;
    }
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );

  // 🔑 Fungsi LOGIN ke backend
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data.data;

      // Simpan ke localStorage agar login tidak hilang saat refresh
      localStorage.setItem("refind-token", token);
      localStorage.setItem("refind-user", JSON.stringify(user));

      // Update state
      setUser(user);
      setToken(token);

      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login gagal. Coba lagi.");
    }
  };

  // 🚪 Fungsi LOGOUT
  const logout = () => {
    localStorage.removeItem("refind-token");
    localStorage.removeItem("refind-user");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  // 🧩 Nilai context dikirim ke seluruh app
  const value: AuthContextType = {
    isLoggedIn: !!token,
    user,
    username: user?.name || null, 
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ✅ Hook untuk akses context di komponen lain
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
