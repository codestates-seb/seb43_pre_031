import './App.css';
import Main from './pages/Main';
import axios from 'axios';
import Header from './components/Header';
import AskQuestion from './pages/AskQuestion';
import DetailQuestion from './pages/DetailQuestion';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Signup from './pages/Signup';
import EditAllPosts from './pages/EditAllPosts';
import User from './pages/User';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import storage from './lib/storage';
import FindPW from './pages/FindPW';
import ContainAll from './pages/templates/ContainAll';
import NavFooter from './pages/templates/NavFooter';
import OnlyFooter from './pages/templates/OnlyFooter';
import ReceiveToken from './pages/ReceiveToken';
import { getCookie } from './lib/Cookies';
import Search from './pages/Search';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // 로그인 성공 시 로그인 여부 받아오기
  const [isLogin, setIsLogin] = useState(false);

  // access token 여부로 로그인 여부 판단 및 로컬스토리지에 userID, 로그인 여부 저장하기
  let loginStatus;
  useEffect(
    function checkUserLogin() {
      const isAToken = getCookie('accessToken');
      if (!isAToken) return;

      let userId = storage.get('userID');
      loginStatus = storage.set('login', `${!!isAToken}`);
      setIsLogin(true);
      console.log(`localstorage userId : ${userId}`);
      console.log(`localstorage login : ${storage.get('login')}`);
    },
    [loginStatus]
  );

  console.log(`App.js - isLogin : ${isLogin}`);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/users/login"
          element={<Login setIsLogin={setIsLogin} />}
        />
        <Route
          path="/users/logout"
          element={<Logout setIsLogin={setIsLogin} />}
        />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/account-recovery" element={<FindPW />} />
        <Route
          path="/receive-token"
          element={<ReceiveToken setIsLogin={setIsLogin} />}
        />

        <Route path="/" element={<ContainAll />}>
          <Route path="/" element={<Main />} />
          <Route path="/question/:id" element={<DetailQuestion />} />
          <Route path="/search" element={<Search />} />
        </Route>

        <Route path="/" element={<NavFooter />}>
          <Route path="/*" element={<User />} />
          <Route path="/question/:id" element={<DetailQuestion />} />
          <Route path="/question/editq/:id" element={<EditAllPosts />} />
          <Route path="/question/edita/:id" element={<EditAllPosts answer />} />
        </Route>

        <Route path="/" element={<OnlyFooter />}>
          <Route path="/question/ask" element={<AskQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
