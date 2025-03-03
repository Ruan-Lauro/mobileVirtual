import axios from "axios";
import api from "../Services/Api";

interface useAddTokenNotificationResult {
    authenticationAddTN: (postAdd: createTokenNotification) => Promise<string>;
}

export type createTokenNotification = {
    userId: string;
    token: string;
}

export const useAddTokenNotification = (): useAddTokenNotificationResult => {

  const authenticationAddTN = async (postAdd: createTokenNotification) => {

    try {
     
      const response = await api.post('/tokenNotification/', {
            token: postAdd.token,
            userId: postAdd.userId
      });

      return response.data;
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          
          return "token_Notification erro"
        } else {
          return "servidor erro"
        }
      } else {
       
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationAddTN };
};