import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Button } from '../../components/Button';
import { MenuItem } from '../../components/MenuItem';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';

const DataMenuConfig = [
  {
    key: '1',
    title: 'Impressão digital',
    icon: 'md-finger-print-sharp',
    redirectScreen: 'FingerprintScreen',
  },
  {
    key: '2',
    title: 'Tema',
    icon: 'color-palette-outline',
    redirectScreen: 'ThemeScreen',
  },
  {
    key: '3',
    title: 'Senha master',
    icon: 'md-key-outline',
    redirectScreen: 'EditPasswordMaster',
  },
  {
    key: '4',
    title: 'Sincronizar/Backup',
    icon: 'md-sync-outline',
    redirectScreen: 'BackupScreen',
  },
  {
    key: '5',
    title: 'Meus dados',
    icon: 'user',
    redirectScreen: 'MeScreen',
  },
  {
    key: '6',
    title: 'Sobre',
    icon: 'file-text',
    redirectScreen: 'About',
  },
];

export const Configuration: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const { user, handleSignOut } = useAuth();

  const logout = async () => {
    await handleSignOut();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView>
        <StatusBar
          backgroundColor={colors.inverseOnSurface}
          barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        />
        <View style={styles.headerUser}>
          <Image
            source={{ uri: user?.photo }}
            style={[styles.userPhoto, { borderColor: colors.primary }]}
          />
          <View>
            <Text
              style={[styles.userName, { color: colors.onPrimaryContainer }]}>
              {user?.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.secondary }]}>
              {user?.email}
            </Text>
          </View>
        </View>

        <View style={styles.body}>
          {DataMenuConfig.map(menu => (
            <MenuItem
              key={menu.key}
              title={menu.title}
              iconName={menu.icon}
              onPress={() => console.log(menu.redirectScreen)}
            />
          ))}
        </View>
        <View style={styles.footer}>
          <Button label="Sair" filled />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerUser: {
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userPhoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    marginRight: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '500',
  },
  userEmail: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  body: {
    width: '100%',
    marginTop: 10,
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 30,
  },
});
