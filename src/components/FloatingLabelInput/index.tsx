import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
} from 'react-native';
import { useRem } from 'responsive-native';
import { theme } from '../../styles/theme';

type Props = TextInputProps & {
  label: string;
};

interface InputReference extends TextInput {
  value: string;
}

export const FloatingLabelInput: React.FC<Props> = ({ label, ...rest }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isFilled, setIsFilled] = useState<boolean>(false);
  const inputRef = useRef<InputReference>(null);
  const rem = useRem();

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (inputRef.current) {
      setIsFilled(!!inputRef.current.value);
    }
  }, []);

  const handleChangeText = useCallback(text => {
    if (inputRef.current) {
      inputRef.current.value = text;
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: isFocused
            ? theme.colors.primary
            : theme.colors.grey,
          borderBottomWidth: isFocused ? 2 : 1,
        },
      ]}>
      <Text
        style={[
          styles.placeholderLabel,
          {
            top: isFocused || isFilled ? -8 : +18,
            fontSize: isFocused || isFilled ? 13 : 16,
            color:
              isFocused || isFilled ? theme.colors.primary : theme.colors.grey,
          },
        ]}>
        {label}
      </Text>
      <TextInput
        {...rest}
        ref={inputRef}
        keyboardAppearance="default"
        placeholderTextColor={theme.colors.grey}
        style={[styles.labeledInput, { fontSize: rem(1) }]}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    marginTop: 25,
  },
  placeholderLabel: {
    position: 'absolute',
    left: 0,
  },
  labeledInput: {
    marginTop: 10,
    color: theme.colors.black,
    fontWeight: '500',
  },
});
