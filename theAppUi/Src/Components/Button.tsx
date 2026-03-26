import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  ActivityIndicator,
  Image,
  ImageProps,
} from 'react-native';
import Colors from '../Constant/Color';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  iconName?: ImageProps;
  custombackgroundColor?: string;
  titleColor?: string;
  fontSize?: number; // Added fontSize as an optional prop
}

const Button: React.FC<ButtonProps> = ({
  loading,
  disabled,
  onPress,
  custombackgroundColor = '',
  titleColor = '',
  title,
  iconName = '',
  style,
  fontSize = 16, // Default fontSize
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        {
          backgroundColor:
            disabled && !loading
              ? '#E5E5E5'
              : custombackgroundColor !== ''
              ? custombackgroundColor
              : Colors.secondary,
        },
      ]}
      onPress={onPress}
      {...props}
      disabled={loading || disabled}
    >
      {loading && (
        <ActivityIndicator style={{ marginLeft: 10 }} color="white" />
      )}
      {iconName && <Image source={iconName} style={styles.buttonIconStyle} />}
      <Text
        style={[
          styles.title,
          {
            color:
              disabled && !loading
                ? '#707070'
                : titleColor !== ''
                ? titleColor
                : 'white',
            fontSize: fontSize, // Use the fontSize prop here
          },
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16, // Default fontSize if not provided
    color: '#fff',
    textAlign: 'left',
    marginHorizontal: 10,
  },
  container: {
    borderRadius: 100,
    flexDirection: 'row',
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  buttonIconStyle: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
});

export default Button;
