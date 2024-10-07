import { post } from "./RestClient";

export const getContent = async (reqBody: any) => {
  const apiURL = "https://sunbirdsaas.com/api/content/v1/search";
  try {
    const response = await post(apiURL, reqBody);
    return response?.data?.result;
  } catch (error) {
    throw error;
  }
};
