import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import React from 'react';
import TabRoutes from './tab.routes';


const Tab = createBottomTabNavigator()

export default function Routes(){
    return(
        <TabRoutes/>
    )
}