import { post } from './RestClient';

interface RefreshParams {
    refresh_token: string;
}

export const refresh = async ({refresh_token}: RefreshParams): Promise<any> => {
    const apiUrl: string = `${process.env.NEXT_PUBLIC_BASE_URL}/user/v1/auth/refresh`;
    try {
        const response = await post(apiUrl, { refresh_token });
        return response?.data;
    } catch (error) {
        console.error('error in login', error);
        throw error;
    }
};
