import './App.css';
import Main from './pages/Main';
// import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Nav from './components/Nav';
import Aside from './components/Aside';
import Footer from './components/Footer';
import AskQuestion from './pages/AskQuestion';
import DetailQuestion from './pages/DetailQuestion';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EditAllPosts from './pages/EditAllPosts';
import User from './pages/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // 로그인 성공 시 회원정보 받아오기
  // const [isLogin, setIsLogin] = useState(false);
  // const [userInfo, setUserInfo] = useState(null);

  const [questions, setQuestions] = useState([]);

  const getQuestions = () => {
    axios
      .get('http://localhost:4000/questions')
      .then((res) => {
        setQuestions(res.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div className="content-page-wrapper">
        <Nav />
        <div className="content-page">
          <Routes>
            <Route path="/" element={<Main questions={questions} />} />
            <Route path="/users/login" element={<Login />} />
            <Route path="/users/signup" element={<Signup />} />
            <Route path="/user" element={<User />} />
            <Route path="/question/ask" element={<AskQuestion />} />
            <Route path="/question/:id" element={<DetailQuestion />} />
            <Route path="/question/editq/:id" element={<EditAllPosts />} />
            <Route path="/question/edita/:id" element={<EditAllPosts />} />
          </Routes>
        </div>
        <Aside />
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
