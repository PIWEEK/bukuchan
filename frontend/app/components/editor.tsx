import "./editor.css";

import { TextStyleKit } from "@tiptap/extension-text-style";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import { Markdown } from '@tiptap/markdown'
import StarterKit from "@tiptap/starter-kit";
import React from "react";

import EditorMenu from "./editor-menu";

const extensions = [TextStyleKit, StarterKit, Markdown ];


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
      <EditorMenu editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
