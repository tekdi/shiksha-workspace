// src/pages/components/QuestionSetEditor.js
import React, { useEffect, useRef } from "react";
import { questionSetEditorConfig } from "./data"; // Adjust the path as needed

const QuestionSetEditor = () => {
  const editorRef = useRef(null);
  let isAppended = false;

  useEffect(() => {
    const loadEditorScript = () => {
        const script = document.createElement("script");
        script.src = '/sunbird-questionset-editor-web-component/sunbird-questionset-editor.js';
        script.async = true;

        script.onload = () => {
          const editorConfig = questionSetEditorConfig;
        const questionsetEditorElement = document.createElement("lib-questionset-editor");
        questionsetEditorElement.setAttribute("editor-config", JSON.stringify(editorConfig));

        questionsetEditorElement.addEventListener("editorEmitter", (event) => {
          console.log("On editorEvent", event);
        });

        if (editorRef.current) {
          editorRef.current.appendChild(questionsetEditorElement);
          isAppended = true;
        } else {
          console.error("Editor ref not available.");
        }
      };

      script.onerror = () => {
        console.error("Failed to load the editor script.");
      };

      document.body.appendChild(script);
    };

    if (!isAppended) {
      loadEditorScript();
    }

    return () => {
      const scripts = document.querySelectorAll("script[src='/sunbird-questionset-editor-web-component/sunbird-questionset-editor.js']");
      scripts.forEach(script => script.remove());
    };
  }, []);

  return <div ref={editorRef}></div>;
};

export default QuestionSetEditor;
