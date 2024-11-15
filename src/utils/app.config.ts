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

export const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || '';
if (!TENANT_ID) {
  console.warn('NEXT_PUBLIC_TENANT_ID is not set in the environment variables.');
}

export const CHANNEL_ID = process.env.NEXT_PUBLIC_CHANNEL_ID || '';
if (!CHANNEL_ID) {
  console.warn('NEXT_PUBLIC_CHANNEL_ID is not set in the environment variables.');
}
