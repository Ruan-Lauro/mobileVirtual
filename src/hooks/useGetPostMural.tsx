import api from "../Services/Api";

interface useGetPostsMuralResult {
  authenticationGetPM: (muralId: number) => Promise<posts[]>;
}

export type posts = {
    id: string,
    category: string,
    created_at: string,
    memberId: string,
    muralId: number,
    content: string,
    media: string[],
}

export const useGetPostsMural = (): useGetPostsMuralResult => {
 


  const authenticationGetPM = async (muralId: number) => {
    try {
      const response = await api.get('/posts/mural/'+muralId);

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou PostMural';
    }

  };

  return { authenticationGetPM };
};