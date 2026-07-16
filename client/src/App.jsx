import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
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
import ManageGallery from './admin/pages/ManageGallery';
import ManagePlacements from './admin/pages/ManagePlacements';
import ManageEnquiries from './admin/pages/ManageEnquiries';
import SiteSettings from './admin/pages/SiteSettings';
import ManageLabs from './admin/pages/ManageLabs';
import ManageProjects from './admin/pages/ManageProjects';

const PublicLayout = () => (
  <>
    <Navbar />
    <main style={{ minHeight: '80vh' }}>
      <Outlet />
    </main>
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
            <Route path="/about" element={<About />} />
            <Route path="/academics" element={<Academics />} />
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/student-achievements" element={<StudentAchievements />} />
            <Route path="/placements" element={<Placements />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="faculty" element={<ManageFaculty />} />
              <Route path="news" element={<ManageNews />} />
              <Route path="gallery" element={<ManageGallery />} />
              <Route path="placements" element={<ManagePlacements />} />
              <Route path="enquiries" element={<ManageEnquiries />} />
              <Route path="settings" element={<SiteSettings />} />
              <Route path="labs" element={<ManageLabs />} />
              <Route path="projects" element={<ManageProjects />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
