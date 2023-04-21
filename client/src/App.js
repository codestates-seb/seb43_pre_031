import './App.css';
import User from './pages/User';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/user/*" element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
