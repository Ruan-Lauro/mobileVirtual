
import api from "../Services/Api";

interface useAddMemberResult {
  authenticationAddM: (userId: string, cod: string) => Promise<string>;
}

export const useAddMember = (): useAddMemberResult => {
 


  const authenticationAddM = async (userId: string, code: string) => {
    try {
      const response = await api.post('/members/'+userId, {
        userId: userId,
        code: code,
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationAddM };
};

