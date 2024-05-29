import api from "../Services/Api";

interface usePutUserResult {
  authenticationPutU: (postAdd: putUser) => Promise<string>;
}

export type putUser = {
    name?: string,
    email?: string,
    password?: string,
    username?: string,
    id: string,
    profile_image?: string | any,
}

export const usePutUser = (): usePutUserResult => {

  const authenticationPutU = async (userPut: putUser) => {
    try {
      const response = await api.put('/users/'+userPut.id, {
        name: userPut.name,
        email: userPut.email,
        password:userPut.password,
        confirmPassword: userPut.password,
        username: userPut.username,
        profile_image: userPut.profile_image,
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationPutU };
};