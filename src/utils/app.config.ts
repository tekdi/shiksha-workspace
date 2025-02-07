export const MIME_TYPE = {
  COLLECTION_MIME_TYPE: "application/vnd.ekstep.content-collection",
  ECML_MIME_TYPE: "application/vnd.ekstep.ecml-archive",
  GENERIC_MIME_TYPE: [
    "application/pdf",
    "video/mp4",
    "application/vnd.ekstep.html-archive",
    "application/epub",
    "application/vnd.ekstep.h5p-archive",
    "video/webm",
    "text/x-url",
    "video/x-youtube",
    "video/youtube"
  ],
  QUESTIONSET_MIME_TYPE: "application/vnd.sunbird.questionset",
  COURSE_MIME_TYPE: "application/vnd.ekstep.content-collection",
  INTERACTIVE_MIME_TYPE: [
    "application/vnd.ekstep.h5p-archive",
    "application/vnd.ekstep.html-archive",
    "video/x-youtube",
    "video/youtube"]
};

export const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || "";
if (!CHANNEL_ID) {
  console.warn('NEXT_PUBLIC_CHANNEL_ID is not set in the environment variables.');
}

export const FRAMEWORK_ID = process.env.NEXT_PUBLIC_FRAMEWORK_ID || "";
if (!FRAMEWORK_ID) {
  console.warn('NEXT_PUBLIC_FRAMEWORK_ID is not set in the environment variables.');
}

export const CONTENT_FRAMEWORK_ID = process.env.NEXT_PUBLIC_CONTENT_FRAMEWORK_ID || "";
if (!CONTENT_FRAMEWORK_ID) {
  console.warn('NEXT_PUBLIC_CONTENT_FRAMEWORK_ID is not set in the environment variables.');
}

export const CLOUD_STORAGE_URL = process.env.NEXT_PUBLIC_CLOUD_STORAGE_URL || "";
if (!CLOUD_STORAGE_URL) {
  console.warn('NEXT_PUBLIC_CLOUD_STORAGE_URL is not set in the environment variables.');
}