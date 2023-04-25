// import styled from 'styled-components';
import Usersmain from '../components/Users/Usersmain';
import styled from 'styled-components';

const User = () => {
  return (
    <>
      <UserWrapper>
        <Usersmain />
      </UserWrapper>
    </>
  );
};

export default User;

export const UserWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 8rem;
  padding-left: 12rem;
  max-width: 1264px;
  display: flex;
  justify-content: center;
  main {
    width: 100%;
    .responsive {
      display: flex;
      @media screen and (max-width: 980px) {
        flex-direction: column;
      }
    }
    @media screen and (max-width: 980px) {
      padding: 1.2rem;
    }
  }
  .position {
    position: relative;
    width: calc(100% - 164px);
    @media screen and (max-width: 640px) {
      width: 100% !important;
    }
    .userboard-btns {
      display: flex;
      position: absolute;
      top: 1.2rem;
      right: 2.4rem;
      button {
        height: 3.6rem;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: ${(props) => props.theme.color.black500};
        padding: 0.96rem;
        margin: 0.3rem;
        background-color: transparent;
        border: 1px solid ${(props) => props.theme.color.black200};
        border-radius: 3px;
        svg {
          margin-right: 3px;
        }
        &:hover {
          color: ${(props) => props.theme.color.black600};
          background-color: ${(props) => props.theme.color.black025};
        }
      }
    }
  }
  .user-wrapper {
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    .user-imgBox {
      width: 128px;
      height: 128px;
      border-radius: 5px;
      margin-right: 10px;
      cursor: pointer;
      background-image: url(https://www.gravatar.com/avatar/4155f0d14a5ae70fc6670903206da4e8?s=256&d=identicon&r=PG&f=y&so-version=2);
      background-size: contain;
      background-repeat: no-repeat;
    }
    .user-info {
      h1 {
        font-size: 3.4rem;
        margin: 4px 4px 12px;
      }
      ul {
        display: flex;
        margin: 0 4px;
        li {
          display: flex;
          align-items: center;
          font-size: 1.3rem;
          color: ${(props) => props.theme.color.black500};
          margin-right: 8px;
          svg {
            margin-right: 3px;
          }
        }
        li:last-child {
          cursor: pointer;
        }
      }
    }
  }
`;
