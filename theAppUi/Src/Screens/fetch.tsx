import React, { useState } from 'react';
import { Alert, Text, TextInput, View, Button, ActivityIndicator, ImageBackground } from 'react-native';
import { useGetUserInfo } from '../Hooks/auth';

  import { useBackgroundStore } from '../store/useBackgroundStore';
 

const Fetch = () => {
  const [email, setEmail] = useState('');
  const [targetEmail, setTargetEmail] = useState('');
  const background = useBackgroundStore((state) => state.background);

  const { data: userInfo, isLoading, isError } = useGetUserInfo(targetEmail);

  const handleFetch = () => {
    if (!email) {
      Alert.alert('Error', 'Email is needed');
      return;
    }
    setTargetEmail(email);
  };


  return (
      <ImageBackground
      source={background}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >


    <View style={{ marginTop: 50, padding: 20 }}>
      <TextInput
        placeholder="Enter email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, color: 'white' }}
        placeholderTextColor="gray"
      />
      <Button title="Fetch User Info" onPress={handleFetch} />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />}

      {userInfo && (
        <View style={{ marginTop: 20, backgroundColor: 'rgba(0,0,0,0.5)', padding: 15, borderRadius: 10 }}>
          <Text style={{ color: 'white' }}>Username: {userInfo.username}</Text>
          <Text style={{ color: 'white' }}>Email: {userInfo.email}</Text>
        </View>
      )}

      {isError && (
        <Text style={{ color: 'red', marginTop: 10 }}>Failed to fetch user info.</Text>
      )}
    </View>
    </ImageBackground>
  );
};

export default Fetch;
