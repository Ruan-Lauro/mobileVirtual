import api from "../Services/Api";

interface useGetPostsResult {
  authenticationGetP: () => Promise<posts[]>;
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

export const useGetPosts = (): useGetPostsResult => {
 


  const authenticationGetP = async () => {
    try {
      const response = await api.get('/posts/');

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationGetP };
};