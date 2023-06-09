import styled from 'styled-components';
import SettingsSide from './SettingsSide.js';
import { useState } from 'react';
import axios from 'axios';
import { API } from '../../utils/API';
import { getCookie, removeCookie } from '../../lib/Cookies';
import storage from '../../lib/storage';
import { useNavigate } from 'react-router-dom';

const token = getCookie('accessToken');
const userID = storage.get('userID');

const UserDelete = () => {
  const navigate = useNavigate();
  const [boxChecked, setBoxChecked] = useState(false);
  const CheckedHandler = () => {
    setBoxChecked(!boxChecked);
  };
  const handleClickBtnDelete = async () => {
    axios
      .delete(`${API}/members/${userID}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        console.log(response);
        //로컬스토리지에 있는 유저ID, 로그인상태, 쿠키(JWT 토큰값)
        //200 응답을 받고 확인될때 삭제를 해주는 로직 필요(but too much)
        storage.remove('login');
        storage.remove('userID');
        removeCookie('accessToken');
        // removeCookie('refreshToken'); 구현안됨

        navigate('/users/login');

        alert('탈퇴 되었음');
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {});
  };

  return (
    <Center>
      <SettingsSide />
      <SettingContent>
        <h2>Delete Profile</h2>
        <hr></hr>
        <p>
          Before confirming that you would like your profile deleted, we’d like
          to take a moment to explain the implications of deletion:
        </p>
        <ul>
          <li className="disc">
            Deletion is irreversible, and you will have no way to regain any of
            your original content, should this deletion be carried out and you
            change your mind later on.
          </li>

          <li className="disc">
            Your questions and answers will remain on the site, but will be
            disassociated and anonymized (the author will be listed as
            `user21681541`) and will not indicate your authorship even if you
            later return to the site.
          </li>
        </ul>
        <p>
          Confirming deletion will only delete your profile on Stack Overflow -
          it will not affect any of your other profiles on the Stack Exchange
          network. If you want to delete multiple profiles, you’ll need to visit
          each site separately and request deletion of those individual
          profiles.
        </p>

        <ChectDiv>
          <label>
            <div>
              <input
                type="checkbox"
                checked={boxChecked}
                onChange={CheckedHandler}
              />
            </div>
            <div>
              I have read the information stated above and understand the
              implications of having my profile deleted. I wish to proceed with
              the deletion of my profile.
            </div>
          </label>
        </ChectDiv>

        {boxChecked ? (
          <DeleteBtn onClick={() => handleClickBtnDelete()}>
            Delete Profile
          </DeleteBtn>
        ) : (
          <DeleteBtn className="disabled">Delete Profile</DeleteBtn>
        )}
      </SettingContent>
    </Center>
  );
};

const ChectDiv = styled.div`
  display: flex;
  > label {
    display: flex;
    > div {
      margin: 4px;
    }
  }
`;

const SettingContent = styled.div`
  font-size: 1.6rem;
  margin: 0 0 0 3rem;
  input {
    width: 40rem;
    height: 2.5rem;
    margin-bottom: 1.5rem;
    margin: 0 0 1.5rem 1rem;
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
    margin: 2rem 0 2rem 0;
  }
`;

const DeleteBtn = styled.button`
  padding: 1rem;
  border: none;
  border-top: 1px solid ${(props) => props.theme.color.red200};
  margin: 3rem 1rem 0 0;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.red500};
  outline: ${(props) => props.theme.color.red500} solid 1px;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.color.red600};
  }
  &.disabled {
    opacity: 0.5;
    pointer-events: none;
    text-decoration: none;
  }

  &:active {
    outline: ${(props) => props.theme.color.red100} solid 0.4rem;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input {
    width: 1rem;
    height: 1rem;
  }
`;

export default UserDelete;
