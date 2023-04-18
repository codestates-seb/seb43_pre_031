import styled from 'styled-components';
import Button from '../elements/Button';

const Container = styled.div`
  grid-area: main;
  border-left: 1px solid ${(props) => props.theme.color.black200};
  margin-top: 6rem;
  height: 100vh;

  h2 {
    padding: 0 2.5rem 2.5rem 2.5rem;
    font-size: 2rem;
    font-weight: 400;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem;
  h1 {
    font-size: 3rem;
  }
`;

const Lists = styled.ul``;

const List = styled.li`
  padding: 2rem;
  border-top: 1px solid ${(props) => props.theme.color.black200};
  list-style: none;
  display: grid;
  grid-template-columns: 0.5fr 3fr;
  color: ${(props) => props.theme.color.black700};
  & > div {
    display: flex;
    font-size: 1.5rem;
    flex-direction: column;
  }
  & > div:first-child {
    margin-right: 1.5rem;
    text-align: right;
    span {
      margin-bottom: 0.5rem;
    }
  }
`;

const Content = styled.div`
  h3 {
    color: ${(props) => props.theme.color.blue700};
    font-weight: 400;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.color.blue500};
    }
  }
`;

const Tags = styled.div`
  margin: 1.5rem 0;
  span {
    background-color: ${(props) => props.theme.color.blue100};
    color: ${(props) => props.theme.color.blue800};
    padding: 0.5rem 0.7rem;
    margin-right: 0.8rem;
    border-radius: 3px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.theme.color.blue200};
    }
  }
`;

const Author = styled.div`
  text-align: right;
  img {
    margin-right: 0.5rem;
  }
`;

const Questions = () => {
  return (
    <Container>
      <Title>
        <h1>All Questions</h1>
        <Button text="Ask Question" />
      </Title>
      <h2>23,644,472 questions</h2>
      <Lists>
        <List>
          <div>
            <span>0 votes</span>
            <span>0 answers</span>
            <span>6 views</span>
          </div>
          <Content>
            <h3>Redis: storing key/value pair without expiration time</h3>
            <p>
              Can someone explain me how to store key/value pair in redis with
              unlimited exipire time? I was trying to find some information at
              stackoverflow and google and I found nothing.
            </p>
            <Tags>
              <span>태그1</span>
              <span>태그2</span>
              <span>태그3</span>
            </Tags>
          </Content>
        </List>
        <List>
          <div>
            <span>0 votes</span>
            <span>0 answers</span>
            <span>6 views</span>
          </div>
          <Content>
            <h3>Redis: storing key/value pair without expiration time</h3>
            <p>
              Can someone explain me how to store key/value pair in redis with
              unlimited exipire time? I was trying to find some information at
              stackoverflow and google and I found nothing.
            </p>
            <Tags>
              <span>태그1</span>
              <span>태그2</span>
              <span>태그3</span>
            </Tags>
            <Author>
              <img src="" alt="작성자 프로필 사진" />
              <span>류수빈</span>
            </Author>
          </Content>
        </List>
      </Lists>
    </Container>
  );
};

export default Questions;
