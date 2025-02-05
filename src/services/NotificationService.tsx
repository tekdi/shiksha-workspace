import { getLocalStoredToken } from './LocalStorageService';
import axios from "axios";
import {
  TENANT_ID
  
} from "@/utils/app.config";
export interface SendCredentialsRequest {
  isQueue: boolean;
  context: string;
  key: string;
  replacements?: object;
  email?: {
    receipients: any[];
  };
  push?: {
    receipients: any[];
  };
}


export const sendCredentialService = async ({
  isQueue,
  context,
  key,
  replacements,
  email,
  push,
}: SendCredentialsRequest): Promise<any> => {
  console.log("sendcred");

  const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/notification/send`;

  const headers: Record<string, string> = {
    Authorization: `Bearer ${getLocalStoredToken()}`,
    tenantid: TENANT_ID, 
    "Content-Type": "application/json", 
  };

  try {
    const response = await axios.post(
      apiUrl,
      { isQueue, context, key, replacements, email, push },
      { headers } 
    );

    return response?.data;
  } catch (error) {
    console.log("sendcrederror");

    console.error("Error in sending credential service request", error);
    throw error; 
  }
};



