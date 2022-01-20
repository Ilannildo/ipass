import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  Linking,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { StorageSchemaType } from '../../utils/storage';
import { styles } from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { maskDate, maskPass, maskTime } from '../../utils/masks';
import { RoundButton } from '../../components/design/RoundButton';
import { AppRoutesListParams } from '../../routes/home.route';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Clipboard from '@react-native-clipboard/clipboard';

export const Detail: React.FC = () => {
  const route = useRoute();
  const { colors, schemeColor } = useCustomTheme();
  const [visiblePassword, setVisiblePassword] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<AppRoutesListParams>>();

  const {
    _id,
    name,
    description,
    date,
    color,
    time,
    login,
    password,
    categorie,
    force,
  } = route.params as StorageSchemaType;

  const handleCopyPassword = (pass: string) => {
    Clipboard.setString(pass);
    ToastAndroid.show('Senha copiada para a área de transferência', 500);
  };

  const handleCopyLogin = (lo: string) => {
    Clipboard.setString(lo);
    ToastAndroid.show('Login copiado para a área de transferência', 500);
  };

  const handleOpenSite = async () => {
    ToastAndroid.show('Redirecionando para o navegador', 500);
    await Linking.openURL(`http://${description}`);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
      />
      <ScrollView>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.onSurface }]}>
            {name || 'Title'}
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity
            onPress={() => handleOpenSite()}
            style={[
              styles.contentItem,
              { borderBottomColor: colors.secondaryContainer },
            ]}>
            <View style={styles.contentTop}>
              <MaterialIcons name="web" color={colors.outline} size={16} />
              <Text style={[styles.itemTitle, { color: colors.outline }]}>
                Endereço na internet (URL)
              </Text>
            </View>
            <View style={styles.contentBottom}>
              <Text style={[styles.itemText, { color: colors.onSurface }]}>
                {`https://www.${description}` || 'Nenhuma url foi informada :('}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={[
              styles.contentMiddle,
              { borderBottomColor: colors.secondaryContainer },
            ]}>
            <View style={styles.contentTop}>
              <MaterialIcons
                name="date-range"
                color={colors.outline}
                // style={styles.icon}
                size={16}
              />
              <Text style={[styles.itemTitle, { color: colors.outline }]}>
                Data de criação
              </Text>
            </View>
            <View
              style={[
                styles.itemRight,
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
              <Text
                style={[styles.itemText, { color: colors.onPrimaryContainer }]}>
                {maskDate(date) || 'Not found'}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.contentMiddle,
              { borderBottomColor: colors.secondaryContainer },
            ]}>
            <View style={styles.contentTop}>
              <MaterialIcons
                name="access-time"
                color={colors.outline}
                // style={styles.icon}
                size={16}
              />
              <Text style={[styles.itemTitle, { color: colors.outline }]}>
                Hora de criação
              </Text>
            </View>
            <View
              style={[
                styles.itemRight,
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
              <Text
                style={[styles.itemText, { color: colors.onPrimaryContainer }]}>
                {maskTime(time) || 'Nenhum descrição foi informada'}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onLongPress={() => handleCopyLogin(login)}
            style={[
              styles.contentItem,
              { borderBottomColor: colors.secondaryContainer },
            ]}>
            <View style={styles.contentTop}>
              <MaterialIcons
                name="assignment-ind"
                color={colors.outline}
                // style={styles.icon}
                size={16}
              />
              <Text style={[styles.itemTitle, { color: colors.outline }]}>
                Login
              </Text>
            </View>
            <View style={styles.contentBottom}>
              <Text style={[styles.itemText, { color: colors.onSurface }]}>
                {login || 'Nenhum login foi encontrado'}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onLongPress={() => handleCopyPassword(password)}
            style={[
              styles.contentItem,
              { borderBottomColor: colors.secondaryContainer },
            ]}>
            <View style={styles.contentTop}>
              <MaterialIcons
                name="lock"
                color={colors.outline}
                // style={styles.icon}
                size={16}
              />
              <Text style={[styles.itemTitle, { color: colors.outline }]}>
                Senha
              </Text>
            </View>
            <View style={styles.contentBottom}>
              <Text style={[styles.itemText, { color: colors.onSurface }]}>
                {visiblePassword ? password : maskPass(password)}
              </Text>
              <View style={styles.contentBottomRight}>
                <TouchableOpacity
                  style={styles.btnCopy}
                  onPress={() => setVisiblePassword(!visiblePassword)}>
                  <MaterialIcons
                    name={visiblePassword ? 'visibility-off' : 'visibility'}
                    size={24}
                    color={colors.outline}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <RoundButton color={color} icon="delete" />
        <RoundButton
          color={color}
          icon="mode-edit"
          onPress={() =>
            navigation.navigate('Edit', {
              _id,
              name,
              description,
              date,
              color,
              categorie,
              force,
              time,
              login,
              password,
            })
          }
        />
      </View>
    </View>
  );
};

export default Detail;
