import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../../../contexts/auth';
import { useCustomTheme } from '../../../../contexts/theme';

export const Header: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useCustomTheme();
  return (
    <View style={styles.header}>
      <View>
        <Text
          style={[
            styles.username,
            {
              color: colors.black,
            },
          ]}>
          Olá, {user?.givenName}
        </Text>
        <Text style={[styles.currentDate, { color: colors.grey }]}>
          25 de out. de 2021
        </Text>
      </View>
      <Image
        source={{ uri: user?.photo }}
        style={[styles.userPhoto, { borderColor: colors.primary }]}
      />
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
  currentDate: {
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
