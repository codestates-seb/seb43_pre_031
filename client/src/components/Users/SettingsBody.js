import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
// import axios from 'axios';
// import { API } from '../utils/API';

const SettingsBody = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [mptitle, setMptitle] = useState('');
  const [aboutme, setAboutme] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'location') {
      setLocation(value);
    } else if (name === 'mptitle') {
      setMptitle(value);
    } else if (name === 'aboutme') {
      setAboutme(value);
    }
  };

  const navigate = useNavigate();

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
            name="username"
            type="text"
            value={username}
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
            name="mptitle"
            type="text"
            maxLength={225}
            placeholder="No title has been set"
            value={mptitle}
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
          <button name="submit" onClick={() => navigate(`/user`)}>
            Save profile
          </button>
          <button name="cancel" onClick={() => navigate(`/user`)}>
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
