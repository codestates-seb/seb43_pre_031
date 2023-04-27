import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';
import Content from '../elements/Content';
import Button from '../elements/Button';
import { getCookie } from '../lib/Cookies';

const Question = (props) => {
  const {
    title,
    asked,
    modified,
    // viewed,
    // vote,
    content,
    user,
    tags,
    deleteQuestion,
    editQuestion,
  } = props;
  const navigate = useNavigate();

  const checkUser = () => {
    if (getCookie('accessToken') === undefined) {
      navigate('/users/login');
      return;
    } else {
      navigate('/question/ask');
    }
  };

  return (
    <div className="question-wrapper">
      <TitleSection>
        <Title>
          <h1>{title}</h1>
          <div>
            <Button text="Ask Question" onClick={checkUser} />
          </div>
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
            <span>1 times</span>
          </div>
        </ExtraInfoArea>
      </TitleSection>
      <ContentSection>
        <VoteWrapper>
          <i className="vote">
            <IoMdArrowDropup size="5rem" />
          </i>
          {/* <span>{vote}</span> */}
          <span>0</span>
          <i className="vote">
            <IoMdArrowDropdown size="5rem" />
          </i>
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
  span {
    font-size: 1.3rem;
  }
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.6rem;
  padding-top: 0.5rem;
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
    color: ${(props) => props.theme.color.black700};
    font-size: 2.6rem;
    text-align: center;
  }
  .vote {
    color: ${(props) => props.theme.color.black200};
  }
`;

export default Question;
