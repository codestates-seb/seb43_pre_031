import MDEditor from '@uiw/react-md-editor';

const Viewer = ({ content }) => {
  return (
    <div className="viewer-wrapper" data-color-mode="light">
      <MDEditor.Markdown source={content} />
    </div>
  );
};

export default Viewer;
