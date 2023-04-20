import styled from 'styled-components';
// import { Link } from 'react-router-dom';

export const SettingsBody = () => {
  return (
    <>
      <SettingContent>
        <h2>Edit your profile</h2>
        <hr></hr>
        <p>Public information</p>
        <div className="right">
          <span>Profile image</span>
          <div className="user-imgBox"></div>
          <span>Display name</span>
          <input></input>
          <span>Location</span>
          <input></input>
          <span>Title</span>
          <input placeholder="No title has been set"></input>
          <span>About me</span>
          <input></input>
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
        <button>Save profile</button>
        <button>Cancel</button>
      </SettingContent>
    </>
  );
};

export const SettingContent = styled.div`
  /* width: 782.25px; */
  width: 100%;
  margin: 1.2rem;
  @media screen and (max-width: 9.8rem) {
    margin: 0;
    .right {
      width: 50%;
    }
  }
  margin: 0 0 0 3rem;
  input {
    width: 40rem;
    height: 2.5rem;
    margin-bottom: 1.5rem;
    margin: 0 0 1.5rem 1rem;
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
