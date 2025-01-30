import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Cookies from "js-cookie";
import Home from './pages/root/home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/signup'
import LoanCalculator from './components/LoanCalculator'
import Dashboard from './pages/adminDashboard/Dashboard'
import { useContext } from 'react';
import { AuthContext } from './context/UserContext';
import UserDashboard from './pages/userDashboard/Dashboard';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/loan-calculator' element={<LoanCalculator />} />

        {/* Auth Routes */}
        <Route path='/auth'>
          <Route index path="login" element={<Login />} />
          <Route path="sign-up" element={<Signup />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route path='/admin-dashboard' element={user?.role === "admin" ? <Dashboard /> : ""}>
          <Route index path="profile" element={<Home />} />
          <Route path="settings" element={<Home />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route path='/user-dashboard' element={<UserDashboard />}>
          <Route index path="profile" element={<Home />} />
          <Route path="settings" element={<Home />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App;
