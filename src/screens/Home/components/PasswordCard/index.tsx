import React from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableOpacityProps,
  ColorValue,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useCustomTheme } from '../../../../contexts/theme';

type Props = TouchableOpacityProps & {
  label: string;
  categorie: string;
  color: ColorValue;
  date: string;
  time: string;
  passwordForce: string;
  onEdit: () => void;
  onView: () => void;
};

export const PasswordCard: React.FC<Props> = ({
  label,
  categorie,
  date,
  time,
  color,
  passwordForce,
  onEdit,
  onView,
}) => {
  const { colors } = useCustomTheme();
  return (
    <TouchableOpacity
      onPress={onView}
      style={[
        styles.container,
        { backgroundColor: color ? color : colors.tertiaryContainer },
      ]}>
      <View style={styles.left}>
        <View style={[styles.leftTop, { borderColor: colors.outline }]}>
          <Text
            style={[styles.leftTopText, { color: colors.onPrimaryContainer }]}>
            {categorie ? categorie : 'Categoria'}
          </Text>
        </View>
        <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
          {label ? label : 'Título'}
        </Text>
        <View style={styles.footer}>
          <View style={styles.item}>
            <MaterialIcons
              name="date-range"
              size={10}
              color={colors.onPrimaryContainer}
            />
            <Text
              style={[styles.footertext, { color: colors.onPrimaryContainer }]}>
              {date ? date : '01 de jan de 2021'}
            </Text>
          </View>
          <View style={styles.item}>
            <MaterialIcons
              name="access-time"
              size={10}
              color={colors.onPrimaryContainer}
            />
            <Text
              style={[styles.footertext, { color: colors.onPrimaryContainer }]}>
              {time ? time : '00:00'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <TouchableOpacity style={styles.rightEditBtn} onPress={onEdit}>
          <Feather name="edit" size={20} color={colors.onPrimaryContainer} />
        </TouchableOpacity>
        <View style={styles.rightFooter}>
          <View style={styles.item}>
            <MaterialIcons
              name="lock-outline"
              size={12}
              color={colors.onPrimaryContainer}
            />
            <Text
              style={[styles.footertext, { color: colors.onPrimaryContainer }]}>
              Nível da senha
            </Text>
          </View>
          <Text style={[styles.passwordForce, { color: colors.error }]}>
            {passwordForce ? passwordForce : 'FORÇA'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 350,
    height: 100,
    maxHeight: 150,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    justifyContent: 'space-between',
    width: '50%',
  },
  leftTop: {
    width: 70,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    opacity: 0.5,
  },
  leftTopText: {
    fontSize: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  footer: {
    justifyContent: 'space-between',
  },
  footertext: {
    fontSize: 12,
    marginLeft: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'flex-end',
  },
  rightEditBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightFooter: {
    alignItems: 'center',
  },
  passwordForce: {
    fontSize: 16,
    fontWeight: '500',
  },
});
