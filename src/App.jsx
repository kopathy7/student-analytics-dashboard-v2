import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Sidebar from './components/Layout/Sidebar';
import TopBar from './components/Layout/TopBar';
import ParticleBackground from './components/Effects/ParticleBackground';
import StudyNowButton from './components/AI/StudyNowButton';
import LiveCharacter from './components/Characters/LiveCharacter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Attendance from './pages/Attendance';
import Grades from './pages/Grades';
import Leaderboard from './pages/Leaderboard';
import Analytics from './pages/Analytics';
import AIAssistant from './pages/AIAssistant';
import Behavioral from './pages/Behavioral';
import Gamification from './pages/Gamification';
import Heatmaps from './pages/Heatmaps';
import BrainMap from './pages/BrainMap';
import Social from './pages/Social';
import Predictions from './pages/Predictions';
import Alerts from './pages/Alerts';
import './App.css';

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }
};

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading"><div className="auth-spinner" /></div>;
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="auth-loading"><div className="auth-spinner" /></div>;
  if (user) return <Navigate to="/" replace />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/behavioral" element={<Behavioral />} />
          <Route path="/gamification" element={<Gamification />} />
          <Route path="/heatmaps" element={<Heatmaps />} />
          <Route path="/brain-map" element={<BrainMap />} />
          <Route path="/social" element={<Social />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function AppShell() {
  return (
    <div className="app-layout">
      <ParticleBackground />
      <Sidebar />
      <div className="main-content">
        <TopBar />
        <div className="page-content">
          <AnimatedRoutes />
        </div>
      </div>
      <StudyNowButton />
      <LiveCharacter />
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/*" element={<ProtectedRoute><AppShell /></ProtectedRoute>} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
