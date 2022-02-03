import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Button } from '../../components/design/Button';
import { useCustomTheme } from '../../contexts/theme';
import { Slider } from '@miblanchard/react-native-slider';
import { styles } from './styles';

export const Generate: React.FC = () => {
  const { colors } = useCustomTheme();
  const [length, setLength] = useState<number>(8);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [number, setNumber] = useState(true);
  const [chars, setChars] = useState(true);
  const [password, setPassword] = useState('');

  const MAIUSCULAS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const MINUSCULAS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMEROS = '0123456789';
  const CARACTERES = '!@#$%^&*()+?><:';

  const handleGeneratePassword = () => {
    let passGenerate = '';
    let charsList = '';

    if (upper) {
      charsList = charsList + MAIUSCULAS;
    }
    if (lower) {
      charsList = charsList + MINUSCULAS;
    }
    if (number) {
      charsList = charsList + NUMEROS;
    }
    if (chars) {
      charsList = charsList + CARACTERES;
    }

    for (let index = 0; index < length; index++) {
      const randomNumber = Math.floor(Math.random() * charsList.length);
      passGenerate += charsList.substring(randomNumber, randomNumber + 1);
    }
    setPassword(passGenerate);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
          Gerador de senhas
        </Text>
        <Text style={[styles.subtitle, { color: colors.onSecondaryContainer }]}>
          Aleatório, Simples e Seguro!
        </Text>
      </View>

      <View style={styles.inputArea}>
        <TextInput
          editable={false}
          value={password}
          style={[
            styles.input,
            {
              borderColor: colors.outline,
              backgroundColor: colors.surface2,
              color: colors.onSurface,
            },
          ]}
        />

        <View style={styles.passArea}>
          <View style={styles.passItem}>
            <Checkbox
              status={upper ? 'checked' : 'unchecked'}
              onPress={() => setUpper(!upper)}
            />
            <Text>ABC</Text>
          </View>
          <View style={styles.passItem}>
            <Checkbox
              status={lower ? 'checked' : 'unchecked'}
              onPress={() => setLower(!lower)}
            />
            <Text>abc</Text>
          </View>
          <View style={styles.passItem}>
            <Checkbox
              status={number ? 'checked' : 'unchecked'}
              onPress={() => setNumber(!number)}
            />
            <Text>123</Text>
          </View>
          <View style={styles.passItem}>
            <Checkbox
              status={chars ? 'checked' : 'unchecked'}
              onPress={() => setChars(!chars)}
            />
            <Text>{'#$&'}</Text>
          </View>
        </View>

        <View style={styles.slideArea}>
          <Slider
            value={length / 100}
            onValueChange={value => setLength(value * 100)}
            maximumValue={0.32}
            minimumValue={0.06}
            step={0.01}
          />
          <Text>Tamanho da senha: {length.toFixed(0)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="Gerar senha" onPress={() => handleGeneratePassword()} />
      </View>
    </View>
  );
};
