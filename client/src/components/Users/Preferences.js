import styled from 'styled-components';
import SettingsSide from './SettingsSide.js';
import { useState } from 'react';

const Preferences = () => {
  const [radiobutton, setRadioButton] = useState();
  const handleClickRadioButton = (e) => {
    setRadioButton(e.target.value);
  };
  return (
    <Center>
      <div>
        <SettingsSide />
      </div>
      <SettingContent>
        <h2>Preferences</h2>
        <hr></hr>
        <p>Interface</p>
        <Column>
          <div className="image">
            <span>Theme</span>

            <label>
              Light
              <input
                type="radio"
                value="light"
                checked={radiobutton === 'light'}
                onChange={handleClickRadioButton}
              ></input>
            </label>

            <label>
              Dark
              <input
                type="radio"
                value="dark"
                checked={radiobutton === 'dark'}
                onChange={handleClickRadioButton}
              ></input>
            </label>
          </div>
        </Column>
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
  label {
    width: 96px;
    height: 96px;
    background-image: url(https://cdn.sstatic.net/Img/preferences/theme-light.svg?v=2d017a78abab);
    background-size: contain;
    background-repeat: no-repeat;
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
  .image {
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.black100};
    padding: 1rem;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    background-color: white;
    margin-bottom: 2.3rem;
  }
  span {
    font-size: 1.5rem;
    font-weight: Bold;
    margin: 1rem;
  }
`;

const Center = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Preferences;
