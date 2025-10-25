import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ItemDetail from './pages/ItemDetail';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';
import UploadItem from './pages/UploadItem';
import NotificationsPage from './pages/NotificationsPage';
import MessageList from "./pages/messages/MessageList";
import ChatRoom from "./pages/messages/ChatRoom";

import AdminLayout from './pages/admin/AdminLayoutComponent';
import AdminDashboardHome from './pages/admin/AdminDashboardHome';
import AdminCategories from './pages/admin/AdminCategories';
import AdminReportPage from './pages/admin/AdminReportPage';
import AdminPostPage from './pages/admin/AdminPostPage';  

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="item/:itemId" element={<ItemDetail />} />
            <Route path="profile" element={<Profile />} /> 
            <Route path="about" element={<About />} /> 
            <Route path="messages" element={<ChatPage />} />
            <Route path="lapor" element={<UploadItem />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/messages" element={<MessageList />} />
            <Route path="/messages/:userId" element={<ChatRoom />} />
          </Route>
          
          {/* RUTE STANDALONE (Login & Register) */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ===========================================
              INI BAGIAN BARU: RUTE UNTUK ADMIN
             =========================================== */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reports" element={<AdminReportPage />} />
            <Route path="posts" element={<AdminPostPage />} />

          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;