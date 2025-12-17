import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {colors} from '@/theme';

type ButtonVariant = 'primary' | 'ghost' | 'outline';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = styles.button;
    
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          ...styles.primaryButton,
          opacity: disabled || loading ? 0.6 : 1,
        };
      case 'ghost':
        return {
          ...baseStyle,
          ...styles.ghostButton,
          opacity: disabled || loading ? 0.6 : 1,
        };
      case 'outline':
        return {
          ...baseStyle,
          ...styles.outlineButton,
          opacity: disabled || loading ? 0.6 : 1,
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = styles.buttonText;
    
    switch (variant) {
      case 'primary':
        return {...baseStyle, ...styles.primaryText};
      case 'ghost':
        return {...baseStyle, ...styles.ghostText};
      case 'outline':
        return {...baseStyle, ...styles.outlineText};
      default:
        return baseStyle;
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}>
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary}
          size="small"
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  ghostButton: {
    backgroundColor: 'transparent',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: colors.white,
  },
  ghostText: {
    color: colors.primary,
  },
  outlineText: {
    color: colors.primary,
  },
});

export default Button;

