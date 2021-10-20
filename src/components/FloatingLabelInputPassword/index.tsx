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
  isPassword?: boolean;
  error?: boolean;
};

interface InputReference extends TextInput {
  value: string;
}

export const FloatingLabelInputPassword: React.FC<Props> = ({
  label,
  isPassword = false,
  onChangeText,
  error = false,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [forcePassword, setForcePasword] = useState<string>('');
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

  const verifyPasswordForce = (pass: string) => {
    let numeros = /([0-9])/;
    let alfabeto = /([a-zA-Z])/;
    let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

    if (pass.length < 6) {
      setForcePasword('fraca');
    } else {
      if (
        pass.match(numeros) &&
        pass.match(alfabeto) &&
        pass.match(chEspeciais)
      ) {
        setForcePasword('forte');
      } else {
        setForcePasword('media');
      }
    }
  };

  const handleChangeText = useCallback(
    (text: string) => {
      if (inputRef.current) {
        inputRef.current.value = text;
        verifyPasswordForce(text);
        setIsFilled(!!text);
      }
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: error
            ? theme.colors.error
            : isFocused
            ? theme.colors.primary
            : theme.colors.grey,
          borderBottomWidth: isPassword && isFilled ? 0 : isFocused ? 2 : 1,
        },
      ]}>
      <Text
        style={[
          styles.placeholderLabel,
          {
            top: isFocused || isFilled ? -8 : +18,
            fontSize: isFocused || isFilled ? 13 : 16,
            color: error
              ? theme.colors.error
              : isFocused || isFilled
              ? theme.colors.primary
              : theme.colors.grey,
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
      {isPassword && isFilled && (
        <View style={styles.indicatorForce}>
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  forcePassword === 'fraca'
                    ? theme.colors.error
                    : forcePassword === 'media'
                    ? theme.colors.warning
                    : forcePassword === 'forte'
                    ? theme.colors.success
                    : theme.colors.grey,
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  forcePassword === 'media'
                    ? theme.colors.warning
                    : forcePassword === 'forte'
                    ? theme.colors.success
                    : theme.colors.grey,
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  forcePassword === 'forte'
                    ? theme.colors.success
                    : theme.colors.grey,
              },
            ]}
          />
        </View>
      )}
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
    marginTop: 5,
    color: theme.colors.black,
    fontWeight: '500',
  },
  line: {
    width: '32%',
    height: 2,
    backgroundColor: theme.colors.grey,
  },
  indicatorForce: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
