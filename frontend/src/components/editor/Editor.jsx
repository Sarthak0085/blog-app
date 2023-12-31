/* eslint-disable react/prop-types */
import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }) => {
    const editor = useEditor({
        editable,
        content: content,
        extensions: extensions,
        autofocus: true,
        editorProps: {
            attributes: {
                className:
                    "!prose !dark:prose-invert prose-sm sm:prose-base  max-w-none mt-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
            },
        },
        onUpdate: ({ editor }) => {
            const json = editor.getJSON();
            onDataChange(json);
        },
    });

    return (
        <div className="w-full relative">
            {editable && <MenuBar editor={editor} />}
            <EditorContent editor={editor} />
        </div>
    );
};

export default Editor;