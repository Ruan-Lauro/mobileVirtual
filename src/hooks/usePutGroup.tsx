import api from "../Services/Api";

interface usePutGroupResult {
  authenticationPutG: (groupPut: putGroup) => Promise<string>;
}

export type putGroup = {
    name?: string, 
    userId: string, 
    imgGroup?: string,
    id: string,
}

export const usePutGroup = (): usePutGroupResult => {

  const authenticationPutG = async (groupPut: putGroup) => {
    try {
      const response = await api.put('/groups/'+groupPut.userId, {
        name: groupPut.name,
        imgGroup: groupPut.imgGroup,
       
      });


      return response.data;
    } catch (error) {
     
      return 'Não passou';
    }

  };

  return { authenticationPutG };
};