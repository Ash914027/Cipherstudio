import React from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ code, onChange }) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      value={code}
      onChange={onChange}
      theme="vs-dark"
    />
  );
};

export default CodeEditor;
