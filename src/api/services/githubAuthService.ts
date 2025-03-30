import { exchangeCodeForAccessToken, getuserEmail, getUserInfo } from "../helper/githubHelper";

export const githubAuthService = {
    getUserInfoFromGitHub: async (code: string) => {

      // แลกเปลี่ยน code เป็น access token
      const accessToken = await exchangeCodeForAccessToken(code);
      console.log('accessToken: ', accessToken)
      // ดึงข้อมูลผู้ใช้จาก GitHub
      const user = await getUserInfo(accessToken);
      const email = await getuserEmail(accessToken)
      // console.log({'user': user, 'email' : email})
      
  
      return [user, email];
    },
  };