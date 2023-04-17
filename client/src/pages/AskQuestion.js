import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '@toast-ui/editor/dist/toastui-editor.css';
import ToastEditor from '../components/ToastEditor';
import axios from 'axios';
import Card from '../elements/Card';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Notice from '../elements/Notice';
import { GiPencil } from 'react-icons/gi';

const AskQuestion = () => {
  const navigate = useNavigate();

  const steps = [
    { id: 1, step: 'Summarize your problem in a one-line title.' },
    { id: 2, step: 'Describe your problem in more detail.' },
    { id: 3, step: 'Describe what you tried and what you expected to happen.' },
    {
      id: 4,
      step: 'Add “tags” which help surface your question to members of the community.',
    },
    { id: 5, step: 'Review your question and post it to the site.' },
  ];

  const outside = useRef();
  const secondoutside = useRef();
  const [click, setClick] = useState(false);
  const [secondclick, setSecondClick] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [attempt, setAttempt] = useState('');

  const detectOutside = (e) => {
    // 현재 이벤트를 실행한 element가 ref.current에 포함이 되지 않으면 false, 포함되거나 동일하다면 true
    // ref가 걸린 태그 외에는 외부 영역으로 판단
    if (outside.current && !outside.current.contains(e.target)) {
      setClick(false);
    }
  };
  const detectSecondOutside = (e) => {
    if (secondoutside.current && !secondoutside.current.contains(e.target)) {
      setSecondClick(false);
    }
  };

  const postQuestion = () => {
    axios
      .post(`http://localhost:4001/questions`, {
        title: title,
        content: content,
        tags: ['dummy', 'tags'],
        vote: 0,
        asked: '1 min ago',
        viewed: 1,
        modified: 'never',
        edited: 'never',
        answer_count: 0,
        author: {
          username: 'idx123',
          userimage: 'https://randomuser.me/api/portraits/thumb/men/100.jpg',
        },
      })
      .then((response) => {
        console.log(response);
        navigate(-1);
      });
  };

  useEffect(() => {
    document.addEventListener('mousedown', detectOutside);
    document.addEventListener('mousedown', detectSecondOutside);
  }, [outside, secondoutside]);

  return (
    <Container>
      <h1>Ask a public question</h1>
      <Notice color="blue">
        <h1>Writing a good question</h1>
        <p>
          You’re ready to <span>ask</span>a{' '}
          <span>programming-related question</span> and this form will help
          guide you through the process.
        </p>
        <p>
          Looking to ask a non-programming question? See{' '}
          <span>the topics here</span> to find a relevant site.
        </p>
        <h2>steps</h2>
        <ul>
          {steps.map((i) => (
            <Step key={i.id}>{i.step}</Step>
          ))}
        </ul>
      </Notice>
      <Notice tip title="Writing a good title">
        <Flexbox>
          <GiPencil size="4.2rem" />
          <div>
            <p>Your title should summarize the problem.</p>
            <p>
              You might find that you have a better idea of your title after
              writing out the rest of the question.
            </p>
          </div>
        </Flexbox>
      </Notice>

      <Card
        title="Title"
        description="Be specific and imagine you’re asking a question to another person."
      >
        <Input
          type="text"
          placeholder="e.g. Is there an R function for finding the index of an element in a vector?"
          onChange={(e) => setTitle(e.target.value)}
        />
      </Card>

      <Notice tip title="Introduce the problem">
        <Flexbox>
          <GiPencil size="4.2rem" />
          <p>
            Explain how you encountered the problem you’re trying to solve, and
            any difficulties that have prevented you from solving it yourself.
          </p>
        </Flexbox>
      </Notice>
      <Card
        title="What are the details of your problem?"
        description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
      >
        <OutlineFrame
          className={click && 'isFocused'}
          onClick={() => setClick(true)}
          ref={outside}
        >
          <ToastEditor value={content} onEditorChange={setContent} />
        </OutlineFrame>
      </Card>
      <Card
        title="What did you try and what were you expecting?"
        description="Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters."
      >
        <OutlineFrame
          className={secondclick && 'isFocused'}
          onClick={() => setSecondClick(true)}
          ref={secondoutside}
        >
          <ToastEditor value={attempt} onEditorChange={setAttempt} />
        </OutlineFrame>
      </Card>
      <Card
        title="Tags"
        description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
      >
        <Input type="text" placeholder="e.g. (typescript asp.net-mvc ios)" />
        <Button text="Next" onClick={postQuestion} />
      </Card>
      <div>
        <Button discard text="Discard draft" onClick={() => navigate(`/`)} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;

  h1 {
    font-size: 2.4rem;
  }
  p {
    font-size: 1.4rem;
  }
`;

const Step = styled.li`
  margin-left: 2rem;
  font-size: 1.4rem;
`;

const OutlineFrame = styled.div`
  border-radius: ${(props) => props.theme.common.borderRadius};

  &.isFocused {
    border: 1px solid ${(props) => props.theme.color.blue300};
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;

const Flexbox = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
`;

export default AskQuestion;
