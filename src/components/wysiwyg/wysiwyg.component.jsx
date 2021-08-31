import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  ContentState,
  convertFromHTML
} from "draft-js";
import draftToHtml from "draftjs-to-html";

import "./wysiwyg.style.scss";

import InlineStyleControls from "./inlineStyleControl/inlineStyleControl.component";
import BlockStyleControls from "./blockStyleControls/blockStyleControls.component";

const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const getBlockStyle = (block) => {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const Wysiwyg = (props) => {
  const blocksFromHTML = convertFromHTML(props.content);
  const states = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  const [editorState, setEditorState] = useState(EditorState.createWithContent(states))
  const editor = useRef();
  const focus = () => editor.current.focus();
  const onChange = editorState => {
    setEditorState(editorState);
    const contentState = editorState.getCurrentContent();
    const csr = convertToRaw(contentState);
    const markup = draftToHtml(csr);
    props.setContent(markup);
  };

  const changeBlur = () => {
    const contentState = editorState.getCurrentContent();
    const csr = convertToRaw(contentState);
    const markup = draftToHtml(csr);
    props.changeBlur(markup === "" || markup.length <= 8);
  };

  const handleKeyCommand = command => _handleKeyCommand(command);
  const onTab = e => _onTab(e);
  const toggleBlockType = type => _toggleBlockType(type);
  const toggleInlineStyle = style => _toggleInlineStyle(style);
  const toggleLink = () => _toggleLink();


  const _handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  }

  const _onTab = (e) => {
    const maxDepth = 4;
    onChange(RichUtils.onTab(e, editorState, maxDepth));
  }

  const _toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(editorState, blockType));
  }

  const _toggleInlineStyle = (inlineStyle) => {
    onChange(
      RichUtils.toggleInlineStyle(editorState, inlineStyle)
    );
  }

  const _toggleLink = () => {
    const selection = editorState.getSelection();
    const link = window.prompt("Paste the link -");
    if (!link) {
      onChange(RichUtils.toggleLink(editorState, selection, null));
      return "handled";
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "create-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return "handled";
  }

  let className = "RichEditor-editor";
  var contentState = editorState.getCurrentContent();
  if (!contentState.hasText()) {
    if (
      contentState
        .getBlockMap()
        .first()
        .getType() !== "unstyled"
    ) {
      className += " RichEditor-hidePlaceholder";
    }
  }


  return (
    <div>
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
          onLink={toggleLink}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
          onLink={toggleLink}
        />
        <div className={className} onClick={focus}>
          <Editor
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            onBlur={changeBlur}
            onTab={onTab}
            placeholder="Tell a story..."
            ref={editor}
            spellCheck={true}
          />
        </div>
      </div>
    </div>
  );

}


export default Wysiwyg;
