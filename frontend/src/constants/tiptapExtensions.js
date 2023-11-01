import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from '@tiptap/extension-text-align';
import CharacterCount from '@tiptap/extension-character-count';
// import Dropcursor from '@tiptap/extension-dropcursor';
import Focus from '@tiptap/extension-focus';
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript'
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
// import { lowlight }  from "lowlight";
// import lowlight from "lowlight"
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import { common,createLowlight} from 'lowlight'

const lowlight = createLowlight(common)

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

export const extensions = [
  FontFamily,
  Underline,
  Subscript,
  Superscript,
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  CharacterCount.configure({ type: [TextStyle.name] }),
  TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
  Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
];