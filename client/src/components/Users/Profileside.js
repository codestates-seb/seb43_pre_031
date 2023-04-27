import styled from 'styled-components';
import SvgIcon from '@mui/material/SvgIcon';
import ReorderIcon from '@mui/icons-material/Reorder';

const ProfileSide = () => {
  return (
    <SideContent>
      <h2>Stats</h2>
      <div className="left">
        <ul>
          <li>
            1<span>reputation</span>
          </li>
          <li>
            0<span>reached</span>
          </li>
          <li>
            0<span>answers</span>
          </li>
          <li>
            0<span>questions</span>
          </li>
        </ul>
      </div>
      <div className="flex">
        <h2>Communities</h2>
        <p>Edit</p>
      </div>
      <div className="left">
        <div className="flex">
          <div>
            <SvgIcon component={ReorderIcon} inheritViewBox />
            <p>
              Stack Overflow<span>1</span>
            </p>
          </div>
        </div>
      </div>
    </SideContent>
  );
};

const SideContent = styled.div`
  width: 35rem;
  margin: 1.2rem 1.2rem 1.2rem 0;
  @media screen and (max-width: 980px) {
    width: 100%;
    li {
      width: 25% !important;
    }
  }
  .flex {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      font-size: 1.3rem;
      margin-bottom: 0;
      color: ${(props) => props.theme.color.black500};
      cursor: pointer;
    }
    div {
      width: 100%;
      display: flex;
      align-items: center;
      p {
        display: flex;
        flex: 1;
        justify-content: space-between;
        color: ${(props) => props.theme.color.blue500};
        &:hover {
          color: ${(props) => props.theme.color.blue300};
        }
      }
    }
  }
  .flex.hover {
    p {
      color: ${(props) => props.theme.color.black500};
      &:hover {
        color: ${(props) => props.theme.color.black100};
      }
    }
  }
  h2 {
    font-size: 2.1rem;
    font-weight: 400;
    color: ${(props) => props.theme.color.black1000};
    margin-bottom: 0.9rem;
  }
  .left {
    width: 100%;
    border-radius: 0.5rem;
    border: 1px solid ${(props) => props.theme.color.black100};
    display: flex;
    margin-bottom: 2.2rem;
    padding: 1.2rem;
    svg {
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
    }
    p {
      margin: 0;
    }
    ul {
      width: 100%;
      justify-content: center;
      li {
        width: 50%;
        height: 4rem;
        display: flex;
        float: left;
        flex-direction: column;
        justify-content: flex-start;
      }
      li:first-child,
      li:nth-child(2) {
        margin-bottom: 1.2rem;
      }
    }
    span {
      font-size: 1.3rem;
      color: ${(props) => props.theme.color.black500};
    }
  }
`;

export default ProfileSide;
