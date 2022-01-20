import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/auth';
import { useCustomTheme } from '../../contexts/theme';

type Props = {
  disable?: boolean;
};

export const Header: React.FC<Props> = ({ disable = false }) => {
  const { user } = useAuth();
  const { colors } = useCustomTheme();
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View>
        <Text
          style={[
            styles.username,
            {
              color: colors.onSurface,
            },
          ]}>
          Olá, {user?.givenName}
        </Text>
        <Text style={[styles.textWelcome, { color: colors.onSurfaceVariant }]}>
          Bem vindo de volta
        </Text>
      </View>
      <TouchableOpacity
        disabled={disable}
        onPress={() => navigation.navigate('ConfigurationRoutes')}
        activeOpacity={0.7}>
        <Image
          source={{ uri: user?.photo }}
          style={[styles.userPhoto, { borderColor: colors.primary }]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    paddingHorizontal: 24,
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  textWelcome: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  userPhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
  },
});
