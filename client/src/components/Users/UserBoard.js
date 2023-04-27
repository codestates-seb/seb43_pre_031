import { Link } from 'react-router-dom';
import axios from 'axios';
import storage from '../../lib/storage';
import { API } from '../../utils/API';
import { getCookie } from '../../lib/Cookies';
import { useEffect, useState } from 'react';
import SvgIcon from '@mui/material/SvgIcon';
import CakeIcon from '@mui/icons-material/Cake';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CreateIcon from '@mui/icons-material/Create';
import CommentIcon from '@mui/icons-material/Comment';

const UserBoard = () => {
  const [fullname, setFullname] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const token = getCookie('accessToken');
  const userID = storage.get('userID');

  useEffect(() => {
    axios(
      `${API}/members/${userID}`,
      //요청할 api 주소, api명세를 보고 작성(path)
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        //res에 데이터 들어옴
        // 응답 데이터 LOG
        console.log(res);

        // 페이지 초기 값 설정
        setFullname(res.data.fullName);
        setTitle(res.data.title);
        setLocation(res.data.location);
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
              <SvgIcon component={CakeIcon} inheritViewBox />
              <div>
                Member for <span>5 days</span>
              </div>
            </li>
            <li>
              <SvgIcon component={AccessTimeIcon} inheritViewBox />
              <div>Last seen this week</div>
            </li>
            <li>
              <SvgIcon component={CalendarMonthIcon} inheritViewBox />
              <div>Visited 4 days, 2 consecutive</div>
            </li>
          </ul>
          <ul>
            <li>
              <SvgIcon component={LocationOnIcon} inheritViewBox />
              <div>{location}</div>
            </li>
          </ul>
        </div>
        <div className="userboard-btns">
          <Link to="/user/settings">
            <button>
              <SvgIcon component={CreateIcon} inheritViewBox />
              Edit profile
            </button>
          </Link>

          <button>
            <SvgIcon component={CommentIcon} inheritViewBox />
            Network profile
          </button>
        </div>
      </section>
    </>
  );
};

export default UserBoard;
