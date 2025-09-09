import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './homePage/homePage';
import Resources from './resourceHub/Resources';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/resources' element={<Resources />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
