import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [identifier, setIdentifier] = useState(""); // bisa username ATAU email
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!identifier || !password) {
      alert("Username/Email dan password wajib diisi!");
      return;
    }

    try {
      setIsLoading(true);

      // 🔹 Kirim ke backend — biarkan backend handle apakah email atau username
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: identifier, // backend masih pakai field 'email'
          password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        const token = data.data.token;
        const user = data.data.user;

        // 🔹 Simpan ke localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("refind-user", user.name);
        localStorage.setItem("refind-role", user.role);

        alert(`Selamat datang, ${user.name}!`);

        // 🔹 Redirect sesuai role
        if (user.role === "admin") navigate("/admin");
        else navigate("/dashboard");
      } else {
        alert(data.message || "Login gagal. Periksa username/email dan password Anda.");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Terjadi kesalahan saat login. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b3c3c9] via-[#8dc0d2] to-[#3083b3] relative overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">ReFind</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
              placeholder="Email atau Username"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition-transform transform hover:scale-105 ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-6">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-blue-600 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-medium hover:underline"
            >
              Daftar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
