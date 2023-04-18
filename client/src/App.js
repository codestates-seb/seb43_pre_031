import './App.css';
import Main from './pages/Main';
// import AskQuestion from './pages/AskQuestion';
// import DetailQuestion from './pages/DetailQuestion';
// import Login from './pages/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './utils/API';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // 최초 렌더링 시 회원정보 받아오기
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const authHandler = () => {
    axios
      .get(`${API}/userinfo`)
      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data);
        console.log(isLogin);
        console.log(userInfo);
        console.log(res.data);
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response.data);
        }
      });
  };

  useEffect(() => {
    authHandler();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
