import { Editor } from '@tiptap/react';
import { useRef, useState } from 'react';
import { v4 } from 'uuid';

import './comments.css';

export type Comment = {
  id: string;
  content: string;
  replies: Comment[];
  createdAt: Date;
};

export type UseCommentsTypes = {
  editor: Editor | null;
};

export function useComments({ editor }: UseCommentsTypes) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<string | null>(null);
  const commentsSectionRef = useRef<HTMLDivElement | null>(null);

  const getNewComment = (content: string): Comment => {
    return {
      id: `a${v4()}a`,
      content,
      replies: [],
      createdAt: new Date(),
    };
  };

  const focusCommentWithActiveId = (id: string) => {
    if (!commentsSectionRef.current) return;

    const commentInput =
      commentsSectionRef.current.querySelector<HTMLInputElement>(`input#${id}`);

    if (!commentInput) return;

    commentInput.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center',
    });
  };

  const setComment = () => {
    const newComment = getNewComment('');

    setComments([...comments, newComment]);

    editor?.commands.setComment(newComment.id);

    setActiveCommentId(newComment.id);

    setTimeout(focusCommentWithActiveId);
  };

  return {
    getNewComment,
    setComment,
    commentsSectionRef,
    comments,
    setComments,
    activeCommentId,
    setActiveCommentId,
    focusCommentWithActiveId,
  };
}

export type CommentsSectionType = {
  editor: Editor;
  comments: ReturnType<typeof useComments>;
  editorRef: React.RefObject<any>;
};

export function CommentsSection({
  editor,
  comments,
  editorRef,
}: CommentsSectionType) {
  const { commentsSectionRef } = comments;

  const editorElement = editorRef.current;

  const {
    comments: commentsData,
    activeCommentId,
    setActiveCommentId,
    setComments,
  } = comments;

  const focusCommentElement = (id: string) => {
    const element = document.querySelector(
      `[data-comment-id="${id}"]`,
    ) as HTMLElement;
    if (!element) return;
    const elementPosition = element.offsetTop;

    // TODO: scroll element not window
    editorElement.scrollTo({
      top: elementPosition,
      behavior: 'smooth',
    });
  };

  return (
    <section className="tiptap-comments-section" ref={commentsSectionRef}>
      <div className="comments-container">
        {commentsData.length ? (
          commentsData.map((comment) => (
            <div
              className="comment"
              key={comment.id}
              onClick={() => focusCommentElement(comment.id)}
            >
              <span className="info">
                <span className="author">sereneinserenade</span>

                <span className="date">
                  {comment.createdAt.toLocaleDateString()}
                </span>
              </span>

              {comment.id === activeCommentId && (
                <input
                  value={comment.content || ''}
                  id={comment.id}
                  onInput={(event) => {
                    const value = (event.target as HTMLInputElement).value;

                    setComments(
                      commentsData.map((comment) => {
                        if (comment.id === activeCommentId) {
                          return {
                            ...comment,
                            content: value,
                          };
                        }

                        return comment;
                      }),
                    );
                  }}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter') return;

                    setActiveCommentId(null);
                  }}
                />
              )}

              {comment.id !== activeCommentId && (
                <span className="comment-content">{comment.content}</span>
              )}

              {comment.id === activeCommentId && (
                <button
                  className="save-btn"
                  onClick={() => {
                    setActiveCommentId(null);
                    editor.commands.focus();
                  }}
                >
                  Save
                </button>
              )}
            </div>
          ))
        ) : (
          <span>No comments yet</span>
        )}
      </div>
    </section>
  );
}
