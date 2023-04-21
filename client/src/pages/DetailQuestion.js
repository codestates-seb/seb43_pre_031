import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Content from '../elements/Content';
import Question from '../components/Question';
import Editor from '../components/Editor';
import Button from '../elements/Button';
import Notice from '../elements/Notice';
import { API } from '../utils/API';

const DetailQuestion = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [myAnswer, setMyAnswer] = useState('');
  const [call, setCall] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  //질문 & 답변 불러오기(GET) ========================================================================
  const getContents = async () => {
    await axios
      .all([
        axios.get(`${API}/questions/${id}`),
        axios.get(`${API}/answers`),
        //question의 id(20230415111301)를 쿼리로 받아서 해당 질문에 달린 답변들을 가져오도록 해야함
      ])
      .then(
        axios.spread((res1, res2) => {
          setQuestion(res1.data);
          setAnswers(res2.data);
        })
      );
  };

  //답변 추가(POST) ===============================================================================
  const postAnswer = () => {
    const user = {
      username: 'idx123',
      userimage: 'https://randomuser.me/api/portraits/thumb/women/3.jpg',
    };
    const date = 'Apr 17, 2023 at 22:36';

    if (myAnswer === '' || undefined) {
      setIsEmpty(true);
      return;
    }
    axios
      .post(`${API}/answers`, {
        content: myAnswer,
        user: user,
        answered: date,
      })
      .then((response) => {
        console.log(response);
        setAnswers([...answers, myAnswer]);
        setMyAnswer('');
        setCall(!call);
      });
  };

  //수정 위해 이동(PUT) ===============================================================================
  const moveForEdit = (id, type) => {
    //1. 수정 하려는 글에 대한 정보를 인자로 넘김 (api를 한번이라도 덜 호출)
    //2. 페이지 이동 후 해당 글에 대한 api를 호출 (코드가 상대적으로 간략해짐) --> 일단 채택
    if (type === 'question') {
      navigate(`/question/editq/${id}`);
    } else {
      navigate(`/question/edita/${id}`);
    }
  };

  //질문 삭제(DELETE) ===============================================================================
  const deleteQuestion = (id) => {
    axios.delete(`${API}/questions/${id}`).then((response) => {
      console.log(response);
      navigate('/');
    });
  };
  //답변 삭제(DELETE) ===============================================================================
  const deleteAnswer = (id) => {
    axios.delete(`${API}/answers/${id}`).then((response) => {
      console.log(response);
      setAnswers(answers.filter((i) => i.id !== id));
      setCall(!call);
    });
  };

  useEffect(() => {
    getContents();
  }, [call]);

  return (
    <Container>
      <Question
        title={question.title}
        asked={question.asked}
        modified={question.modified}
        viewed={question.viewed}
        content={question.content}
        vote={question.vote}
        user={question.author}
        tags={question.tags}
        deleteQuestion={() => deleteQuestion(question.id)}
        editQuestion={() => moveForEdit(question.id, 'question')}
      />
      <h2>{question.answer_count} Answers</h2>
      <div>
        {answers &&
          answers.map((i) => (
            <Content
              key={i.id}
              type="answer"
              content={i.content}
              date={i.answered}
              user={i.user}
              deleteContent={() => deleteAnswer(i.id)}
              editContent={() => moveForEdit(i.id, 'answer')}
            />
          ))}
      </div>

      <p id="people">
        Know someone who can answer? Share a link to this{' '}
        <span className="highlight">question</span> via{' '}
        <span className="highlight">email, Twitter,</span> or{' '}
        <span className="highlight">Facebook.</span>
      </p>

      <h2>Your Answer</h2>
      <Editor value={myAnswer} onEditorChange={setMyAnswer} />
      {myAnswer === '' && isEmpty && (
        <Warning>
          Your answer couldnt be submitted. Please see the error above.
        </Warning>
      )}
      <div className="btn-margin">
        <Button text="Post Your Answer" onClick={postAnswer} />
      </div>

      <Notice>
        <p>Thanks for contributing an answer to Stack Overflow!</p>
        <li>
          Please be sure to answer the question. Provide details and share your
          research!
        </li>
        <p>But avoid …</p>
        <li>Asking for help, clarification, or responding to other answers.</li>
        <li>
          Making statements based on opinion; back them up with references or
          personal experience.
        </li>
        <p>
          To learn more, see our{' '}
          <span className="highlight">tips on writing great answers.</span>
        </p>
      </Notice>
    </Container>
  );
};

const Container = styled.div`
  padding: 2rem;
  margin-top: 6rem;
  h2 {
    font-size: 2.2rem;
    font-weight: 500;
    margin-bottom: 2rem;
  }
  #people {
    font-size: 1.6rem;
    margin-bottom: 1.6rem;
  }
  span {
    cursor: pointer;
  }
  .highlight {
    color: ${(props) => props.theme.color.blue600};
  }
  span.highlight:hover {
    color: ${(props) => props.theme.color.blue500};
  }
  .btn-margin {
    margin: 1rem 0;
  }
`;

const Warning = styled.p`
  color: ${(props) => props.theme.color.red700};
  font-size: 1.3rem;
  font-weight: 800;
  margin: 1.6rem 0;
`;

export default DetailQuestion;
