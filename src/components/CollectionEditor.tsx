import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import { TENANT_ID, CHANNEL_ID } from "@/utils/app.config";
import { getLocalStoredUserName, getLocalStoredUserId } from "@/services/LocalStorageService";
const CollectionEditor: React.FC = () => {
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

  const editorConfig = {
    context: {
      user: {
        id: userId,
        fullName: fullName,
        firstName: firstName || "Anonymous",
        lastName: lastName || "Anonymous",
        orgIds: ["01309282781705830427"],
      },
      identifier: identifier,
      channel: CHANNEL_ID,
      framework: "test_k12_framework",
      authToken: " ",
      sid: "iYO2K6dOSdA0rwq7NeT1TDzS-dbqduvV",
      did: deviceId,
      uid: "bf020396-0d7b-436f-ae9f-869c6780fc45",
      additionalCategories: [
        {
          value: "Textbook",
          label: "Textbook",
        },
        {
          value: "Lesson Plan",
          label: "Lesson Plan",
        },
      ],
      pdata: {
        id: "dev.dock.portal",
        ver: "2.8.0",
        pid: "creation-portal",
      },
      contextRollup: {
        l1: "01307938306521497658",
      },
      tags: ["01307938306521497658"],
      cdata: [
        {
          id: "01307938306521497658",
          type: "sourcing_organization",
        },
        {
          type: "project",
          id: "ec5cc850-3f71-11eb-aae1-fb99d9fb6737",
        },
        {
          type: "linked_collection",
          id: "do_113140468925825024117",
        },
      ],
      timeDiff: 5,
      objectRollup: {
        l1: "do_113140468925825024117",
        l2: "do_113140468926914560125",
      },
      host: "",
      defaultLicense: "CC BY 4.0",
      endpoint: "/data/v3/telemetry",
      env: "collection_editor",
      cloudStorageUrls: ["https://knowlg-public.s3-ap-south-1.amazonaws.com/"],
    },
    config: {
      mode: mode || "edit", // edit / review / read / sourcingReview
      maxDepth: 4,
      objectType: "Collection",
      primaryCategory: "Course", // Professional Development Course, Curriculum Course
      isRoot: true,
      dialcodeMinLength: 2,
      dialcodeMaxLength: 250,
      iconClass: "fa fa-book",
      showAddCollaborator: false,
      enableBulkUpload: false,
      children: {},
      hierarchy: {
        level1: {
          name: "Module",
          type: "Unit",
          mimeType: "application/vnd.ekstep.content-collection",
          contentType: "CourseUnit",
          primaryCategory: "Course Unit",
          iconClass: "fa fa-folder-o",
          children: {},
        },
        level2: {
          name: "Sub-Module",
          type: "Unit",
          mimeType: "application/vnd.ekstep.content-collection",
          contentType: "CourseUnit",
          primaryCategory: "Course Unit",
          iconClass: "fa fa-folder-o",
          children: {
            Content: [
              "Explanation Content",
              "Learning Resource",
              "eTextbook",
              "Teacher Resource",
              "Course Assessment",
            ],
          },
        },
        level3: {
          name: "Sub-Sub-Module",
          type: "Unit",
          mimeType: "application/vnd.ekstep.content-collection",
          contentType: "CourseUnit",
          primaryCategory: "Course Unit",
          iconClass: "fa fa-folder-o",
          children: {
            Content: [
              "Explanation Content",
              "Learning Resource",
              "eTextbook",
              "Teacher Resource",
              "Course Assessment",
            ],
          },
        },
        level4: {
          name: "Sub-Sub-Module",
          type: "Unit",
          mimeType: "application/vnd.ekstep.content-collection",
          contentType: "CourseUnit",
          primaryCategory: "Course Unit",
          iconClass: "fa fa-folder-o",
          children: {
            Content: [
              "Explanation Content",
              "Learning Resource",
              "eTextbook",
              "Teacher Resource",
              "Course Assessment",
            ],
          },
        },
      },
      contentPolicyUrl: "/term-of-use.html",
    },
  };

  const editorRef = useRef<HTMLDivElement | null>(null);
  const isAppendedRef = useRef(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const loadAssets = () => {
      if (!document.getElementById("collection-editor-js")) {
        const script = document.createElement("script");
        console.log("Hello");

        script.id = "collection-editor-js";
        script.src =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-collection-editor-web-component@latest/sunbird-collection-editor.js";
        script.async = true;
        script.onload = () => setAssetsLoaded(true);
        document.body.appendChild(script);
      } else {
        setAssetsLoaded(true);
      }

      // Load Collection Editor CSS if not already loaded
      if (!document.getElementById("collection-editor-css")) {
        const link = document.createElement("link");
        link.id = "collection-editor-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-collection-editor-web-component@latest/styles.css";
        document.head.appendChild(link);
      }

      if (!document.getElementById("sunbird-pdf-player-js")) {
        const pdfScript = document.createElement("script");
        pdfScript.id = "sunbird-pdf-player-js";
        pdfScript.src =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-pdf-player-web-component@1.4.0/sunbird-pdf-player.js";
        pdfScript.async = true;
        document.body.appendChild(pdfScript);
      }

      if (!document.getElementById("sunbird-pdf-player-css")) {
        const pdfLink = document.createElement("link");
        pdfLink.id = "sunbird-pdf-player-css";
        pdfLink.rel = "stylesheet";
        pdfLink.href =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-pdf-player-web-component@1.4.0/styles.css";
        document.head.appendChild(pdfLink);
      }

      if (!document.getElementById("sunbird-video-player.js")) {
        const videoScript = document.createElement("script");
        videoScript.id = "sunbird-video-player.js";
        videoScript.src =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/sunbird-video-player.js";
        videoScript.async = true;
        document.body.appendChild(videoScript);
      }

      if (!document.getElementById("sunbird-video-player-css")) {
        const videoLink = document.createElement("link");
        videoLink.id = "sunbird-video-player-css";
        videoLink.rel = "stylesheet";
        videoLink.href =
          "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/styles.css";
        document.head.appendChild(videoLink);
      }
    };

    loadAssets();

    return () => {
      const reflectScript = document.getElementById("reflect-metadata");
      const editorScript = document.getElementById("collection-editor-js");
      const editorCSS = document.getElementById("collection-editor-css");

      if (reflectScript) document.head.removeChild(reflectScript);
      if (editorScript) document.body.removeChild(editorScript);
      if (editorCSS) document.head.removeChild(editorCSS);
    };
  }, []);

  useEffect(() => {
    if (assetsLoaded && editorRef.current && !isAppendedRef.current) {
      const collectionEditorElement = document.createElement("lib-editor");

      collectionEditorElement.setAttribute(
        "editor-config",
        JSON.stringify(editorConfig)
      );

      collectionEditorElement.addEventListener(
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

      editorRef.current.appendChild(collectionEditorElement);
      isAppendedRef.current = true;
    }
  }, [assetsLoaded]);

  return (
    <div>
      {assetsLoaded ? <div ref={editorRef}></div> : <p>Loading editor...</p>}
    </div>
  );
};
export default CollectionEditor;
