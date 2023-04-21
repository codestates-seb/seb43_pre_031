import styled from 'styled-components';
import Viewer from '../components/Viewer';

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
    <div className="content-wrapper">
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
        <UserCard>
          <p className="fontcolor">
            {type === 'answer' ? `answered ${date}` : `asked ${date}`}
          </p>
          {user && (
            <UserFlexWrapper>
              <img src={user.userimage} alt="유저 이미지"></img>
              <span className="edited">{user.username}</span>
            </UserFlexWrapper>
          )}
        </UserCard>
      </Controller>
    </div>
  );
};

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
  padding: 0.4rem 0.6rem;
  color: ${(props) => props.theme.color.blue700};
  background-color: ${(props) => props.theme.color.powder200};
  border-radius: ${(props) => props.theme.common.borderRadius};
  margin-right: 0.6rem;
  font-size: 1.2rem;
`;

const UserCard = styled.div`
  width: 20rem;
  height: 6.7rem;
  padding: 0.6rem;
  background-color: ${(props) => props.theme.color.powder200};
  border-radius: ${(props) => props.theme.common.borderRadius};

  p {
    font-size: 1.3rem;
  }
  img {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: ${(props) => props.theme.common.borderRadius};
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: 1rem;

  span {
    font-size: 1.3rem;
  }
`;

const UserFlexWrapper = styled(FlexWrapper)`
  margin-top: 0.2rem;
  align-items: center;

  .edited {
    color: ${(props) => props.theme.color.blue700};
  }
`;

export default Content;
