import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../../contexts/auth';
import { useCustomTheme } from '../../../../contexts/theme';

export const Header: React.FC = () => {
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
              color: colors.onPrimaryContainer,
            },
          ]}>
          Olá, {user?.givenName}
        </Text>
        <Text style={[styles.textWelcome, { color: colors.secondary }]}>
          25 de out. de 2021
        </Text>
      </View>
      <TouchableOpacity
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
    paddingHorizontal: 30,
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textWelcome: {
    fontSize: 13,
    fontWeight: 'normal',
  },
  userPhoto: {
    width: 45,
    height: 45,
    borderRadius: 23,
    borderWidth: 1.5,
  },
});
