import './App.css';
// import Main from './pages/Main';
// import AskQuestion from './pages/AskQuestion';
// import DetailQuestion from './pages/DetailQuestion';
// import Login from './pages/Login';
import Signup from './pages/Singnup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './utils/API';

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
        console.log(`isLogin : ${isLogin}`);
        console.log(`userInfo : ${userInfo}`);
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
    <div className="App">
      {/* <Login setIsLogin={setIsLogin} setUserInfo={setUserInfo} /> */}
      <Signup />
      {/* <Main />
      <div className="temp-test">
        <AskQuestion />
        <DetailQuestion />
      </div> */}
    </div>
  );
}

export default App;
