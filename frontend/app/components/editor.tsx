import "./editor.css";

import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import { Markdown } from '@tiptap/markdown'
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import * as icons from "lucide-react";

const extensions = [TextStyleKit, StarterKit, Markdown ];

function MenuBar({ editor }: { editor: Editor }) {
  // Read the current editor's state, and re-render the component when it changes
  const editorState = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        isBold: ctx.editor?.isActive("bold") ?? false,
        canBold: ctx.editor?.can().chain().toggleBold().run() ?? false,
        isItalic: ctx.editor?.isActive("italic") ?? false,
        canItalic: ctx.editor?.can().chain().toggleItalic().run() ?? false,
        isStrike: ctx.editor?.isActive("strike") ?? false,
        canStrike: ctx.editor?.can().chain().toggleStrike().run() ?? false,
        isCode: ctx.editor?.isActive("code") ?? false,
        canCode: ctx.editor?.can().chain().toggleCode().run() ?? false,
        canClearMarks: ctx.editor?.can().chain().unsetAllMarks().run() ?? false,
        isParagraph: ctx.editor?.isActive("paragraph") ?? false,
        isHeading1: ctx.editor?.isActive("heading", { level: 1 }) ?? false,
        isHeading2: ctx.editor?.isActive("heading", { level: 2 }) ?? false,
        isHeading3: ctx.editor?.isActive("heading", { level: 3 }) ?? false,
        isHeading4: ctx.editor?.isActive("heading", { level: 4 }) ?? false,
        isHeading5: ctx.editor?.isActive("heading", { level: 5 }) ?? false,
        isHeading6: ctx.editor?.isActive("heading", { level: 6 }) ?? false,
        isBulletList: ctx.editor?.isActive("bulletList") ?? false,
        isOrderedList: ctx.editor?.isActive("orderedList") ?? false,
        isCodeBlock: ctx.editor?.isActive("codeBlock") ?? false,
        isBlockquote: ctx.editor?.isActive("blockquote") ?? false,
        canUndo: ctx.editor?.can().chain().undo().run() ?? false,
        canRedo: ctx.editor?.can().chain().redo().run() ?? false,
      };
    },
  });

  return (
    <div className="flex gap-2 mb-8 flex-wrap">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editorState.canBold}
        className={editorState.isBold ? "is-active" : ""}
      >
        <icons.Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editorState.canItalic}
        className={editorState.isItalic ? "is-active" : ""}
      >
        <icons.Italic />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editorState.canStrike}
        className={editorState.isStrike ? "is-active" : ""}
      >
        <icons.Strikethrough/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editorState.canCode}
        className={editorState.isCode ? "is-active" : ""}
      >
        <icons.Code/>
      </button>
      <button onClick={() => {
        editor.chain().focus().unsetAllMarks().run();
        editor.chain().focus().clearNodes().run();
      }}>
        <icons.RemoveFormatting/>
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editorState.isParagraph ? "is-active" : ""}
      >
        Paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editorState.isHeading1 ? "is-active" : ""}
      >
        <icons.Heading1/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editorState.isHeading2 ? "is-active" : ""}
      >
        <icons.Heading2/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editorState.isHeading3 ? "is-active" : ""}
      >
        <icons.Heading3/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editorState.isBulletList ? "is-active" : ""}
      >
        <icons.List/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editorState.isOrderedList ? "is-active" : ""}
      >
        <icons.ListOrdered/>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editorState.isBlockquote ? "is-active" : ""}
      >
        <icons.Quote/>
      </button>
      <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <icons.Rows2/>
      </button>
    </div>
  );
}

export default ({content, onContentChange}) => {
  const editor = useEditor({
    immediatelyRender: false,
    extensions,
    editorProps: {
      attributes: {
        class: "h-full w-full p-8 bg-white shadow-md",
      },
    },

    onUpdate({ editor }) {
      onContentChange(editor.getMarkdown());
    },

    content,
    contentType: 'markdown', // parse initial content as Markdown
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="editor">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
