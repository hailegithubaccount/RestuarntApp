import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../Screens/Login";   
import Register from "../Screens/Register";
import Fetch from "../Screens/fetch";
import Profile from "../Screens/profile"
import Delete from "../Screens/Delete";
import TabNavigatort from './TabNavigatort';
import Bag from "../Screens/Bag";
import favourite from "../Screens/favourite";
import Cart from "../Screens/Cart";
import QuantityPage from "../Screens/QuantityPage";


export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Fetch:undefined;
  Profile:undefined;
  Delete:undefined;
  TabNavigatort:undefined
  Bag:undefined
  favourite :undefined
  Cart:undefined
  QuantityPage :undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"> 
         <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="TabNavigatort"
          component={TabNavigatort} 
          options={{ headerShown: false }} 
        />

        <Stack.Screen 
          name="Bag"
          component={Bag} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="favourite" 
          component={favourite} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Fetch"
          component={Fetch} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen 
          name="Cart"
          component={Cart} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
         name="QuantityPage"
          component={QuantityPage} 
          options={{ headerShown: false }} 
        />




      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
