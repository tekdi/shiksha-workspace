import { post } from "./RestClient";

const defaultReqBody = {
  request: {
    filters: {
      primaryCategory: [
        "Course Assessment",
        "eTextbook",
        "Explanation Content",
        "Learning Resource",
        "Practice Question Set",
        "Teacher Resource",
        "Exam Question",
        "Content Playlist",
        "Course",
        "Digital Textbook",
        "Question paper",
      ],
    },
    query: "",
    sort_by: {
      lastUpdatedOn: "desc",
    },
  },
};

const getReqBodyWithStatus = (status: string[]) => {
  return {
    ...defaultReqBody,
    request: {
      ...defaultReqBody.request,
      filters: {
        ...defaultReqBody.request.filters,
        status,
      },
    },
  };
};

export const getContent = async (status: string[]) => {
  const apiURL = "/action/composite/v3/search";
  try {
    const reqBody = getReqBodyWithStatus(status);
    const response = await post(apiURL, reqBody);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
