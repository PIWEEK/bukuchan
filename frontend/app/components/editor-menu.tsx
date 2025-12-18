import type { Editor } from "@tiptap/react";
import * as icons from "lucide-react";
import { useEditorState } from "@tiptap/react";
import { Button } from "~/ui";
import classNames from 'classnames';

const ICON_SIZE = 16;

const buttonCommon = "px-1.5 rounded h-8 cursor-pointer hover:bg-base-200";
const buttonActive = "bg-base-400 text-white";

export default ({ editor }: { editor: Editor }) => {
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
    <div className="flex gap-1 mb-8 flex-wrap bg-base-100 p-1 rounded">
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBold().run()}
        isDisabled={!editorState.canBold}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isBold}
        )}
      >
        <icons.Bold size={ICON_SIZE} />
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isDisabled={!editorState.canItalic}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isItalic}
        )}
      >
        <icons.Italic size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isDisabled={!editorState.canStrike}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isStrike}
        )}
      >
        <icons.Strikethrough size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleCode().run()}
        isDisabled={!editorState.canCode}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isCode}
        )}
      >
        <icons.Code size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run();
          editor.chain().focus().clearNodes().run();
        }}
        className={buttonCommon}>
        <icons.RemoveFormatting size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isHeading1}
        )}
      >
        <icons.Heading1 size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isHeading2}
        )}
      >
        <icons.Heading2 size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isHeading3}
        )}
      >
        <icons.Heading3 size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isBulletList}
        )}
      >
        <icons.List size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isOrderedList}
        )}
      >
        <icons.ListOrdered size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={classNames(
          buttonCommon,
          { [buttonActive]: editorState.isBlockquote}
        )}
      >
        <icons.Quote size={ICON_SIZE}/>
      </Button>
      <Button
        variant="secondary"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        className={buttonCommon}>
        <icons.Rows2 size={ICON_SIZE}/>
      </Button>
    </div>
  );
}
