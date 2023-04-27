import styled from 'styled-components';
import CreateIcon from '@mui/icons-material/Create';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReorderIcon from '@mui/icons-material/Reorder';

const Aside = () => {
  return (
    <Container>
      <ul>
        <h1>The Overflow Blog</h1>
        <li>
          <CreateIcon />
          <span>The philosopher who believes in Web Assembly</span>
        </li>
        <li>
          <CreateIcon />
          <span>Community is the future of AI</span>
        </li>
        <h1>Featured on Meta</h1>
        <li>
          <ChatBubbleOutlineIcon />
          <span>
            Improving the copy in the close modal and post notices - 2023
            edition
          </span>
        </li>
        <li>
          <ChatBubbleOutlineIcon />
          <span>
            New blog post from our CEO Prashanth: Community is the future of AI
          </span>
        </li>
        <li>
          <ReorderIcon />
          <span>Temporary policy: ChatGPT is banned</span>
        </li>
        <li>
          <ReorderIcon />
          <span>The [protection] tag is being burninated</span>
        </li>
        <li>
          <ReorderIcon />
          <span>
            Content Discovery initiative 4/13 update: Related questions using a
            Machine...
          </span>
        </li>
      </ul>
    </Container>
  );
};

export default Aside;

const Container = styled.aside`
  /* margin-left: 3rem; */
  margin-top: 6rem;
  min-width: 20%;
  ul {
    background-color: #fdf7e2;
    margin-top: 2.5rem;
    box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
      0 2px 8px hsla(0, 0%, 0%, 0.05);
    color: ${(props) => props.theme.color.black700};
    h1 {
      background-color: #fbf3d5;
      width: 100%;
      border: 1px solid ${(props) => props.theme.color.yellow200};
      padding: 1.5rem;
      font-size: 1.4rem;
    }
    li {
      list-style: none;
      padding: 1.3rem;
      display: flex;
      align-items: flex-start;
      font-size: 1.3rem;

      svg {
        margin-right: 0.5rem;
      }
    }
  }
`;
