import { Image, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Assets } from '../Assets';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { useUserStore } from '../store/userStore';
import { Platform } from 'react-native';
import Notification from '../Screens/Notification';
import Bag from '../Screens/Bag';
import Home from '../Screens/Home';
import favourite from '../Screens/favourite';


const Tab = createBottomTabNavigator();

interface ItabBar {
  icon: any;
  size: number;
}

const TabBarIcon: React.FC<ItabBar> = ({ icon, size }) => {
  return <Image source={icon} style={{ width: 25, height: 25 }} />;
};

function BottomNavigator() {
  const insets = useSafeAreaInsets();

  // const {translation} = useTranslationStore(({translation}) => ({translation}));

  // const local = translation.bottom;
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          const rn = route.name;
          if (rn === "Home") {
            iconName = focused ? Assets.ActiveHome : Assets.homeIcon;
          } else if (rn === "Bag") {
            iconName = focused ? Assets.BagActive : Assets.Bag;
          } else if (rn === "favourite") {
            iconName = focused ? Assets.ActiveHeart : Assets.heartIcon;
          } else if (rn === "Notification ") {
            iconName = focused ? Assets.ActiveNotification : Assets.Notification;
          }
          return <TabBarIcon icon={iconName} size={30} />;
        },
        tabBarLabel: ({ focused }) => {
          const rn = route.name;
          let label;
          if (rn === "Home") {
            label = 'Home';
          } else if (rn === "Bag") {
            label = 'Bag';
          } else if (rn === "favourite") {
            label = 'fav'
          } else if (rn === "Notification ") {
            label = 'notify'
          }
          return (
            <Text
              style={{
                fontSize: 14,


              }}>
              {label}
            </Text>
          );
        },
        headerShown: false,
        tabBarStyle: {
          height: (Platform.OS === 'ios' ? 80 : 65) + insets.bottom,
          backgroundColor: '#252A32',

          borderTopWidth: 0,
          paddingBottom: (Platform.OS === 'ios' ? 12 : 5) + insets.bottom,
        },
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen name={"Home"} component={Home} />
      <Tab.Screen name={"Bag"} component={Bag} />
      <Tab.Screen name={"favourite"} component={favourite} />
      <Tab.Screen name={"Notification "} component={Notification} />


    </Tab.Navigator>
  );
}
export default BottomNavigator;
