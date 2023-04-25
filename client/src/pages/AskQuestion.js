import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Editor from '../components/Editor';
import axios from 'axios';
import Card from '../elements/Card';
import Input from '../elements/Input';
import Button from '../elements/Button';
import Notice from '../elements/Notice';
import { GiPencil } from 'react-icons/gi';
import { API } from '../utils/API';
import TagInput from '../elements/TagInput';

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

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false); //필드가 비었는지 확인

  const postQuestion = () => {
    if (title !== '' && content !== '' && tags.length !== 0) {
      setIsEmpty(false);
      axios
        .post(`${API}/questions`, {
          title: title,
          content: content,
          tags: tags,
          asked_at: '2023-04-25',
          member: '홍길동1',
        })
        .then((response) => {
          console.log(response);
          navigate('/');
        });
    } else {
      setIsEmpty(true);
    }
  };

  //모든 입력값 초기화
  const discardDraft = () => {
    setTitle('');
    setContent(() => '');
    setTags([]);
  };

  return (
    <Container>
      <h1>Ask a public question</h1>
      <Notice color="blue">
        <h1>Writing a good question</h1>
        <p>
          You’re ready to <span className="highlight">ask</span>a{' '}
          <span className="highlight">programming-related question</span> and
          this form will help guide you through the process.
        </p>
        <p>
          Looking to ask a non-programming question? See{' '}
          <span className="highlight">the topics here</span> to find a relevant
          site.
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
          value={title}
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
        <Editor value={content} onEditorChange={setContent} />
      </Card>
      <Card
        title="Tags"
        description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
      >
        <TagInput tags={tags} setTags={setTags} />
      </Card>
      {isEmpty && <Warning>body is missing.</Warning>}
      <div className="buttons">
        <Button text="Post Your Question" onClick={postQuestion} />
        <Button discard text="Discard draft" onClick={discardDraft} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2rem;
  margin: 0 auto;
  margin-top: 6rem;
  padding-bottom: 40rem;

  h1 {
    font-size: 2.4rem;
    margin: 2rem 0;
  }
  p {
    font-size: 1.4rem;
  }
  .highlight {
    color: ${(props) => props.theme.color.blue600};
  }
  .buttons {
    button:first-child {
      margin-right: 1rem;
    }
  }
`;

const Step = styled.li`
  margin-left: 2rem;
  font-size: 1.4rem;
`;

const Flexbox = styled.div`
  display: flex;
  gap: 2rem;
  padding: 0.5rem;
`;

const Warning = styled.p`
  color: ${(props) => props.theme.color.red700};
  font-weight: 800;
`;

export default AskQuestion;
