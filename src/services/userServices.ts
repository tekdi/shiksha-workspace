
import { getLocalStoredToken } from "./LocalStorageService";
import { post , get} from "./RestClient";
import axios from "axios";
import TenantService from "./TenantService";
export interface userListParam {
  limit?: number;
  //  page: number;
  filters: {
    role?: string;
    status?: string;
    states?: string;
    districts?: string;
    blocks?: string;
  };
  fields?: any;
  sort?: object;
  offset?: number;
}



export const userList = async ({
  limit,
  filters,
  sort,
  offset,
  fields,
}: userListParam): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/list`;

  try {
    console.log("Request data", apiUrl);
    const headers: Record<string, string> = {
      Authorization: `Bearer ${getLocalStoredToken()}`,
    tenantid : TenantService.getTenantId()

    };
    const response = await axios.post(
      apiUrl,
      { limit, filters, sort, offset, fields },
      
        {headers}
      
    );

    return response?.data?.result;
  } catch (error) {
    console.error("Error in getting user list", error);
    throw error;
  }
};

export const getUserDetailsInfo = async (
  userId?: string | string[],
  fieldValue: boolean = true
): Promise<any> => {
  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/read/${userId}?fieldvalue=${fieldValue}`;
  const headers: Record<string, string> = {
    Authorization: `Bearer ${getLocalStoredToken()}`,
    tenantid: TENANT_ID,
  };
  try {
    const response = await get(apiUrl);
    return response?.data?.result;
  } catch (error) {
    console.error("Error fetching user details:", error);
    return error;
  }
};

 export const fetchCCTAList = async() => {
    try{
        const filter={
            role: "Central Content Team Associate (CCTA)"
        
        }  
        const response= await userList({
            filters: filter,
           
        })
        const extractedData = response?.getUserDetails?.map((user: any) => ({
            email: user.email,
            name: user.firstName
        }));
        
        console.log(extractedData); 
        return extractedData
    }
     catch(error){
        console.error("error in getting user list", error);
        throw error;
    }
};