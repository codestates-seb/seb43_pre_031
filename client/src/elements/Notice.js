import styled, { css } from 'styled-components';

const Notice = (props) => {
  const { title, tip, color, children } = props;
  if (tip) {
    return (
      <NoticeTipWrapper>
        <div>
          <h2>{title}</h2>
        </div>

        <div>{children}</div>
      </NoticeTipWrapper>
    );
  }

  return <NoticeWrapper color={color}>{children}</NoticeWrapper>;
};

const NoticeTipWrapper = styled.div`
  background-color: white;
  border-radius: ${(props) => props.theme.common.borderRadius};
  border: 1px solid ${(props) => props.theme.color.black075};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  color: ${(props) => props.theme.color.black800};

  > div {
    padding: 1.2rem;
  }

  > div:first-child {
    padding: 1.2rem;
    background-color: ${(props) => props.theme.color.black050};
    border-bottom: 1px solid ${(props) => props.theme.color.black075};
  }

  h2 {
    color: ${(props) => props.theme.color.black900};
    font-weight: 400;
  }
  p {
    color: ${(props) => props.theme.color.black700};
  }
`;

const NoticeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.2rem;
  border-radius: ${(props) => props.theme.common.borderRadius};
  background-color: ${(props) => props.theme.color.yellow050};
  border: 1px solid ${(props) => props.theme.color.yellow200};
  color: ${(props) => props.theme.color.black800};
  font-size: 1.3rem;

  ${(props) =>
    props.color &&
    css`
      background-color: ${(props) => props.theme.color.blue050};
      border: 1px solid ${(props) => props.theme.color.blue300};
    `}
`;

export default Notice;
