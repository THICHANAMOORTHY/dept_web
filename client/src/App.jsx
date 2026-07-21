import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Faculty from './pages/Faculty';
import Academics from './pages/Academics';
import Placements from './pages/Placements';
import StudentAchievements from './pages/StudentAchievements';

// Admin imports
import { AuthProvider } from './admin/context/AuthContext';
import AdminLayout from './admin/AdminLayout';
import PrivateRoute from './admin/components/PrivateRoute';
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import ManageFaculty from './admin/pages/ManageFaculty';
import ManageNews from './admin/pages/ManageNews';
import ManageActivities from './admin/pages/ManageActivities';
import ManagePlacements from './admin/pages/ManagePlacements';
import ManageEnquiries from './admin/pages/ManageEnquiries';
import SiteSettings from './admin/pages/SiteSettings';
import ManageLabs from './admin/pages/ManageLabs';
import ManageAchievements from './admin/pages/ManageAchievements';
import ManageCurriculum from './admin/pages/ManageCurriculum';
import ChangePassword from './admin/pages/ChangePassword';
import ManageLinks from './admin/pages/ManageLinks';

import FloatingWidget from './components/FloatingWidget';

const PublicLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Outlet />
    </main>
    <FloatingWidget />
    <Footer />
  </>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/student-achievements" element={<StudentAchievements />} />
            <Route path="/placements" element={<Placements />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="faculty" element={<ManageFaculty />} />
              <Route path="curriculum" element={<ManageCurriculum />} />
              <Route path="news" element={<ManageNews />} />
              <Route path="activities" element={<ManageActivities />} />
              <Route path="placements" element={<ManagePlacements />} />
              <Route path="achievements" element={<ManageAchievements />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="settings" element={<SiteSettings />} />
              <Route path="labs" element={<ManageLabs />} />
              <Route path="links" element={<ManageLinks />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
