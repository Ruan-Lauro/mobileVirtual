import api from "../Services/Api";

interface useDeleteMuralResult {
  authenticationDP: (id: string) => Promise<string>;
}



export const useDeletePost = (): useDeleteMuralResult => {

  const authenticationDP = async (id: string) => {
    try {
      const response = await api.delete('/posts/'+id);

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationDP };
};