import { RichTextEditor, useRichTextEditor } from './editor';

import './App.css';
import './comments.css';
import { CommentsSection } from './comments';
import { useRef } from 'react';

// https://codesandbox.io/p/sandbox/tiptap-0sqm3i?file=%2Fsrc%2Fhelpers%2Fset-link.ts%3A1%2C1-24%2C1

const App = () => {
  const { editor, isEditable, setIsEditable, comments } = useRichTextEditor({
    initialValues: '<p>Hello world!</p>',
  });

  const editorRef = useRef<any>(null);

  return (
    <div className="content">
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <RichTextEditor ref={editorRef} editor={editor} comments={comments} />
        <label>
          <input
            type="checkbox"
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
            style={{ marginTop: 20 }}
          />
          Editable
        </label>
        <button
          style={{ width: 200, padding: 10, marginTop: 20, cursor: 'pointer' }}
          onClick={() => console.log(editor?.getHTML())}
        >
          Save
        </button>
      </div>
      {editor && (
        <CommentsSection
          editorRef={editorRef}
          editor={editor}
          comments={comments}
        />
      )}
    </div>
  );
};

export default App;
