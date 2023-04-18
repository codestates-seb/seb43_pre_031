import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';

const ToastViewer = ({ content }) => {
  return <Viewer initialValue={content} />;
};

export default ToastViewer;
