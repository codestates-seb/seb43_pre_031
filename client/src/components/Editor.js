import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const Editor = ({ value, onEditorChange }) => {
  const outside = useRef();
  const [click, setClick] = useState(false);

  const detectOutside = (e) => {
    // 현재 이벤트를 실행한 element가 ref.current에 포함이 되지 않으면 false, 포함되거나 동일하다면 true
    // ref가 걸린 태그 외에는 외부 영역으로 판단
    if (outside.current && !outside.current.contains(e.target)) {
      setClick(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', detectOutside);
  }, [outside]);

  return (
    <OutlineFrame
      className={click && 'isFocused'}
      onClick={() => setClick(true)}
      ref={outside}
    >
      <div data-color-mode="light">
        <MDEditor
          height={300}
          value={value}
          onChange={onEditorChange}
          preview="edit"
        />
      </div>
    </OutlineFrame>
  );
};

const OutlineFrame = styled.div`
  border-radius: ${(props) => props.theme.common.borderRadius};

  &.isFocused {
    border: 1px solid ${(props) => props.theme.color.blue300};
    outline: ${(props) => props.theme.color.blue100} solid 0.4rem;
  }
`;

export default Editor;
