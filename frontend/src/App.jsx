import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./homePage/homePage";
import StudentDashboard from "./pages/StudentDashboard";
import Chatbot from "./pages/chatbot";
import Resources from "./resourceHub/Resources";
import BlogPage from "./resourceHub/AllBlogs";
import PeerForum from "./PeerForum/PeerForum";
import Auth from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingPage from './bookSession/booking';
import ScreeningTest from './pages/ScreeningTest';
import ScrollToTop from './components/ScrollToTop';


function App() {
  return (
    <Router>
      <div className="App">
        <ScrollToTop />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth />} />

          {/* Protected routes */}
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chatbot"
            element={
              <ProtectedRoute>
                <Chatbot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blogs/:id"
            element={
              <ProtectedRoute>
                <BlogPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <ProtectedRoute>
                <PeerForum />
              </ProtectedRoute>
            }
          />

        <Route
            path="/book"
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/screening"
            element={
              <ProtectedRoute>
                <ScreeningTest />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
