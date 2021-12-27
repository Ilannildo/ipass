import { useNavigation } from '@react-navigation/core';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Dialog, Portal, RadioButton, Button as Bt } from 'react-native-paper';
import { Button } from '../../components/Button';
import { MenuItem } from '../../components/MenuItem';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';
import { SettingstStackParamList } from '../../routes/configuration.routes';

type SettingsScreenProp = NativeStackNavigationProp<SettingstStackParamList>;
type ThemeType = 'light' | 'dark' | 'default';

export const Configuration: React.FC = () => {
  const [themeDialog, setThemeDialog] = useState(false);
  const { colors, schemeColor, theme, toggleTheme } = useCustomTheme();
  const [selectTheme, setSelectTheme] = useState<ThemeType>(theme);
  const { user } = useAuth();
  const navigation = useNavigation<SettingsScreenProp>();

  // const logout = async () => {
  //   await handleSignOut();
  // };

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
          <MenuItem
            title="Segurança"
            iconName="shield"
            onPress={() => navigation.navigate('SafetyScreen')}
          />
          <MenuItem
            title="Tema"
            iconName="color-palette-outline"
            onPress={() => setThemeDialog(true)}
          />
          <Portal>
            <Dialog
              style={{ backgroundColor: colors.background }}
              visible={themeDialog}
              onDismiss={() => setThemeDialog(false)}>
              <Dialog.Title style={{ color: colors.onPrimaryContainer }}>
                Escolha um tema
              </Dialog.Title>
              <RadioButton.Group
                onValueChange={value => setSelectTheme(value)}
                value={selectTheme}>
                <RadioButton.Item
                  label="Automático (sistema)"
                  value="default"
                  uncheckedColor={colors.outline}
                  color={colors.primary}
                  position="leading"
                  labelStyle={{
                    textAlign: 'left',
                    marginLeft: 20,
                    color: colors.onPrimaryContainer,
                  }}
                />
                <RadioButton.Item
                  label="Claro"
                  value="light"
                  color={colors.primary}
                  uncheckedColor={colors.outline}
                  position="leading"
                  labelStyle={{
                    textAlign: 'left',
                    marginLeft: 20,
                    color: colors.onPrimaryContainer,
                  }}
                />
                <RadioButton.Item
                  label="Escuro"
                  value="dark"
                  color={colors.primary}
                  uncheckedColor={colors.outline}
                  position="leading"
                  labelStyle={{
                    textAlign: 'left',
                    marginLeft: 20,
                    color: colors.onPrimaryContainer,
                  }}
                />
              </RadioButton.Group>
              <Dialog.Actions>
                <Bt
                  style={{ marginRight: 20 }}
                  color={colors.primary}
                  onPress={() => setThemeDialog(false)}>
                  Cancelar
                </Bt>
                <Bt
                  color={colors.primary}
                  style={{ marginRight: 15 }}
                  onPress={() => {
                    toggleTheme(selectTheme);
                    setThemeDialog(false);
                  }}>
                  Ok
                </Bt>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <MenuItem
            title="Senha master"
            iconName="md-key-outline"
            onPress={() => console.log('Teste')}
          />
          <MenuItem
            title="Sincronizar/Backup"
            iconName="md-sync-outline"
            onPress={() => console.log('Teste')}
          />
          <MenuItem
            title="Meus dados"
            iconName="user"
            onPress={() => console.log('Teste')}
          />
          <MenuItem
            title="Sobre"
            iconName="file-text"
            onPress={() => console.log('Teste')}
          />
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
