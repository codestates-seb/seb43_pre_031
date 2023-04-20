import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import Content from '../elements/Content';
import Button from '../elements/Button';

const Question = (props) => {
  const {
    title,
    asked,
    modified,
    viewed,
    vote,
    content,
    user,
    tags,
    deleteQuestion,
    editQuestion,
  } = props;
  const navigate = useNavigate();

  return (
    <div className="question-wrapper">
      <TitleSection>
        <Title>
          <h1>{title}</h1>

          <Button
            text="Ask Question"
            onClick={() => navigate(`/question/ask`)}
          />
        </Title>
        <ExtraInfoArea>
          <div>
            <span>Asked</span>
            <span>{asked}</span>
          </div>
          <div>
            <span>Modified</span>
            <span>{modified}</span>
          </div>
          <div>
            <span>Viewed</span>
            <span>{viewed} times</span>
          </div>
        </ExtraInfoArea>
      </TitleSection>
      <ContentSection>
        <VoteWrapper>
          <IoMdArrowDropup size="5rem" />
          <span>{vote}</span>
          <IoMdArrowDropdown size="5rem" />
        </VoteWrapper>
        {user && (
          <Content
            type="question"
            content={content}
            date={asked}
            user={user}
            tags={tags}
            deleteContent={deleteQuestion}
            editContent={editQuestion}
          />
        )}
      </ContentSection>
    </div>
  );
};

const TitleSection = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.black075};
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  h1 {
    width: 80%;
  }
`;

const ExtraInfoArea = styled.div`
  margin: 1rem 0;
  display: flex;
  gap: 3rem;

  span:first-child {
    margin-right: 0.8rem;
    color: ${(props) => props.theme.color.black350};
  }
`;

const ContentSection = styled.div`
  padding: 2rem 0;
  margin-bottom: 4rem;
  display: flex;
  gap: 1.4rem;
`;

const VoteWrapper = styled.div`
  width: 6rem;
  display: flex;
  flex-direction: column;

  span {
    font-size: 2.6rem;
    text-align: center;
  }
`;

export default Question;
