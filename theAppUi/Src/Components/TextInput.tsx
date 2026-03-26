import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import Colors from '../Constant/Color';

interface TextinputProp {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<TextinputProp> = ({
  placeholder,
  value,
  onChangeText,
  ...props
}) => {

  return (
    <View style={{
      backgroundColor:'white'
    }}>
 
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.seventh}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        {...props}
      />
   

    </View>
    
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.seventh,
    backgroundColor: 'white',
    borderRadius: 20,
    

    padding: 15,
    marginBottom: 12,
  },
});
