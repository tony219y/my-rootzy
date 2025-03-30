import wretch from 'wretch';
import 'dotenv/config';

interface GitHubResponse {
  access_token: string;
  token_type: string;
  scope?: string;
  error?: string;
  error_description?: string;
}

export const exchangeCodeForAccessToken = async (code: string): Promise<string> => {
  try {
    // console.log("ID: ", process.env.GITHUB_CLIENT_ID);
    // console.log("SECRET: ", process.env.GITHUB_CLIENT_SECRET);
    // console.log("URL: ", process.env.GITHUB_REDIRECT);
    // console.log("Code: ", code);

    
    // เพิ่มการจับ response เต็มรูปแบบเพื่อตรวจสอบ
    const fullResponse = await wretch('https://github.com/login/oauth/access_token')
      .headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      })
      .post({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT
      })
      .res();
    
    // ดู status และ text ของ response
    console.log("Response status:", fullResponse.status);
    
    // แปลง response เป็น JSON
    const response = await fullResponse.json() as GitHubResponse;
    console.log("Full response:", response);
    
    // ตรวจสอบหาข้อผิดพลาดจาก GitHub
    if (response.error) {
      throw new Error(`GitHub OAuth Error: ${response.error} - ${response.error_description}`);
    }
    
    if (!response || !response.access_token) {
      throw new Error('Failed to get access token from GitHub');
    }
    
    // console.log("Received access token:", response.access_token.substring(0, 5) + "...");
    return response.access_token;
  } catch (error) {
    console.error('Error exchanging code for access token:', error);
    throw error;
  }
};

export const getUserInfo = async(accessToken: string): Promise<any> => {
  try {
    
    const response = await wretch('https://api.github.com/user')
      .headers({
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      })
      .get()
      .json();
    
    return response;
  } catch (error) {
    throw error;
  }
};
export const getuserEmail = async(accessToken: string): Promise<any> => {
  try {
    
    const response = await wretch('https://api.github.com/user/emails')
      .headers({
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28'
      })
      .get()
      .json();
    
    return response;
  } catch (error) {
    throw error;
  }
};