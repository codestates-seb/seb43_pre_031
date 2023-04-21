import styled from 'styled-components';

const Pagination = ({ postPerPage, totalQuestions, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalQuestions / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <QuestionUl>
        {pageNumbers.map((number) => (
          <QuestionLi key={number}>
            <QuestionSpan
              onClick={() => {
                paginate(number);
                console.log(number);
              }}
            >
              {number}
            </QuestionSpan>
          </QuestionLi>
        ))}
      </QuestionUl>
    </nav>
  );
};

export default Pagination;

const QuestionUl = styled.ul`
  position: absolute;
  bottom: 5%;
  left: 5%;
  list-style: none;
  text-align: center;
  border-radius: 3px;
  padding: 1px;
`;

const QuestionLi = styled.li`
  border: 1px solid ${(props) => props.theme.color.black200};
  display: inline-block;
  font-size: 17px;
  font-weight: 600;
  padding: 5px;
  border-radius: 5px;
  width: 3rem;
  margin-right: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.black100};
  }
  &:focus {
    color: white;
    background-color: ${(props) => props.theme.color.orange100};
  }
`;

const QuestionSpan = styled.span``;
