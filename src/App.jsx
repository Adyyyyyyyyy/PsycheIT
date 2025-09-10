import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './homePage/homePage'
import StudentDashboard from './pages/StudentDashboard'
import Chatbot from './pages/chatbot'
import Resources from './resourceHub/Resources';
import BlogPage from './resourceHub/AllBlogs'
import PeerForum from './PeerForum/PeerForum';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/resources' element={<Resources />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/blogs/:id" element={<BlogPage />} />
          <Route path="/forum" element={<PeerForum />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App;
