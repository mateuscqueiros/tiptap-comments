import { Editor } from '@tiptap/react';
import {
  RiBold,
  RiCodeBlock,
  RiCodeFill,
  RiFormatClear,
  RiH1,
  RiH2,
  RiH3,
  RiH4,
  RiH5,
  RiH6,
  RiItalic,
  RiListCheck,
  RiListOrdered,
  RiParagraph,
  RiStrikethrough,
  RiSeparator,
  RiTextWrap,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiLink,
  RiLinkUnlink,
} from '@remixicon/react';
import classNames from 'classnames';
import { setLink } from './helpers/set-link';
import { useInView } from 'react-cool-inview';

export const MenuBar = ({ editor }: { editor: Editor }) => {
  const { observe, inView } = useInView({
    rootMargin: '-1px 0px 0px 0px',
    threshold: [1],
  });

  if (!editor) {
    return null;
  }

  const isCursorOverLink = editor.getAttributes('link').href;
  const iconProps = { size: 20, color: '#555555' };

  return (
    <div
      className={classNames('tiptap-control-group', { sticky: !inView })}
      ref={observe}
    >
      <div className="tiptap-button-group">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <RiBold {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <RiItalic {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <RiStrikethrough {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <RiCodeFill {...iconProps} />
        </button>
        <div className="divider" />
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          <RiH1 {...iconProps} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          <RiH2 {...iconProps} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          <RiH3 {...iconProps} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          <RiH4 {...iconProps} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          <RiH5 {...iconProps} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          <RiH6 {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <RiListCheck {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <RiListOrdered {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <RiCodeBlock {...iconProps} />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          <RiParagraph {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <RiSeparator {...iconProps} />
        </button>
        <div className="divider" />
        <button onClick={() => setLink(editor)}>
          <RiLink {...iconProps} />
        </button>
        <button
          className={classNames({ disabled: !isCursorOverLink })}
          onClick={() =>
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
          }
        >
          <RiLinkUnlink
            fillOpacity={isCursorOverLink ? 1 : 0.5}
            {...iconProps}
          />
        </button>
        <div className="divider" />
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <RiTextWrap {...iconProps} />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <RiFormatClear {...iconProps} />
        </button>
        <div className="divider" />
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <RiArrowGoBackLine {...iconProps} />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <RiArrowGoForwardLine {...iconProps} />
        </button>
      </div>
    </div>
  );
};
