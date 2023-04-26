import { Link } from 'react-router-dom';
import axios from 'axios';
import storage from '../../lib/storage';
import { API } from '../../utils/API';
import { getCookie } from '../../lib/Cookies';
import { useEffect, useState } from 'react';

const UserBoard = () => {
  const [fullname, setFullname] = useState('');
  const [title, setTitle] = useState('');
  const token = getCookie('AccessToken');
  const userID = storage.get('userID');

  useEffect(() => {
    // 유저 아이디 가져오는 부분 ->>> 추후 수정 필요

    // const reqParams = {
    //   memberId: userId,
    // };

    axios(
      `${API}/members/${userID}`,
      //요청할 api 주소, api명세를 보고 작성(path)
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          // ngrok 으로 데이터 받을 때 browser warning 스킵
          // 'ngrok-skip-browser-warning': '69420',
        },
      }
    )
      // getMemberInfo(reqParams) //요청할 api주소를 적는다.
      .then((res) => {
        //res에 데이터 들어옴
        // 응답 데이터 LOG
        console.log(res);

        // 페이지 초기 값 설정
        setFullname(res.data.fullName);
        setTitle(res.data.title);
      })
      .catch((ex) => {
        //오류가 발생했을때 오류를 콘솔에 찍는 것
        console.log(ex);
        alert('서버가 정상적이지 않음. \n 다시 시도해 주세요.');
      });
  }, []); //useeffect 처음에 1번만 실행하고 실행 안함 안에 username을 넣으면 바꿀때마다 실행됨

  return (
    <>
      <section className="user-wrapper">
        <div className="user-imgBox"></div>
        <div className="user-info">
          <h1>{fullname}</h1>
          <div>{title}</div>
          <ul>
            <li>
              <div>
                Member for <span>5 days</span>
              </div>
            </li>
            <li>
              <div>Last seen this week</div>
            </li>
            <li>
              <div>Visited 4 days, 2 consecutive</div>
            </li>
          </ul>
        </div>
        <div className="userboard-btns">
          <Link to="/user/settings">
            <button>Edit profile</button>
          </Link>

          <button>Network profile</button>
        </div>
      </section>
    </>
  );
};

export default UserBoard;
