import styled from 'styled-components';

const UserCard = (props) => {
  const { username, datetype, date } = props;

  return (
    <UserCardWrapper>
      {datetype === 'question' ? (
        <Date>asked {date}</Date>
      ) : (
        <Date>answered {date}</Date>
      )}
      <UserFrame>
        <img
          src={`https://randomuser.me/api/portraits/thumb/men/40.jpg`}
          alt="유저이미지"
        />

        <UserInfo>
          <span className="username">{username}</span>
          <ul>
            <li className="repu">0</li>
            <li className="medal-wrapper">
              <span className="medal gold"></span>
              <span>0</span>
            </li>
            <li className="medal-wrapper">
              <span className="medal silver"></span>
              <span>0</span>
            </li>
            <li className="medal-wrapper">
              <span className="medal bronze"></span>
              <span>0</span>
            </li>
          </ul>
        </UserInfo>
      </UserFrame>
    </UserCardWrapper>
  );
};

const UserCardWrapper = styled.div`
  background-color: ${(props) => props.theme.color.powder200};
  border-radius: ${(props) => props.theme.common.borderRadius};
  width: 20rem;
  font-size: 1.3rem;
  padding: 0.6rem 0.7rem;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: ${(props) => props.theme.common.borderRadius};
  }
`;

const Date = styled.p`
  color: ${(props) => props.theme.color.black500};
`;

const UserFrame = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.3rem 0;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .username {
    color: ${(props) => props.theme.color.blue700};
  }

  ul {
    display: flex;
  }

  li {
    list-style-type: none;
    margin-right: 0.8rem;

    > span:last-child {
      color: ${(props) => props.theme.color.black350};
    }
  }

  .repu {
    font-weight: 700;
    color: ${(props) => props.theme.color.black600};
  }

  .medal {
    display: inline-block;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 100%;
    margin-right: 0.4rem;
  }

  .gold {
    background-color: ${(props) => props.theme.color.gold};
  }
  .silver {
    background-color: ${(props) => props.theme.color.black300};
  }
  .bronze {
    background-color: ${(props) => props.theme.color.bronze};
  }
`;

export default UserCard;
