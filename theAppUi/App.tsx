import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Platform, View } from 'react-native';
// import { SheetProvider } from 'react-native-actions-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
// import { ToastProvider } from 'react-native-toast-notifications';
import AppNavigator from './Src/Naviagtor/AppNavigator';
// import CustomToast, { ToastType } from './src/components/atoms/CustomToast';
import { rootNavigationRef } from './Src/Naviagtor/rootNavigation';

// import './src/helper/sheets';
// import { CustomThemeProvider } from './src/provider/themeProvider';
import { QueryProvider } from './Src/provider/QueryProvider';

const AppContent = () => {
  const insets = useSafeAreaInsets();

  // const androidExtraPadding =
  //   Platform.OS === 'android' && Platform.Version > 29 ? 0 : 0;

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: Platform.OS === 'ios' ? 0 : insets.bottom,
      }}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
   
          <QueryProvider>
          
              <NavigationContainer ref={rootNavigationRef}>
                <AppNavigator />
              </NavigationContainer>
          
          </QueryProvider>
      
     
      </GestureHandlerRootView>
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

export default App;
