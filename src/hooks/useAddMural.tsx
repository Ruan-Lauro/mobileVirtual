import api from "../Services/Api";

interface useAddMuralResult {
  authenticationAddM: (MuralAdd: createMural) => Promise<string>;
}

export type createMural = {
    name: string;
    groupId: string;
    category: string;
    imgMural: string;
    isPrivate: boolean;
}

export const useAddMural = (): useAddMuralResult => {

  const authenticationAddM = async (MuralAdd: createMural) => {
    try {
      const response = await api.post('/murals/', {
        name: MuralAdd.name,
        groupId: MuralAdd.groupId,
        imgMural: MuralAdd.imgMural,
        category: MuralAdd.name,
        isPrivate: MuralAdd.isPrivate
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationAddM };
};