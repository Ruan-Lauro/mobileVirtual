import api from "../Services/Api";

interface useDeleteMuralResult {
  authenticationDNT: (id: string) => Promise<string>;
}

export const useDeleteTokenNotifcation = (): useDeleteMuralResult => {

  const authenticationDNT = async (id: string) => {
    try {
      const response = await api.delete('/tokenNotification/'+id);

      return response.data;
    } catch (error) {
      
      return 'Não passou';
    }

  };

  return { authenticationDNT };
};