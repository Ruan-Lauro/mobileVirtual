export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  ChooseOne: { NewUser?: { 
    name: string;
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }};
  Login: undefined;
  First: undefined;
  CodGroup: undefined;
  ChooseCategory: { groupChoose?: { 
    id: string;
    name: string;
    created_at: Date;
    imgGroup: string;
    groupCode: number;
    userId: string;
  }};
  InforGroupMember:  { groupChoose?: { 
    id: string;
    name: string;
    created_at: Date;
    imgGroup: string;
    groupCode: number;
    userId: string;
  }};
  Group: undefined;
  Mural: undefined;
  SeeMurals: undefined;
  ChooseGroup: undefined;
  ChooseMural:  { groupChoose?: { 
    id: string;
    name: string;
    created_at: Date;
    imgGroup: string;
    groupCode: number;
    userId: string;
  }};
  Posts: { muralChoose?: { 
    id: number;
    name: string;
    created_at: Date;
    imgMural: string;
    category: string;
    groupId: string;
  }};
  Configuration: undefined;
  Profile: undefined;
  UserPost: undefined;
  ChooseGroupMember: undefined;
  ChooseMuralMember:{ groupChoose?: { 
    id: string;
    name: string;
    created_at: Date;
    imgGroup: string;
    groupCode: number;
    userId: string;
  }};
  ChooseMember:  { muralChoose?: { 
    id: number;
    name: string;
    created_at: Date;
    imgMural: string;
    category: string;
    groupId: string;
  }};
  AccessKey: undefined;
  Help: undefined;
};