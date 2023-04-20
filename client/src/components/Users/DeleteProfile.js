import styled from 'styled-components';
import { SettingsSide } from './SettingsSide.js';
// import { Link } from 'react-router-dom';

export const DeleteProfile = () => {
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

        <div>
          <input type="checkbox"></input>I have read the information stated
          above and understand the implications of having my profile deleted. I
          wish to proceed with the deletion of my profile.
        </div>

        <button>Delete Profile</button>
      </SettingContent>
    </Center>
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
  button {
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