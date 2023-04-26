import './App.css';
import Main from './pages/Main';
import axios from 'axios';
import Header from './components/Header';
// import Nav from './components/Nav';
// import Aside from './components/Aside';
// import Footer from './components/Footer';
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
import { API } from './utils/API';
import { getCookie } from './lib/Cookies';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // * 새로고침해도 로그인 정보가 유지되는 기능 *
  // 로그인이 되어있는지 확인하기 위해 로컬스토리지에서 userID를 가져오기(로그인 시 로컬스토리지에 userID가 저장됨)
  // 로그인 정보가 없다면 멈추기
  // 로그인이 되어있다면 userId 를 서버로 보내서 회원정보를 받아오기!
  // let userId;
  // (function checkUserLogin() {
  //   const loggedInfo = storage.get('login');
  //   if (!loggedInfo) return;
  //   userId = storage.get('userID');
  //   console.log(`localstorage userId : ${userId}`);
  //   console.log(`localstorage login : ${loggedInfo}`);
  // })();

  // 로그인 성공 시 로그인 여부 받아오기
  const [isLogin, setIsLogin] = useState(false);
  const [questions, setQuestions] = useState([]);

  // 로그인 여부 판단 및 스토리지 저장을 여기서 하기?
  (function checkUserLogin() {
    const isAToken = getCookie('accessToken');
    if (!isAToken) return;

    let userId = storage.get('userID');
    storage.set('login', !!isAToken);
    setIsLogin(true);
    console.log(`localstorage userId : ${userId}`);
    console.log(`localstorage login : ${storage.get('login')}`);
  })();

  const getQuestions = () => {
    axios
      .get(`${API}/questions`)
      .then((res) => {
        setQuestions(res.data.data);
      })
      .catch((error) => console.log(`getQuestions error : ${error}`));
  };

  useEffect(() => {
    getQuestions();
  }, []);

  console.log(`App.js - isLogin : ${isLogin}`);

  return (
    // <BrowserRouter>
    //   <Header />
    //   <div className="content-page-wrapper">
    //     <Nav />
    //     <div className="content-page">
    //       <Routes>
    //         <Route path="/" element={<Main questions={questions} />} />
    //         <Route
    //           path="/users/login"
    //           element={<Login setIsLogin={setIsLogin} />}
    //         />
    //         <Route
    //           path="/users/logout"
    //           element={<Logout setIsLogin={setIsLogin} />}
    //         />
    //         <Route path="/users/signup" element={<Signup />} />
    //         <Route path="/users/account-recovery" element={<FindPW />} />
    //         <Route path="/user" element={<User />} />
    //         <Route path="/question/ask" element={<AskQuestion />} />
    //         <Route path="/question/:id" element={<DetailQuestion />} />
    //         <Route path="/question/editq/:id" element={<EditAllPosts />} />
    //         <Route
    //           path="/question/edita/:id"
    //           element={<EditAllPosts answer />}
    //         />
    //       </Routes>
    //     </div>
    //     <Aside />
    //   </div>
    //   <Footer />
    //</BrowserRouter>
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
          <Route path="/" element={<Main questions={questions} />} />
          <Route path="/question/:id" element={<DetailQuestion />} />
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

////////////
// async setToken (state) {
//   // HEADER에 토큰 설정
//   axios.defaults.headers.common['x-access-token'] =  localStorage.getItem('accessToken')
//   // 만료시간이 지났을 경우, RefreshToken을 이용하여 AccessToken 재발급
//   var expiredTime = await this.$moment.utc(localStorage.getItem('expiredTime'))
//   var diffTime = await this.$moment.duration(expiredTime.diff(this.$moment()))
//   if (diffTime < 10000){
//       axios.defaults.headers.common['x-refresh-token'] = localStorage.getItem('refreshToken')
//       await axios.get(process.env.BACKEND_URL+'/api/users/reissue').then(
//         (res) => {
//           localStorage.setItem('accessToken', res.data.data.accessToken)
//           localStorage.setItem('expiredTime', res.data.data.cur_time)
//           axios.defaults.headers.common['x-access-token'] =  localStorage.getItem('accessToken')
//         },
//         (err) => {
//             // Login 페이지로 리디렉션
//         }
//       )
//   }
//   return new Promise(function(resolve, reject) {
//       resolve(true)
//   });
// }
