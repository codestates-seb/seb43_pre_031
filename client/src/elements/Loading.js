import styled, { keyframes } from 'styled-components';

const Loading = () => {
  return <LoadingSpinner></LoadingSpinner>;
};

const rotate = keyframes`
    0%{ transform: rotate(0deg)};
    100%{transform: rotate(360deg)};
`;

const LoadingSpinner = styled.div`
  width: 5rem;
  height: 5rem;
  border: 6px solid ${(props) => props.theme.color.orange100};
  border-bottom-color: ${(props) => props.theme.color.orange400};
  border-radius: 50%;
  display: inline-block;
  animation: ${rotate} 1s linear infinite;
`;

export default Loading;
