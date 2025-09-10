import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './homePage/homePage'
import StudentDashboard from './pages/StudentDashboard'
import Chatbot from './pages/chatbot'
import Resources from './resourceHub/Resources';
import BlogPage from './resourceHub/AllBlogs'
function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/resources' element={<Resources />} />
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/blogs" element={<BlogPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App;
