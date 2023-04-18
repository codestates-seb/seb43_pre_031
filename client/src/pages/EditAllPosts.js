import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
import ToastEditor from '../components/ToastEditor';
import axios from 'axios';
import Input from '../elements/Input';
import Notice from '../elements/Notice';
import Button from '../elements/Button';

const EditAllPosts = ({ answer }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [questionContent, setQuestionContent] = useState(''); //질문 내용
  const [content, setContent] = useState(''); //답변 내용
  //   const [tags, setTags] = useState([]);

  const editTitle = (e) => {
    setTitle(e.target.value);
  };

  //수정 내용 저장(patch/put)===========
  const saveChanges = () => {
    if (answer) {
      axios
        .patch(`http://localhost:4001/answers/${id}`, {
          content: content,
        })
        .then((response) => {
          console.log(response);
          navigate(-1);
        });
    } else {
      axios
        .patch(`http://localhost:4001/questions/${id}`, {
          title: title,
          content: questionContent,
        })
        .then((response) => {
          console.log(response);
          navigate(-1);
        });
    }
  };

  useEffect(() => {
    if (answer) {
      axios.get(`http://localhost:4001/answers/${id}`).then((response) => {
        setContent(response.data.content);
      });
    } else {
      axios.get(`http://localhost:4001/questions/${id}`).then((response) => {
        setTitle(response.data.title);
        setQuestionContent(response.data.content);
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
          {questionContent && (
            <ToastEditor
              value={questionContent}
              onEditorChange={setQuestionContent}
            />
          )}
          <Input
            type="text"
            label="Tags"
            placeholder="e.g. (typescript asp.net-mvc ios)"
          />
          <Input
            type="text"
            label="Edit Summary"
            placeholder="breifly explain your changes (corrected spelling,fixed grammar, improved formatting)"
          />
        </FormWrapper>
      ) : (
        <FormWrapper>
          {/* onClick={()=>navigate(`question/${pid}`)} */}
          <p>해당 답변이 달린 게시글로 가는 링크(title)</p>
          <h1>Answer</h1>
          {content && (
            <ToastEditor value={content} onEditorChange={setContent} />
          )}
          <Input
            type="text"
            label="Edit Summary"
            placeholder="breifly explain your changes (corrected spelling,fixed grammar, improved formatting)"
          />
        </FormWrapper>
      )}
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
const FormWrapper = styled.div`
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

export default EditAllPosts;
