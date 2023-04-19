import styled from 'styled-components';

const QuestionList = ({ question }) => {
  console.log(question);
  return (
    <Container>
      <List>
        <div>
          <span>{question.vote} votes</span>
          <span>{question.answer_count} answers</span>
          <span>{question.viewed} views</span>
        </div>
        <Content>
          <Title>{question.title}</Title>
          <Description>{question.content}</Description>
          <Tags>
            {question.tags.map((tag) => (
              <Tag key={tag.tid}>{tag.name}</Tag>
            ))}
          </Tags>
          <Author>
            <img
              src={`${question.author.userimage}`}
              alt="작성자 프로필 사진"
            />
            <a href="/">{question.author.username}</a>
          </Author>
        </Content>
      </List>
    </Container>
  );
};

export default QuestionList;

const Container = styled.ul``;

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

const Title = styled.h3``;

const Description = styled.p``;

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

const Tag = styled.span``;

const Author = styled.div`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  img {
    border-radius: 2px;
    width: 2.5rem;
    margin-right: 0.5rem;
  }
`;