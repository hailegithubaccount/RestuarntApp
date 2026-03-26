import React from 'react';
import { View, Text, Button } from 'react-native';
import { useUserStore } from '../store/userStore';

export default function Dashboard() {
  const user = useUserStore(state => state.user);  
  const logout = useUserStore(state => state.logout); 

  return (
    <View style={{
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1 
    }}>
      {user ? (
        <>
          <Text style={{ fontSize: 20, marginBottom: 10 }}>
            Welcome {user.username || user.name || 'User'}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: 20 }}>
            Role: {user.email || 'N/A'}
          </Text>
          <Button title="Logout" onPress={logout} />
        </>
      ) : (
        <Text style={{ fontSize: 18 }}>No user logged in</Text>
      )}
    </View>
  );
}
