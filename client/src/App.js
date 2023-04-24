import './App.css';
// import AskQuestion from './pages/AskQuestion';
// import DetailQuestion from './pages/DetailQuestion';
// import Login from './pages/Login';

import axios from 'axios';

import User from './pages/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
