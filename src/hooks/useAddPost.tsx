import api from "../Services/Api";

interface useAddPostResult {
  authenticationAddP: (postAdd: createPost) => Promise<string>;
}

export type createPost = {
    category: string,
    memberId: string,
    muralId: number,
    content?: string,
    media?: string[],
}

export const useAddPost = (): useAddPostResult => {

  const authenticationAddP = async (postAdd: createPost) => {
    try {
      const response = await api.post('/posts', {
        memberId: postAdd.memberId,
        muralId: postAdd.muralId,
        content: postAdd.content,
        media: postAdd.media,
        id: 1,
      });


      return response.data;
    } catch (error) {
      console.log(error)
      return 'Não passou';
    }

  };

  return { authenticationAddP };
};