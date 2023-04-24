import styled from 'styled-components';

const ProfileBody = () => {
  // const { aboutme } = { userObj} ;

  return (
    <UserProfile>
      <h2>About</h2>
      <div className="right">
        <p>
          Your about me section is currently blank. Would you like to add one?
          <span> Edit profile</span>
        </p>
      </div>
      <h2>Badges</h2>
      <div className="right">
        <p>
          You have not earned any <span>badges.</span>
        </p>
      </div>
      <h2>Posts</h2>
      <div className="right post">
        <p>Just getting started? Try answering a question!</p>
        <p>
          Your most helpful questions, answers and tags will appear here. Start
          by <span>answering a question</span> or <span>selecting tags</span>
          that match topics you’re interested in.
        </p>
      </div>
    </UserProfile>
  );
};

const UserProfile = styled.div`
  /* width: 782.25px; */
  width: 100%;
  margin: 1.2rem;
  @media screen and (max-width: 9.8rem) {
    margin: 0;
    .right {
      width: 100%;
    }
  }
  h2 {
    font-size: 2.1rem;
    font-weight: 400;
    color: ${(props) => props.theme.color.black1000};
    margin-bottom: 0.9rem;
  }
  .right {
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.black100};
    padding: 3.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: ${(props) => props.theme.color.black050};
    margin-bottom: 2.3rem;
    p {
      max-width: 41.5rem;
      text-align: center;
      word-break: keep-all;
      font-size: 1.3rem;
      color: ${(props) => props.theme.color.black500};
      margin: 0;
      span {
        color: ${(props) => props.theme.color.blue500};
        cursor: pointer;
        &:hover {
          color: ${(props) => props.theme.color.blue300};
        }
      }
    }
    svg {
      width: 19.6rem;
      height: 19.6rem;
    }
  }
`;

export default ProfileBody;
