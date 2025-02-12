import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import {
  TENANT_ID,
  CHANNEL_ID,
  FRAMEWORK_ID,
  CLOUD_STORAGE_URL,
} from "@/utils/app.config";
import {
  getLocalStoredUserName,
  getLocalStoredUserId,
  getLocalStoredUserSpecificBoard
} from "@/services/LocalStorageService";
import { fetchCCTAList, getUserDetailsInfo } from "@/services/userServices";
import { sendCredentialService } from "@/services/NotificationService";
import { formatDate } from "@/utils/Helper";
const CollectionEditor: React.FC = () => {
  const router = useRouter();
  const { identifier } = router.query;
  const [mode, setMode] = useState<any>();
  const [fullName, setFullName] = useState("Anonymous User");
  const [userId, setUserId] = useState(TENANT_ID);
  const [deviceId, setDeviceId] = useState("");

  const [firstName, lastName] = fullName.split(" ");
  const sendReviewNotification = async (notificationData: any) => {
    console.log("notificationData", notificationData);
   
  
    const isQueue = false;
    const context = "CMS";
    const key = "onContentReview";
    const url = `${window.location.origin}/collection?identifier=${notificationData?.contentId}`;
  
    try {
      const response = await fetchCCTAList();
      const cctaList = response;
      const ContentDetail = await fetch(
        `/action/content/v3/read/${notificationData?.contentId}`
      );
      const data = await ContentDetail.json();
 
      const promises = cctaList.map(async (user: any) => {
        const replacements = {
          "{reviewerName}": user?.name,
          "{creatorName}": notificationData?.creator,
          "{contentId}": notificationData?.contentId,
          "{appUrl}": url,
          "{submissionDate}": new Date().toLocaleDateString(),
        "{contentType}":"Course",
        "{contentTitle}":data?.result?.content?.name
        };
  
        return sendCredentialService({
          isQueue,
          context,
          key,
          replacements,
          email: { receipients: [user?.email] },
        });
      });
  
      // Wait for all API calls to complete
      await Promise.all(promises);
  
      console.log("All emails sent successfully.");
      
      window.history.back(); 
    } catch (error) {
      console.error("Error sending email notifications:", error);
    }
  };
  
  
  useEffect(() => {
    const storedFullName = getLocalStoredUserName();
    const storedUserId = getLocalStoredUserId() || TENANT_ID;
    const storedMode = localStorage.getItem("contentMode");
    setMode(storedMode || "edit");
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
        lastName: lastName || "User",
        orgIds: [CHANNEL_ID],
      },
      identifier: identifier,
      channel: CHANNEL_ID,
      framework: FRAMEWORK_ID,
      sid: uuidv4(),
      did: deviceId,
      uid: getLocalStoredUserId() || TENANT_ID,
      additionalCategories: [],
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
        },
      ],
      timeDiff: 5,
      objectRollup: {},
      host: "",
      defaultLicense: "CC BY 4.0",
      endpoint: "/data/v3/telemetry",
      env: "collection_editor",
      cloudStorageUrls: [CLOUD_STORAGE_URL],
    },
    config: {
      mode: mode || "edit", // edit / review / read / sourcingReview
      userSpecificFrameworkField: getLocalStoredUserSpecificBoard(),
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
  const sendContentPublishNotification = async () => {
    try {
     
      const isQueue = false;
      const context = "CMS";
      const key = "onContentPublish";
      let url = `${window.location.origin}/collection?identifier=${identifier}`;
     
      const doId = identifier?.toString();
      if (doId) {
        const hierarchyResponse = await fetch(
          `/action/content/v3/read/${doId}`
        );
        const data = await hierarchyResponse.json();

        const questionset = data?.result?.content;
        console.log("hierarchyResponse:", questionset);
        const userId = questionset?.createdBy;
        const response = await getUserDetailsInfo(userId, true);
        console.log("getUserDetailsInfo", response);
        const replacements = {
          "{reviewerName}": getLocalStoredUserName(),
          "{creatorName}": response?.userData?.firstName,
          "{contentId}": identifier,
          "{appUrl}": url,
          "{submissionDate}": formatDate(new Date().toLocaleDateString()),
          "{contentTitle}": questionset.name,
          "{reviewDate}": formatDate(questionset.createdOn),
          "{status}": "Published",
        };
        const emailResponse = await sendCredentialService({
          isQueue,
          context,
          key,
          replacements,
          email: { receipients: [response?.userData?.email] },
        });
        router.push({ pathname: `/workspace/content/up-review` });
      }
    } catch (error) {
      console.error("Error sending email notifications:", error);
    }
  };
  const sendContentRejectNotification = async () => {
    try {
     
      const isQueue = false;
      const context = "CMS";
      const key = "onContentReject";
      let url = `${window.location.origin}/collection?identifier=${identifier}`;
     
      const doId = identifier?.toString();
      if (doId) {
        const hierarchyResponse = await fetch(
          `/action/content/v3/read/${doId}`
        );
        const data = await hierarchyResponse.json();

        const questionset = data?.result?.content;
        console.log("hierarchyResponse:", questionset);
        const userId = questionset?.createdBy;
        const response = await getUserDetailsInfo(userId, true);
        console.log("getUserDetailsInfo", response);
        const replacements = {
          "{reviewerName}": getLocalStoredUserName(),
          "{creatorName}": response?.userData?.firstName,
          "{contentId}": identifier,
          "{appUrl}": url,
          "{submissionDate}": formatDate(questionset.createdOn),
          "{contentTitle}": questionset.name,
          "{reviewDate}": formatDate(new Date().toString()),
          "{status}": "Rejected",
          "{reviwerComment}":questionset.rejectComment
        };
        const emailResponse = await sendCredentialService({
          isQueue,
          context,
          key,
          replacements,
          email: { receipients: [response?.userData?.email] },
        });
        router.push({ pathname: `/workspace/content/up-review` });
      }
    } catch (error) {
      console.error("Error sending email notifications:", error);
    }
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
          "https://cdn.jsdelivr.net/npm/@tekdi/sunbird-collection-editor-web-component@6.1.0-beta.2/sunbird-collection-editor.js";
        script.async = true;
        script.onload = () => setAssetsLoaded(true);
        document.body.appendChild(script);
      } else {
        setAssetsLoaded(true);
      }

      // Load Collection Editor CSS if not already loaded
      if (!document.getElementById("collection-editor-css")) {
        const link = document.createElement("link");
        console.log("PDF Player loaded");
        link.id = "collection-editor-css";
        link.rel = "stylesheet";
        link.href =
          "https://cdn.jsdelivr.net/npm/@tekdi/sunbird-collection-editor-web-component@6.1.0-beta.2/styles.css";
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

      const videoScript = document.createElement("script");
      console.log("Video Player loaded");
      videoScript.id = "sunbird-video-player.js";
      videoScript.src =
        "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/sunbird-video-player.js";
      videoScript.async = true;
      document.body.appendChild(videoScript);

      const videoLink = document.createElement("link");
      videoLink.id = "sunbird-video-player-css";
      videoLink.rel = "stylesheet";
      videoLink.href =
        "https://cdn.jsdelivr.net/npm/@project-sunbird/sunbird-video-player-web-component@1.2.5/styles.css";
      document.head.appendChild(videoLink);
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
          if (
            event.detail?.action === "backContent" ||
            event.detail?.action === "submitContent" ||
            event.detail?.action === "publishContent" ||
            event.detail?.action === "rejectContent"
          ) {
            if (event.detail?.action === "submitContent") {
              console.log("collection");
            
              sendReviewNotification({
                contentId: identifier,
                creator: getLocalStoredUserName(),
              })
                .then(() => {
                  window.history.back(); 
                })
                .catch((error) => {
                  console.error("Error in sendReviewNotification:", error);
                });
            } 
            else if( event.detail?.action === "publishContent")
            {
              sendContentPublishNotification();
            }
            else if( event.detail?.action === "rejectContent")
            {
              sendContentRejectNotification();
            }
            else {
              window.history.back();
            }
            localStorage.removeItem("contentMode");

            
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
