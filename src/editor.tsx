import { MenuBar } from './menu-bar';
import { BubbleMenu } from './bubble-menu';
import { useComments } from './comments';

import { Editor, EditorContent, Extension, useEditor } from '@tiptap/react';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import ListItem from '@tiptap/extension-list-item';
import Comments from '@sereneinserenade/tiptap-comment-extension';

import { forwardRef, useState } from 'react';

import './editor.css';

export type UseRichTextEditorTypes = {
  initialValues?: string;
};

export const useRichTextEditor = ({
  initialValues,
}: UseRichTextEditorTypes = {}) => {
  const [isEditable, setIsEditable] = useState(true);

  const extensions: Extension[] = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({}),
    Link.configure({}) as any,
    Comments.extend({ inclusive: false }).configure({
      HTMLAttributes: { class: 'tiptap-comment' },
      onCommentActivated: (commentId) => {
        commentsHook.setActiveCommentId(commentId);

        if (commentId) commentsHook.focusCommentWithActiveId(commentId);
      },
    }),
  ];

  const editor = useEditor(
    { content: initialValues, extensions, editable: isEditable },
    [initialValues, isEditable],
  );

  const commentsHook = useComments({ editor });

  return { editor, isEditable, setIsEditable, comments: commentsHook };
};

export type RichTextEditorType = {
  editor: Editor | null;
  comments: ReturnType<typeof useComments>;
};

export const RichTextEditor = forwardRef(
  ({ editor, comments }: RichTextEditorType, ref) => {
    if (!editor) {
      return null;
    }

    return (
      <>
        <div className="tiptap-editor" ref={ref as any}>
          <>
            <MenuBar editor={editor} />
            <BubbleMenu editor={editor} comments={comments} />
            <EditorContent className="tiptap-content" editor={editor} />
          </>
        </div>
      </>
    );
  },
);
