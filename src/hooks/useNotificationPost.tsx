import axios from "axios";
import api from "../Services/Api";

interface useAddNotificationResult {
    authenticationAddNPN: (postAdd: createNotification) => Promise<string>;
}

export type createNotification = {
    groupId: string;
    message: string;
    userId: string;
}

export const useAddNotification = (): useAddNotificationResult => {

  const authenticationAddNPN = async (postAdd: createNotification) => {
    console.log("Passei por aqui!")
    try {
     
      const response = await api.post('/tokenNotification//send-notification', {
            groupId: postAdd.groupId,
            message: postAdd.message,
            userId: postAdd.userId,
      });

      return response.data;
     
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          
          return "Não enviou, deu erro"
        } else {
          return "servidor erro"
        }
      } else {
       
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationAddNPN };
};