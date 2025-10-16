import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim() === '') {
      alert("Username tidak boleh kosong!");
      return;
    }
    login(username);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#b3c3c9] via-[#8dc0d2] to-[#3083b3] relative overflow-hidden">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">ReFind</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500" placeholder="Username" required />
          </div>
          <div className="mb-6">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-full focus:outline-none focus:border-blue-500" placeholder="Password" required />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full font-bold hover:bg-blue-700 transition-transform transform hover:scale-105">
            Login
          </button>
        </form>
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-gray-500 hover:text-blue-600 hover:underline">Forgot Password?</a>
        </div>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Didn't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;