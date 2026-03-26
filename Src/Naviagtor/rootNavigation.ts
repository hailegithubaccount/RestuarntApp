import { createNavigationContainerRef } from '@react-navigation/native';

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export const rootNavigationRef =
  createNavigationContainerRef<RootStackParamList>();

export const resetToAuthNavigator = () => {
  if (!rootNavigationRef.isReady()) return;

  rootNavigationRef.resetRoot({
    index: 0,
    routes: [{ name: 'Auth' }],
  });
};
