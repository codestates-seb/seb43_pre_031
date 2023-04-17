import { useRef } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const ToastEditor = ({ value, onEditorChange }) => {
  const editorRef = useRef();

  const onChangeValue = () => {
    if (editorRef.current) {
      onEditorChange(() => editorRef.current.getInstance().getMarkdown());
    }
  };

  return (
    <div>
      <Editor
        ref={editorRef} // DOM 선택용 useRef
        previewStyle="horizontal"
        height="300px"
        initialValue={value || ''}
        initialEditType="markdown"
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'image', 'link'],
          ['code', 'codeblock'],
        ]}
        useCommandShortcut={false}
        onChange={onChangeValue}
      />
    </div>
  );
};
export default ToastEditor;
