import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserProfile from './pages/UserProfile';
import AdminLogin from './pages/AdminLogin';
import AdminCreate from './pages/AdminCreate';
import AdminProfile from './pages/AdminProfile';
import GarbageUpload from './pages/GarbageUpload';
import RecycleUpload from './pages/RecycleUpload';
import Map from './pages/Map';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminCreate />} />
          <Route path="/map" element={<Map />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />

          {/* Protected user routes */}
          <Route path="/profile" element={
            <ProtectedRoute><UserProfile /></ProtectedRoute>
          } />
          <Route path="/garbage-upload" element={
            <ProtectedRoute><GarbageUpload /></ProtectedRoute>
          } />
          <Route path="/recycle-upload" element={
            <ProtectedRoute><RecycleUpload /></ProtectedRoute>
          } />

          {/* Protected admin routes */}
          <Route path="/admin/profile" element={
            <ProtectedRoute adminOnly><AdminProfile /></ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
