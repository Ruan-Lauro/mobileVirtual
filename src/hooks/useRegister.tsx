import axios, { AxiosError } from 'axios';
import api from "../Services/Api";

export type user = {
    name : string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    isAdmin: boolean,
    id?: string,
    profile_image?: string,
  }

interface UseRegisterResult {
  authenticationR: (user:user) => Promise<any>;
}



export const useRegister = (): UseRegisterResult => {
 

  const authenticationR = async (user: user) => {
    try {
      const response = await api.post  ('users', {
        name : user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        isAdmin: user.isAdmin,
      });

      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 400) {
          return "user erro"
        }else{
          return "servidor erro"
        }
      } else {
        console.error('Erro desconhecido:', error)
      }
    }

  };

  return { authenticationR };
};