import styled from 'styled-components';
import Viewer from '../components/Viewer';
import UserCard from './UserCard';

//질문, 답변 컨텐츠와 조작 버튼들, 프로필을 담는 컴포넌트
const Content = (props) => {
  const {
    type,
    content,
    date,
    user,
    tags,
    editContent,
    deleteContent,
    copyLink,
  } = props; //타입, 컨텐츠, 질문 등록일(혹은 답변일), 유저 객체를 인자로 받음

  return (
    <ContentWrapper>
      <div>{content && <Viewer content={content} />}</div>
      {type === 'question' && tags && (
        <TagsWrapper>
          {tags && tags.map((i, idx) => <Tag key={idx}>{i}</Tag>)}
        </TagsWrapper>
      )}
      <Controller className={type === 'answer' && 'isAnswer'}>
        <FlexWrapper className="fontcolor">
          <span role="presentation" onClick={copyLink}>
            Share
          </span>
          <span role="presentation" onClick={editContent}>
            Edit
          </span>
          <span role="presentation" onClick={deleteContent}>
            Delete
          </span>
        </FlexWrapper>
        <UserCard datatype={type} date={date} username={user} />
      </Controller>
    </ContentWrapper>
  );
};
const ContentWrapper = styled.div`
  width: 100%;
`;
const Controller = styled.div`
  display: flex;
  justify-content: space-between;

  .fontcolor {
    color: ${(props) => props.theme.color.black350};
  }

  &.isAnswer {
    border-bottom: 1px solid ${(props) => props.theme.color.black075};
    padding: 2rem 0;
    margin: 2rem 0;
  }
`;

const TagsWrapper = styled.div`
  margin: 3rem 0 4rem 0;
`;

const Tag = styled.span`
  background-color: ${(props) => props.theme.color.powder100};
  color: ${(props) => props.theme.color.blue800};
  margin-right: 0.8rem;
  border-radius: 3px;
  cursor: pointer;
  padding: 0.5rem;
  display: inline-block;
  text-align: center;

  &:hover {
    background-color: ${(props) => props.theme.color.powder200};
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 1rem;

  span {
    font-size: 1.3rem;
  }
`;

export default Content;
