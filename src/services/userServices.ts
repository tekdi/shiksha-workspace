
import { post } from "./RestClient";

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
    //  page,
    filters,
    sort,
    offset,
    fields,
  }: userListParam): Promise<any> => {
    const apiUrl: string = `${process.env.NEXT_PUBLIC_MIDDLEWARE_URL}/user/v1/list`;
    try {
      const response = await post(apiUrl, {
        limit,
        filters,
        sort,
        offset,
        fields,
      });
      return response?.data?.result;
    } catch (error) {
      console.error("error in getting user list", error);
      throw error;
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
        const extractedData = response.getUserDetails.map((user: any) => ({
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