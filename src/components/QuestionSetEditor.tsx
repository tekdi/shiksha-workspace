import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { TENANT_ID, CHANNEL_ID } from "@/utils/app.config";
import { getLocalStoredUserId, getLocalStoredUserName } from "@/services/LocalStorageService";
const QuestionSetEditor: React.FC = () => {
  const router = useRouter();
  const { identifier, mode } = router.query;

  const [fullName, setFullName] = useState("Anonymous User");
  const [userId, setUserId] = useState(TENANT_ID);
  const [deviceId, setDeviceId] = useState("7e85b4967aebd6704ba1f604f20056b6");

  const [firstName, lastName] = fullName.split(" ");

  useEffect(() => {
    const storedFullName = getLocalStoredUserName();
    const storedUserId = getLocalStoredUserId() || TENANT_ID;
    setFullName(storedFullName ?? "Anonymous User");
    setUserId(storedUserId);

    const generatedDeviceId = uuidv4();
    setDeviceId(generatedDeviceId);
  }, []);

  const questionSetEditorConfig = {
    context: {
      user: {
        id: userId,
        fullName: fullName,
        firstName: firstName || "Anonymous",
        lastName: lastName || "Anonymous",
        orgIds: [CHANNEL_ID],
      },
      identifier: identifier,
      sid: uuidv4(),
      did: deviceId,
      uid: userId,
      channel: CHANNEL_ID,
      pdata: {
        id: "pratham.admin.portal",
        ver: "1.0.0",
        pid: "pratham-portal",
      },
      contextRollup: {
        l1: CHANNEL_ID,
      },
      tags: [CHANNEL_ID],
      cdata: [
        {
          id: CHANNEL_ID,
          type: "pratham-portal",
        }
      ],
      timeDiff: 5,
      objectRollup: {},
      host: "",
      defaultLicense: "CC BY 4.0",
      endpoint: "/data/v3/telemetry",
      env: "questionset_editor",
      framework: "test_k12_framework",
      cloudStorageUrls: ["https://knowlg-public.s3-ap-south-1.amazonaws.com/"],
      labels: {
        save_collection_btn_label: "Save as Draft",
      },
      correctionComments: false,
      sourcingResourceStatus: true,
      cloudStorage: {
        provider: "aws",
        presigned_headers: {},
      }
    },
    config: {
      mode: mode || "edit",
      enableQuestionCreation: true,
      enableAddFromLibrary: true,
      editableFields: {
        sourcingreview: ["instructions"],
        orgreview: ["name", "instructions", "learningOutcome"],
        review: ["name", "description"],
      },
      maxDepth: 4,
      objectType: "QuestionSet",
      primaryCategory: "Practice Question Set",
      isRoot: true,
      iconClass: "fa fa-book",
      hideSubmitForReviewBtn: false,
      children: {
        Question: ["Multiple Choice Question", "Subjective Question"],
      },
      addFromLibrary: false,
      hierarchy: {
        level1: {
          name: "Section",
          type: "Unit",
          mimeType: "application/vnd.sunbird.questionset",
          primaryCategory: "Practice Question Set",
          iconClass: "fa fa-folder-o",
          children: {},
          addFromLibrary: true,
        },
        level2: {
          name: "Sub Section",
          type: "Unit",
          mimeType: "application/vnd.sunbird.questionset",
          primaryCategory: "Practice Question Set",
          iconClass: "fa fa-folder-o",
          children: {
            Question: ["Multiple Choice Question", "Subjective Question"],
          },
          addFromLibrary: true,
        },
        level3: {
          name: "Sub Section",
          type: "Unit",
          mimeType: "application/vnd.sunbird.questionset",
          primaryCategory: "Practice Question Set",
          iconClass: "fa fa-folder-o",
          children: {
            Question: ["Subjective Question"],
          },
        },
      },
      contentPolicyUrl: "/term-of-use.html",
      assetProxyUrl: "/assets/public/",
      commonFrameworkLicenseUrl: "https://creativecommons.org/licenses/",
    },
  };

  const editorRef = useRef<HTMLDivElement | null>(null);
  const isAppendedRef = useRef(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = () => {
      if (!document.getElementById("sunbird-editor-css")) {
        const link = document.createElement("link");
        link.id = "sunbird-editor-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/@tekdi/sunbird-questionset-editor-web-component@3.0.1/styles.css";
        document.head.appendChild(link);
      }

      if (!document.getElementById("sunbird-editor-js")) {
        const script = document.createElement("script");
        script.id = "sunbird-editor-js";
        script.src =
          "https://cdn.jsdelivr.net/npm/@tekdi/sunbird-questionset-editor-web-component@3.0.1/sunbird-questionset-editor.js";
        script.async = true;
        script.onload = () => setAssetsLoaded(true);
        document.body.appendChild(script);
      } else {
        setAssetsLoaded(true);
      }
    };

    loadAssets();

    return () => {
      const editorCss = document.getElementById("sunbird-editor-css");
      const editorScript = document.getElementById("sunbird-editor-js");

      if (editorCss) document.head.removeChild(editorCss);
      if (editorScript) document.body.removeChild(editorScript);
    };
  }, []);

  useEffect(() => {
    if (assetsLoaded && editorRef.current && !isAppendedRef.current) {
      const questionsetEditorElement = document.createElement(
        "lib-questionset-editor"
      );

      questionsetEditorElement.setAttribute(
        "editor-config",
        JSON.stringify(questionSetEditorConfig)
      );

      questionsetEditorElement.addEventListener(
        "editorEmitter",
        (event: any) => {
          console.log("Editor event:", event);
          if (event.detail?.action === "backContent") {
            window.history.back();
            window.addEventListener(
              "popstate",
              () => {
                window.location.reload();
              },
              { once: true }
            );
          }
        }
      );
      editorRef.current.appendChild(questionsetEditorElement);
      isAppendedRef.current = true;
    }
  }, [assetsLoaded]);

  return (
    <div>
      {assetsLoaded ? <div ref={editorRef}></div> : <p>Loading editor...</p>}
    </div>
  );
};

export default QuestionSetEditor;
