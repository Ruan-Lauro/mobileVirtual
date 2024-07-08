import api from "../Services/Api";

interface useDeleteMemberResult {
  authenticationDME: (id: string) => Promise<string>;
}



export const useDeleteMember = (): useDeleteMemberResult => {

  const authenticationDME = async (id: string) => {
    try {
      const response = await api.delete('/members/'+id);

      return response.data;
    } catch (error) {
  
      return 'Não passou';
    }

  };

  return { authenticationDME };
};