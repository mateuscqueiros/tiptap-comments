import { RiChatNewLine } from '@remixicon/react';
import { Editor, BubbleMenu as TiptapBubbleMenu } from '@tiptap/react';
import { useComments } from './comments';

export type BubbleMenuType = {
  editor: Editor;
  comments: ReturnType<typeof useComments>;
};

export function BubbleMenu({ editor, comments }: BubbleMenuType) {
  const iconProps = { size: 18, color: '#555555' };
  return (
    <TiptapBubbleMenu editor={editor}>
      <div className="bubble-menu">
        <button onClick={comments.setComment}>
          <RiChatNewLine {...iconProps} />
        </button>
      </div>
    </TiptapBubbleMenu>
  );
}
