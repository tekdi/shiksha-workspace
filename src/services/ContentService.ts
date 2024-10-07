import { post } from "./RestClient";

const defaultReqBody = {
  request: {
    filters: {
      createdBy: "84721b4a-6536-4cb0-b8c3-57583ef4cada",
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
    offset: 0,
    limit: 9,
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
  const apiURL = "https://sunbirdsaas.com/api/content/v1/search";
  try {
    const reqBody = getReqBodyWithStatus(status);
    const response = await post(apiURL, reqBody);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
