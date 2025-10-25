import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!username || !email || !password) {
      alert("Semua kolom wajib diisi!");
      return;
    }

    try {
      setIsLoading(true);

      // 🔹 Kirim ke backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }), 
      });

      const data = await response.json();

      if (data.status === "success") {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      } else {
        alert(data.message || "Registrasi gagal. Coba lagi.");
      }
    } catch (err) {
      console.error("Register error:", err);
      alert("Terjadi kesalahan saat registrasi. Coba lagi nanti.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b3c3c9] via-[#8dc0d2] to-[#3083b3] relative overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row w-full max-w-4xl overflow-hidden">
        {/* Kolom Kiri */}
        <div className="w-full md:w-1/2 bg-blue-50 p-8 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-6">ReFind</h1>
          <img
            src="/register.png"
            alt="Register Illustration"
            className="w-48 h-48 object-contain"
          />
          <p className="text-blue-500 mt-6 text-center">
            Find what you've lost, <br /> report what you've found.
          </p>
        </div>

        {/* Kolom Kanan */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign Up Now</h2>
          <p className="text-gray-500 mb-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Log in
            </Link>
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Processing..." : "Sign Up"}
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            By continuing, you agree to our <br />
            <a href="#" className="underline">
              Terms & Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
