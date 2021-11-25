import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

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
  const { colors } = useCustomTheme();

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
    let chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;
    let forca = 0;

    if (pass.length >= 6 && pass.length <= 8) {
      forca += 10;
    } else if (pass.length > 8) {
      forca += 25;
    } else {
      forca -= 20;
    }
    if (pass.match(/[a-z]+/)) {
      forca += 10;
    }
    if (pass.match(/[A-Z]+/)) {
      forca += 20;
    }
    if (pass.match(chEspeciais)) {
      forca += 20;
    }
    if (pass.match(/W+/)) {
      forca += 25;
    }

    return forca;
  };

  const handleChangeText = useCallback(
    (text: string) => {
      if (inputRef.current) {
        inputRef.current.value = text;
        const force = verifyPasswordForce(text);
        if (force < 30) {
          setForcePasword('fraca');
        } else if (force >= 30 && force < 60) {
          setForcePasword('media');
        } else {
          setForcePasword('forte');
        }
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
            ? colors.error
            : isFocused
            ? colors.primary
            : colors.onOutline,
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
              ? colors.error
              : isFocused || isFilled
              ? colors.primary
              : colors.onOutline,
          },
        ]}>
        {label}
      </Text>
      <TextInput
        {...rest}
        ref={inputRef}
        keyboardAppearance="default"
        placeholderTextColor={colors.outline}
        style={[styles.labeledInput, { color: colors.onPrimaryContainer }]}
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
                    ? colors.error
                    : forcePassword === 'media'
                    ? colors.warning
                    : forcePassword === 'forte'
                    ? colors.success
                    : colors.onOutline,
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  forcePassword === 'media'
                    ? colors.warning
                    : forcePassword === 'forte'
                    ? colors.success
                    : colors.onOutline,
              },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                backgroundColor:
                  forcePassword === 'forte' ? colors.success : colors.onOutline,
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
    // color: theme.colors.black,
    fontWeight: '500',
    fontSize: 16,
  },
  line: {
    width: '32%',
    height: 2,
  },
  indicatorForce: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
