
import api from "../Services/Api";

export type feedback = {
    name : string,
    text: string,
    email: string,  
  }

interface UseFeedbackResult {
  authenticationFe: (feedback:feedback) => Promise<any>;
}



export const useFeedback = (): UseFeedbackResult => {
 

  const authenticationFe = async (feedback:feedback) => {
    try {
      const response = await api.post  ('users/feedback/', {
        name : feedback.name,
        text: feedback.text,
        email: feedback.email
        
      });

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Aconteceu um erro';
    }

  };

  return { authenticationFe };
};