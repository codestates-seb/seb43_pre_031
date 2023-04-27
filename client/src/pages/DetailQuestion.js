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
import { getCookie } from '../lib/Cookies';

const DetailQuestion = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState({});
  const [answers, setAnswers] = useState([]);
  const [myAnswer, setMyAnswer] = useState('');
  const [isEmpty, setIsEmpty] = useState(false);

  //로그인한 상태의 유저인지 확인
  const checkUser = () => {
    if (getCookie('accessToken') === undefined) {
      navigate('/users/login');
      return true;
    }
    return false;
  };

  //질문 & 답변 불러오기(GET) ========================================================================
  const getContents = async () => {
    await axios.get(`${API}/questions/${id}`).then((response) => {
      setQuestion(response.data);
      setAnswers(response.data.answers);
    });
  };

  //답변 추가(POST) ===============================================================================
  const postAnswer = () => {
    if (checkUser()) {
      if (myAnswer === '') {
        setIsEmpty(true);
        return;
      }
      axios
        .post(
          `${API}/answers`,
          {
            question_id: id,
            content: myAnswer,
          },
          {
            headers: {
              Authorization: `Bearer ${getCookie('accessToken')}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          setAnswers([...answers, myAnswer]);
          setMyAnswer('');
        });
    }
  };

  //수정 위해 이동 ===============================================================================
  const moveForEdit = (id, type) => {
    if (!checkUser()) {
      if (type === 'question') {
        navigate(`/question/editq/${id}`);
      } else {
        navigate(`/question/edita/${id}`);
      }
    }
  };

  //질문 삭제(DELETE) ===============================================================================
  const deleteQuestion = (id) => {
    if (!checkUser()) {
      axios
        .delete(`${API}/questions/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then((response) => {
          console.log(response);
          navigate('/');
        })
        .catch(() => {
          alert('질문 삭제 권한이 없습니다.');
        });
    }
  };
  //답변 삭제(DELETE) ===============================================================================
  const deleteAnswer = (id) => {
    if (!checkUser()) {
      axios
        .delete(`${API}/answers/${id}`, {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        })
        .then((response) => {
          console.log(response);
          setAnswers(answers.filter((i) => i.id !== id));
        })
        .catch(() => {
          alert('답변 삭제 권한이 없습니다.');
        });
    }
  };

  useEffect(() => {
    getContents();
  }, [answers.length]);

  return (
    <Container>
      <Question
        title={question.title}
        asked={question.asked_at}
        modified={question.modified_at}
        content={question.content}
        user={question.member}
        tags={question.tags}
        deleteQuestion={() => deleteQuestion(question.id)}
        editQuestion={() => moveForEdit(question.id, 'question')}
      />
      <h2>{answers.length} Answers</h2>
      <div>
        {answers &&
          answers.map((i) => (
            <Content
              key={i.id}
              type="answer"
              content={i.content}
              date={i.created_at}
              user={i.memberName}
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
  width: 100%;
  /* height: 200vh; */
  min-height: 100%;
  padding: 2rem;
  margin-top: 6rem;
  margin-left: 18rem;
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
