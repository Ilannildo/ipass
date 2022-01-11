import React from 'react';
import { Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

type Props = RectButtonProps & {
  label: string;
  categorie: string;
  color: number;
  date: string;
  time: string;
  description: string;
  passwordForce: string;
  onEdit: () => void;
  onDetail: () => void;
};

export const Card: React.FC<Props> = ({
  color,
  date,
  label,
  description,
  time,
  onDetail,
  ...rest
}) => {
  const { colors } = useCustomTheme();
  // const rgba = hexToRgbA(color.toString());
  return (
    <>
      <RectButton
        {...rest}
        onPress={onDetail}
        style={[
          styles.container,
          {
            backgroundColor:
              color === 1
                ? colors.color1
                : color === 2
                ? colors.color2
                : color === 3
                ? colors.color3
                : color === 4
                ? colors.color4
                : colors.color5,
          },
        ]}>
        <View>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            {label}
          </Text>
          <Text
            numberOfLines={1}
            style={[styles.subtitle, { color: colors.onSurfaceVariant }]}>
            {description || 'Uma breve observação se o usuário quiser'}
          </Text>
          <View style={styles.footer}>
            <View style={styles.item}>
              <MaterialIcons
                name="date-range"
                size={10}
                color={colors.tertiary}
              />
              <Text style={[styles.footertext, { color: colors.tertiary }]}>
                {date ? date : '01 de jan de 2021'}
              </Text>
            </View>
            <View style={styles.item}>
              <MaterialIcons
                name="access-time"
                size={10}
                color={colors.tertiary}
              />
              <Text style={[styles.footertext, { color: colors.tertiary }]}>
                {time ? time : '00:00'}
              </Text>
            </View>
          </View>
        </View>
        {/* Aqui vai o botão de favoritar */}
      </RectButton>
      <View style={{ marginBottom: 16 }} />
    </>
  );
};
