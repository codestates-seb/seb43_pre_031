import styled from 'styled-components';
import SettingsSide from './SettingsSide.js';
// import { Link } from 'react-router-dom';

const Preferences = () => {
  return (
    <Center>
      <div>
        <SettingsSide />
      </div>
      <SettingContent>
        <h2>Preferences</h2>
        <hr></hr>
        <p>Interface</p>
        <Test>
          <div className="right">
            <span>Theme</span>

            <div className="theme-lightimgBox">
              <input type="radio"></input>
            </div>

            <div className="theme-darkimgBox">
              <input type="radio"></input>
            </div>
          </div>
        </Test>
      </SettingContent>
    </Center>
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
  span {
    font-size: 1.5rem;
    font-weight: Bold;
    margin: 1rem;
  }
  .theme-lightimgBox {
    width: 100x;
    height: 70px;
    border-radius: 5px;
    margin: 10px;
    background-image: url(https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab);
    background-size: contain;
    background-repeat: no-repeat;
  }
  .theme-darkimgBox {
    width: 100x;
    height: 70px;
    border-radius: 5px;
    margin: 10px;
    background-image: url(https://cdn.sstatic.net/Img/preferences/theme-dark.svg?v=9a46fd615a91);
    background-size: contain;
    background-repeat: no-repeat;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Test = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Preferences;
