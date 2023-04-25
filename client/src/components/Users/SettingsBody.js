import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import storage from '../../lib/storage';
import { API } from '../../utils/API';
// import { patchMemberInfo, getMemberInfo } from '../../utils/API';

const SettingsBody = () => {
  // 유저 아이디 ->>> 추후 수정 필요
  const [userId, setUserId] = useState('');
  const [check, setCheck] = useState(false);
  const [fullname, setFullname] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [aboutme, setAboutme] = useState('');
  const reqParams = {
    memberId: userId,
    fullName: fullname,
    location: location,
    title: title,
    aboutme: aboutme,
    memberStatus: 'MEMBER_ACTIVE',
  };
  // 페이지 초기화
  useEffect(() => {
    // 유저 아이디 가져오는 부분 ->>> 추후 수정 필요
    setUserId(storage.get('loginID'));

    // const reqParams = {
    //   memberId: userId,
    // };

    axios(
      `${API}/members/1`,
      //요청할 api 주소, api명세를 보고 작성(path)
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
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
        setLocation(res.data.location);
        setTitle(res.data.title);
        setAboutme(res.data.aboutme);
      })
      .catch((ex) => {
        //오류가 발생했을때 오류를 콘솔에 찍는 것
        console.log(ex);
        alert('서버가 정상적이지 않음. \n 다시 시도해 주세요.');
      });
  }, [check]); //useeffect 처음에 1번만 실행하고 실행 안함 안에 username을 넣으면 바꿀때마다 실행됨

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'fullname') {
      setFullname(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'title') {
      setTitle(value);
    } else if (name === 'aboutme') {
      setAboutme(value);
    }
  };

  const navigate = useNavigate();

  const handleClickBtnSubmit = async (e) => {
    e.preventDefault();

    axios(`${API}/members/1`, {
      method: 'PATCH', //데이터 수정 요청
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: JSON.stringify(reqParams),
    })
      // await patchMemberInfo(reqParams)
      .then((res) => {
        // 응답을 받은 경우
        setCheck(!check);
        // 응답 데이터 LOG
        console.log(res.data);

        alert('저장 성공');
      })
      .catch((ex) => {
        // 응답을 받지 못하거나 오류 발생 한 경우 (RES CODE 200이 아닌 경우)
        console.log(ex);
        alert('저장 실패');
      });
  };

  const handleClickBtnCancel = () => {
    navigate(`/user`);
  };

  return (
    <>
      <SettingContent>
        <h2>Edit your profile</h2>
        <hr></hr>
        <p>Public information</p>
        <div className="right">
          <span>Profile image</span>
          <input type="file" accept="image/*" />
          <div className="user-imgBox"></div>
          <span>Display name</span>
          <input
            name="fullname"
            type="text"
            value={fullname}
            onChange={onChange}
            maxLength={30}
          ></input>
          <span>Location</span>
          <input
            name="location"
            type="text"
            maxLength={100}
            value={location}
            onChange={onChange}
          ></input>
          <span>Title</span>
          <input
            name="title"
            type="text"
            maxLength={225}
            placeholder="No title has been set"
            value={title}
            onChange={onChange}
          ></input>
          <span>About me</span>
          <input
            name="aboutme"
            type="text"
            value={aboutme}
            onChange={onChange}
          ></input>
        </div>
        <p>Links</p>
        <div className="right-link">
          <span>Website link</span>
          <input placeholder="https://123"></input>
          <span>Twitter link or username</span>
          <input placeholder="https://twitter.com/234"></input>
          <span>GitHub link or username</span>
          <input placeholder="https://github.com/456"></input>
        </div>
        <p>
          Private information <text>Not shown publcly</text>
        </p>
        <div className="right">
          <span>Full name</span>
          <input></input>
        </div>
        <form>
          <button name="submit" onClick={handleClickBtnSubmit}>
            Save profile
          </button>
          <button name="cancel" onClick={handleClickBtnCancel}>
            Cancel
          </button>
        </form>
      </SettingContent>
    </>
  );
};

const SettingContent = styled.div`
  /* width: 782.25px; */
  width: 100%;
  margin: 1.2rem;
  @media screen and (max-width: 9.8rem) {
    margin: 0;
    .right {
      width: 50%;
    }
  }
  display: flex;
  flex-direction: column;

  margin: 0 0 0 3rem;
  input {
    width: 40rem;
    height: 3rem;
    margin-bottom: 1.5rem;
    margin: 0 0 1.5rem 1rem;
    .aboutme {
      width: 500rem;

    }
  }
  span {
    font-size: 1.5rem;
    font-weight: Bold;
        margin: 0 0 0.2rem 1rem;
  }
  hr {
    height: 0rem;
  }
  h2 {
    font-size: 3rem;
    font-weight: 500;
    color: ${(props) => props.theme.color.black1000};
    margin-bottom: 0.9rem;
  }
  p {
    font-size: 2rem;
    margin: 3rem 0 1rem 0;
  }
    
  
  text {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.black600};
  }
  .right {
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.black100};
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: white;
    margin-bottom: 2.3rem;
      }
      .right-link {
        border-radius: 0.5rem;
        border: 1px solid ${(props) => props.theme.color.black100};
        padding: 1rem;
        display: flex;
        justify-content: center;
        flex-direction: row;
        background-color: white;
        margin-bottom: 2.3rem;
          }
          button {
            padding: 1rem;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.blue200};
  margin: 3rem 1rem 0 0;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.blue500};
  outline: ${(props) => props.theme.color.blue500} solid 1px;
  color: white;
  cursor: pointer;
          

  &:hover {
    background-color: ${(props) => props.theme.color.blue600};
  }

  &:active {
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
          }
    }
  .user-imgBox {
    width: 164x;
    height: 164px;
    border-radius: 5px;
    margin: 10px;
    background-image: url(https://www.gravatar.com/avatar/4155f0d14a5ae70fc6670903206da4e8?s=256&d=identicon&r=PG&f=y&so-version=2);
    background-size: contain;
    background-repeat: no-repeat;
  }
}
`;

export default SettingsBody;
