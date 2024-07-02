import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import First from '../First/First';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ChooseOne from '../ChooseOne/ChooseOne';
import CodGroup from '../CodGroup/CodGroup';
import ChooseCategory from '../ChooseCategory/ChooseCategory';
import InforGroupMember from '../InforGroupMember/InforGroupMember';
import Group from '../Group/Group';
import SeeMurals from '../SeeMurals/SeeMurals';
import ChooseGroup from '../ChooseGroup/ChooseGroup';
import ChooseMural from '../ChooseMural/ChooseMural';
import Posts from '../Posts/Posts';
import UserPost from '../UserPost/UserPost';
import Configuration from '../Configuration/Configuration';
import Profile from '../Profile/Profile';
import Home from '../Home/Home';
import Mural from '../Mural/Mural';
import ChooseGroupMember from '../ChooseGroupMember/ChooseGroupMember';
import ChooseMuralMember from '../ChooseMuralMember/ChooseMuralMember';
import ChooseMember from '../ChooseMember/ChooseMember';
import AccessKey from '../AccessKey/AccessKey';

export default function Main() {

    const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="white" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="First" component={First} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ChooseOne" component={ChooseOne} />
        <Stack.Screen name="CodGroup" component={CodGroup} />
        <Stack.Screen name="ChooseCategory" component={ChooseCategory} />
        <Stack.Screen name="InforGroupMember" component={InforGroupMember} />
        <Stack.Screen name="Group" component={Group} />
        <Stack.Screen name="Mural" component={Mural} />
        <Stack.Screen name="SeeMurals" component={SeeMurals} />
        <Stack.Screen name="ChooseGroup" component={ChooseGroup} />
        <Stack.Screen name="ChooseMural" component={ChooseMural} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="UserPost" component={UserPost} />
        <Stack.Screen name="Configuration" component={Configuration} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ChooseGroupMember" component={ChooseGroupMember} />
        <Stack.Screen name="ChooseMuralMember" component={ChooseMuralMember} />
        <Stack.Screen name="ChooseMember" component={ChooseMember} />
        <Stack.Screen name="AccessKey" component={AccessKey} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
