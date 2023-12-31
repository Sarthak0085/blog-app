/* eslint-disable react/prop-types */
import {
    AiOutlineAlignCenter,
    AiOutlineAlignLeft,
    AiOutlineAlignRight,
    AiOutlineBold,
    AiOutlineClose,
    AiOutlineEnter,
    AiOutlineItalic,
    AiOutlineOrderedList,
    AiOutlineRedo,
    AiOutlineStrikethrough,
    AiOutlineUnderline,
    AiOutlineUndo,
    AiOutlineUnorderedList,
} from "react-icons/ai";
import { BiParagraph } from "react-icons/bi";
import { FaSubscript, FaSuperscript } from "react-icons/fa";
import { FiCode } from "react-icons/fi";
import { GiPlainCircle } from "react-icons/gi";
import { MdOutlineLayersClear } from "react-icons/md";
import { PiCodeBlock, PiQuotes } from "react-icons/pi";
import { TbSpacingVertical } from "react-icons/tb";

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className="border border-slate-300 bg-white rounded-lg p-5 sticky top-3 left-0 right-0  z-10 ">
            <div className="flex gap-2 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`editor-btn font-black ${editor.isActive("heading", { level: 1 }) && "active-editor-btn"
                        }`}
                >
                    H1
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`editor-btn font-extrabold ${editor.isActive("heading", { level: 2 }) && "active-editor-btn"
                        }`}
                >
                    H2
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={`editor-btn font-semibold ${editor.isActive("heading", { level: 3 }) && "active-editor-btn"
                        }`}
                >
                    H3
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={`editor-btn font-medium ${editor.isActive("heading", { level: 4 }) && "active-editor-btn"
                        }`}
                >
                    H4
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={`editor-btn font-normal ${editor.isActive("heading", { level: 5 }) && "active-editor-btn"
                        }`}
                >
                    H5
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={`editor-btn font-normal ${editor.isActive("heading", { level: 6 }) && "active-editor-btn"
                        }`}
                >
                    H6
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`editor-btn ${editor.isActive("bold") && "active-editor-btn"
                        }`}
                >
                    <AiOutlineBold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`editor-btn ${editor.isActive("italic") && "active-editor-btn"
                        }`}
                >
                    <AiOutlineItalic />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`editor-btn ${editor.isActive("strike") && "active-editor-btn"
                        }`}
                >
                    <AiOutlineStrikethrough />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={`editor-btn ${editor.isActive("code") && "active-editor-btn"
                        }`}
                >
                    <FiCode />
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetAllMarks().run()}
                    className={`editor-btn`}
                >
                    <MdOutlineLayersClear />
                </button>
                <button
                    onClick={() => editor.chain().focus().clearNodes().run()}
                    className={`editor-btn`}
                >
                    <AiOutlineClose />
                </button>
                <button
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className={`editor-btn ${editor.isActive("paragraph") && "active-editor-btn"
                        }`}
                >
                    <BiParagraph />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'left' }) ? 'is-active' && "active-editor-btn" : ''} `}

                >
                    <AiOutlineAlignLeft />
                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'center' }) ? 'is-active' && "active-editor-btn" : ''} `}

                >
                    <AiOutlineAlignCenter />

                </button>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`editor-btn ${editor.isActive({ textAlign: 'right' }) ? 'is-active' && "active-editor-btn" : ''} `}
                >
                    <AiOutlineAlignRight />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`editor-btn ${editor.isActive('underline') ? 'is-active' && "active-editor-btn" : ''}`}
                >
                    <AiOutlineUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className={`editor-btn ${editor.isActive('subscript') ? 'is-active' && "active-editor-btn" : ''}`}
                >
                    <FaSubscript />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className={`editor-btn ${editor.isActive('superscript') ? 'is-active' && "active-editor-btn" : ''}`}
                >
                    <FaSuperscript />

                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`editor-btn ${editor.isActive("bulletList") && "active-editor-btn"
                        }`}
                >
                    <AiOutlineUnorderedList />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`editor-btn ${editor.isActive("orderedList") && "active-editor-btn"
                        }`}
                >
                    <AiOutlineOrderedList />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`editor-btn ${editor.isActive("codeBlock") && "active-editor-btn"
                        }`}
                >
                    <PiCodeBlock />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`editor-btn ${editor.isActive("blockquote") && "active-editor-btn"
                        }`}
                >
                    <PiQuotes />
                </button>
                <button
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                    className={`editor-btn`}
                >
                    <TbSpacingVertical />
                </button>
                <button
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    className={`editor-btn`}
                >
                    <AiOutlineEnter />
                </button>
                <button
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className={`editor-btn`}
                >
                    <AiOutlineUndo />
                </button>
                <button
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className={`editor-btn`}
                >
                    <AiOutlineRedo />
                </button>

                <button
                    onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { fontFamily: 'Inter' }) ? 'is-active' && "active-editor-btn" : ''}`}
                >
                    I
                </button>
                <button
                    onClick={() => editor.chain().focus().setFontFamily('cursive').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { fontFamily: 'cursive' }) ? 'is-active' && "active-editor-btn" : ''}`}

                >
                    𝒞
                </button>
            </div>
            <div className="flex gap-x-2 flex-wrap">
                <button
                    onClick={() => editor.chain().focus().setColor('#000').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#000' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setBlack"
                >
                    <GiPlainCircle className="text-black" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#6b7280').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#6b7280' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setGray"
                >
                    <GiPlainCircle className="text-gray-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#f97316').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#f97316' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setOrange"
                >
                    <GiPlainCircle className="text-orange-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#f59e0b').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#f59e0b' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setAmber"
                >
                    <GiPlainCircle className="text-amber-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#ef4444').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#ef4444' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setRed"
                >
                    <GiPlainCircle className="text-red-500 " />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#facc15').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#facc15' }) ? 'is-active' && "active-editor-btn" : ''}`}

                    data-testid="setYellow"
                >
                    <GiPlainCircle className="text-yellow-400" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#a3e635').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#a3e635' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setLime"
                >
                    <GiPlainCircle className="text-lime-400" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#22c55e').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#22c55e' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setGreen"
                >
                    <GiPlainCircle className="text-green-400" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#2dd4bf').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#2dd4bf' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setTeal"
                >
                    <GiPlainCircle className="text-teal-400" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#22d3ee').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#22d3ee' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setCyan"
                >
                    <GiPlainCircle className="text-cyan-400" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#38bdf8').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#38bdf8' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setSky"
                >
                    <GiPlainCircle className="text-sky-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#3b82f6').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#3b82f6' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setBlue"
                >
                    <GiPlainCircle className="text-blue-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#6366f1').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#6366f1' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setIndigo"
                >
                    <GiPlainCircle className="text-indigo-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#7c3aed').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#7c3aed' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setViolet"
                >
                    <GiPlainCircle className="text-violet-600" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#a855f7').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#a855f7' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setPurple"
                >
                    <GiPlainCircle className="text-purple-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#d946ef').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#d946ef' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setFuchsia"
                >
                    <GiPlainCircle className="text-fuchsia-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#ec4899').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#ec4899' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setPink"
                >
                    <GiPlainCircle className="text-pink-500" />
                </button>
                <button
                    onClick={() => editor.chain().focus().setColor('#fb7185').run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '#fb7185' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="setRose"
                >
                    <GiPlainCircle className="text-rose-600" />
                </button>
                <button
                    onClick={() => editor.chain().focus().unsetColor().run()}
                    className={`editor-btn ${editor.isActive('textStyle', { color: '' }) ? 'is-active' && "active-editor-btn" : ''}`}
                    data-testid="unsetColor"
                >
                    <GiPlainCircle />
                </button>
            </div>
            <div className="mt-3">
                Characters : {editor?.storage?.characterCount?.characters()}
                <br />
                Words : {editor?.storage?.characterCount?.words()}
            </div>
        </div>
    );
};

export default MenuBar;