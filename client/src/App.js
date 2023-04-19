import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Main from './pages/Main';
import Header from './components/Header';
import Nav from './components/Nav';
import Footer from './components/Footer';
import AskQuestion from './pages/AskQuestion';
import DetailQuestion from './pages/DetailQuestion';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditAllPosts from './pages/EditAllPosts';
import User from './pages/User';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // 최초 렌더링 시 회원정보 받아오기
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const authHandler = () => {
    console.log(userInfo);
    axios
      .get('http://localhost:4000/userinfo')
      // .get('https://d5fc-58-122-102-109.ngrok-free.app/answers')
      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data);
        console.log(isLogin);
        console.log(res);
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
      <Header />
      <div className="content-page-wrapper">
        <Nav />
        <div className="content-page">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/question/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<DetailQuestion />} />
            <Route path="/question/editq/:id" element={<EditAllPosts />} />
            <Route path="/question/edita/:id" element={<EditAllPosts />} />
          </Routes>
        </div>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
