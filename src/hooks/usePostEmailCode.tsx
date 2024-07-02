
import api from "../Services/Api";

interface usePostEmailResult {
  authenticationPEV: (email: string,) => Promise<string>;
}

export const usePostEmailCode = (): usePostEmailResult => {

  const authenticationPEV = async (email: string) => {
    try {
      const response = await api.post('/users/emailUser/'+email);


      return response.data;
    } catch (error) {
      
      return 'Não passou';
    }

  };

  return { authenticationPEV };
};