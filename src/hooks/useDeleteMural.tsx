import api from "../Services/Api";

interface useDeleteMuralResult {
  authenticationRM: (id: number | string) => Promise<string>;
}



export const useDeleteMural = (): useDeleteMuralResult => {

  const authenticationRM = async (id: number | string) => {
    try {
      const response = await api.delete('/murals/'+id);

      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationRM };
};