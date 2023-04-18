import './App.css';
// import Main from './pages/Main';
// import AskQuestion from './pages/AskQuestion';
// import DetailQuestion from './pages/DetailQuestion';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';

// 모든 요청에 withCredentials가 true로 설정됩니다.
axios.defaults.withCredentials = true;

function App() {
  // 최초 렌더링 시 회원정보 받아오기
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const authHandler = () => {
    console.log(userInfo);
    axios
      .get('https://973f-58-122-5-44.jp.ngrok.io/members/1')
      .then((res) => {
        setIsLogin(true);
        setUserInfo(res.data);
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
    <div className="App">
      <Login setIsLogin={setIsLogin} setUserInfo={setUserInfo} />
      {/* <Main />
      <div className="temp-test">
        <AskQuestion />
        <DetailQuestion />
      </div> */}
    </div>
  );
}

export default App;
