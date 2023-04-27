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
import { useEffect } from 'react';
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
  // access token 여부로 로그인 여부 판단 및 로컬스토리지에 로그인 상태 저장하기
  let loginStatus;
  useEffect(
    function checkUserLogin() {
      const isAToken = getCookie('accessToken');
      if (!isAToken) return;
      loginStatus = storage.set('login', `${!!isAToken}`);
    },
    [loginStatus]
  );

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/users/login" element={<Login />} />
        <Route path="/users/logout" element={<Logout />} />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/account-recovery" element={<FindPW />} />
        <Route path="/receive-token" element={<ReceiveToken />} />

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
