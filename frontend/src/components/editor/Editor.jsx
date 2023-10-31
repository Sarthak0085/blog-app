/* eslint-disable react/prop-types */
import { EditorContent, useEditor } from "@tiptap/react";
import "highlight.js/styles/atom-one-dark.css";
import MenuBar from "./MenuBar";
import CharacterCount from '@tiptap/extension-character-count'
// import Paragraph from '@tiptap/extension-paragraph'
// import Text from '@tiptap/extension-text'
// // import TextAlign from '@tiptap/extension-text-align'
// import Heading from '@tiptap/extension-heading'
import { extensions } from "../../constants/tiptapExtensions";

const Editor = ({ onDataChange, content, editable }) => {
    const editor = useEditor({
        editable,
        content: content,
        extensions: extensions,
        // extensions: [
        //     Document,
        //     Paragraph,
        //     Text,
        //     Heading,
        // ],
        editorProps: {
            attributes: {
                class:
                    "prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg max-w-none m-5 focus:outline-none prose-pre:bg-[#282c34] prose-pre:text-[#abb2bf]",
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