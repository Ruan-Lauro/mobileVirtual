import api from "../Services/Api";

interface useAddGroupResult {
  authenticationAddG: (groupAdd: createGroup) => Promise<any>;
}

export type createGroup = {
    name: string;
    userId: string;
    imgGroup: string;
}

export const useAddGroup = (): useAddGroupResult => {

  const authenticationAddG = async (groupAdd: createGroup) => {
    try {
      const response = await api.post('/groups/', {
        name: groupAdd.name,
        userId: groupAdd.userId,
        imgGroup: groupAdd.imgGroup,
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationAddG };
};