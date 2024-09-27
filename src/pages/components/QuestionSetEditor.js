import React, { useEffect, useRef } from "react";
import { questionSetEditorConfig } from "./data";

const QuestionSetEditor = () => {
  const editorRef = useRef(null);
  let isAppended = false;

  useEffect(() => {
    if (!isAppended) {
      const editorConfig = questionSetEditorConfig;
      const questionsetEditorElement = document.createElement(
        "lib-questionset-editor"
      );
      questionsetEditorElement.setAttribute(
        "editor-config",
        JSON.stringify(editorConfig)
      );

      questionsetEditorElement.addEventListener("editorEmitter", (event) => {
        console.log("On editorEvent", event);
      });

      if (editorRef.current) {
        console.log("Element appended");
        editorRef.current.appendChild(questionsetEditorElement);
        isAppended = true;
      }
    }
  }, []);

  return <div ref={editorRef}></div>;
};

export default QuestionSetEditor;
