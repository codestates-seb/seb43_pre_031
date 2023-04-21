import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ToastEditor from '../components/Editor';
import axios from 'axios';
import Input from '../elements/Input';
import Notice from '../elements/Notice';
import Button from '../elements/Button';
import { API } from '../utils/API';
import TagInput from '../elements/TagInput';

const EditAllPosts = ({ answer }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questionContent, setQuestionContent] = useState(''); //질문 내용
  const [content, setContent] = useState(''); //답변 내용
  const [tags, setTags] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false); //필드가 비었는지 확인

  const editTitle = (e) => {
    setTitle(e.target.value);
  };

  //수정 내용 저장(patch/put)===========
  const saveChanges = () => {
    if (answer) {
      if (content === '') {
        setIsEmpty(true);
        return;
      }
      axios
        .patch(`${API}/answers/${id}`, {
          content: content,
        })
        .then((response) => {
          console.log(response);
          navigate(-1);
        });
    } else {
      if (title === '' || questionContent === '' || tags.length === 0) {
        setIsEmpty(true);
        return;
      }
      axios
        .patch(`${API}/questions/${id}`, {
          title: title,
          content: questionContent,
          tags: tags,
        })
        .then((response) => {
          console.log(response);
          navigate(-1);
        });
    }
  };

  useEffect(() => {
    if (answer) {
      axios.get(`${API}/answers/${id}`).then((response) => {
        setContent(response.data.content);
      });
    } else {
      axios.get(`${API}/questions/${id}`).then((response) => {
        setTitle(response.data.title);
        setQuestionContent(response.data.content);
        setTags(response.data.tags);
      });
    }
  }, []);

  return (
    <Container>
      <Notice>
        <p>Your edit will be placed in a queue until it is peer reviewed.</p>
        <div>
          We welcome edits that make the post easier to understand and more
          valuable for readers. Because community members review edits, please
          try to make the post substantially better than how you found it, for
          example, by fixing grammar or adding additional resources and
          hyperlinks.
        </div>
      </Notice>
      {!answer ? (
        <FormWrapper>
          <Input
            type="text"
            label="Title"
            placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
            value={title}
            onChange={editTitle}
          />
          <ToastEditor
            value={questionContent}
            onEditorChange={setQuestionContent}
          />
          <TagInput tags={tags} setTags={setTags} />
        </FormWrapper>
      ) : (
        <FormWrapper>
          {/* onClick={()=>navigate(`question/${pid}`)} */}
          <p>해당 답변이 달린 게시글로 가는 링크(title)</p>
          <h1>Answer</h1>
          <ToastEditor value={content} onEditorChange={setContent} />
        </FormWrapper>
      )}
      {isEmpty && <Warning>body is missing.</Warning>}
      <div className="buttons">
        <Button text="Edit Changes" onClick={saveChanges} />
        <Button text="Cancel" onClick={() => navigate(-1)} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .buttons {
    display: flex;
    gap: 1rem;
  }
`;
const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;

  h1 {
    font-size: 2rem;
  }
  p {
    font-size: 1.8rem;
    color: ${(props) => props.theme.color.blue700};
    cursor: pointer;
  }
`;

const Warning = styled.p`
  color: ${(props) => props.theme.color.red700};
  font-weight: 800;
`;

export default EditAllPosts;
