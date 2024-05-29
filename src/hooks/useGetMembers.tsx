
import api from "../Services/Api";

interface useAddMemberResult {
  authenticationGetM: () => Promise<member[]>;
}

export type member = {
    id: string,
    category: string,
    created_at: string,
    userId: string,
    groupId: string,
}

export const useGetMembers = (): useAddMemberResult => {
 


  const authenticationGetM = async () => {
    try {
      const response = await api.get('/members/');

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationGetM };
};