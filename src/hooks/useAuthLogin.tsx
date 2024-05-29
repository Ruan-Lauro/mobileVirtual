
import api from "../Services/Api";

interface UseAuthLoginResult {
  authenticationE: (email: string, password: string) => Promise<any>;
}

export const useAuthLogin = (): UseAuthLoginResult => {
 


  const authenticationE = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationE };
};


