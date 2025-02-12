import { formatDate } from "@/utils/Helper";
import { sendCredentialService } from "./NotificationService";
import { getLocalStoredUserName } from "./LocalStorageService";
import { getUserDetailsInfo } from "./userServices";

export const sendContentNotification = async (
    status: "Published" | "Rejected", 
    editorType: "content" | "questionset" | "collection", 
    comment = "",
    identifier?:any,
    contentInfo?:any,
    router?:any
  ) => {
    // const router = useRouter();

    try {
      const isQueue = false;
      const context = "CMS";
      const key = status === "Published" ? "onContentPublish" : "onContentReject";
      let url = `${window.location.origin}/${editorType === "content" ? "upload-editor" : editorType === "questionset" ? "editor" : "collection"}?identifier=${identifier}`;
  
      let contentDetails: any = {};
      if (editorType !== "content") {
        const doId = identifier?.toString();
        if (doId) {
          const hierarchyResponse = await fetch(`/action/content/v3/read/${doId}`);
          const data = await hierarchyResponse.json();
          contentDetails = data?.result?.content;
        }
      } else {
        contentDetails = { ...contentInfo };
      }
  
      console.log("Content Details:", contentDetails);
      const userId = contentDetails?.createdBy;
      const response = await getUserDetailsInfo(userId, true);
      console.log("getUserDetailsInfo", response);
  
      const replacements: any = {
        "{reviewerName}": getLocalStoredUserName(),
        "{creatorName}": response?.userData?.firstName,
        "{contentId}": identifier,
        "{appUrl}": url,
        "{submissionDate}": formatDate(contentDetails?.createdOn),
        "{contentTitle}": contentDetails?.name,
        "{reviewDate}": formatDate(new Date().toString()),
        "{status}": status,
      };
  
      if (status === "Rejected") {
        replacements["{reviwerComment}"] = editorType === "content" ? comment : contentDetails?.rejectComment;
      }
  
      await sendCredentialService({
        isQueue,
        context,
        key,
        replacements,
        email: { receipients: [response?.userData?.email] },
      });
  
      router.push({ pathname: "/workspace/content/up-review" });
    } catch (error) {
      console.error("Error sending email notifications:", error);
    }
  };
  