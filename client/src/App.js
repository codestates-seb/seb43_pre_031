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
  // * 새로고침해도 로그인 정보가 유지되는 기능 *
  // 로그인이 되어있는지 확인하기 위해 로컬스토리지에서 userID를 가져오기(로그인 시 로컬스토리지에 userID가 저장됨)
  // 로그인 정보가 없다면 멈추기
  // 로그인이 되어있다면 userId 를 서버로 보내서 회원정보를 받아오기!
  let userId;
  (function checkUserLogin() {
    const loggedInfo = storage.get('login');
    if (!loggedInfo) return;
    userId = storage.get('userID');
    console.log(`localstorage userId : ${userId}`);
    console.log(`localstorage login : ${loggedInfo}`);
  })();

  // 로그인 성공 시 로그인 여부 받아오기
  const [isLogin, setIsLogin] = useState(false);
  const [questions, setQuestions] = useState([]);

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/users/login"
          element={<Login setIsLogin={setIsLogin} />}
        />
        <Route
          path="/users/logout"
          element={<Logout setIsLogin={setIsLogin} userId={userId} />}
        />
        <Route path="/users/signup" element={<Signup />} />
        <Route path="/users/account-recovery" element={<FindPW />} />

        <Route path="/" element={<ContainAll />}>
          <Route path="/" element={<Main questions={questions} />} />
          <Route path="/question/:id" element={<DetailQuestion />} />
        </Route>

        <Route path="/" element={<NavFooter />}>
          <Route path="/user" element={<User />} />
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
