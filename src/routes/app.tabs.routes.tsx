import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { Favorites } from '../screens/Favorites';
import { useCustomTheme } from '../contexts/theme';
import { StyleSheet, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Home } from '../screens/Home';
import { Generate } from '../screens/Generate';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabsRoutes: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();

  useLayoutEffect(() => {
    changeNavigationBarColor(
      colors.surface2,
      schemeColor === 'dark' ? false : true,
      true,
    );
  });

  return (
    <Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.onSecondaryContainer,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';
          if (route.name === 'Home') {
            iconName = focused ? 'shield-home' : 'shield-home-outline';
          } else if (route.name === 'Generate') {
            iconName = focused ? 'shield-refresh' : 'shield-refresh-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return focused ? (
            <View
              style={[
                styles.iconActiveIndicator,
                {
                  backgroundColor: colors.secondaryContainer,
                },
              ]}>
              <MaterialCommunityIcons
                name={iconName}
                color={color}
                size={size}
              />
            </View>
          ) : (
            <MaterialCommunityIcons name={iconName} color={color} size={size} />
          );
        },
        tabBarStyle: {
          backgroundColor: colors.surface2,
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Screen
        name="Generate"
        component={Generate}
        options={{
          title: 'Gerar senha',
        }}
      />
      {/* <Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: 'Favoritos',
        }}
      /> */}
    </Navigator>
  );
};

const styles = StyleSheet.create({
  iconActiveIndicator: {
    width: 64,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
});
