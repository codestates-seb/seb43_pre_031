import './App.css';
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './pages/User';

function App() {
  return (
    <>
      {/* <Router>
        <Routes>
          <Route path="/users/user" element={<User />} />
          <Route path="/users/Settings" element={<UserSettings />} />
        </Routes>
      </Router> */}
      <User />
    </>
  );
}

export default App;
