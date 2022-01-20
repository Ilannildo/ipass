import React, { useLayoutEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Favorites } from '../screens/Favorites';
import { useCustomTheme } from '../contexts/theme';
import { View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { Home } from '../screens/Home';

const { Navigator, Screen } = createBottomTabNavigator();

export const AppTabsRoutes: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  useLayoutEffect(() => {
    changeNavigationBarColor(colors.surface2, false, true);
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
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'heart' : 'heart-outline';
          }
          return focused ? (
            <View
              style={{
                width: 64,
                height: 32,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 16,
                backgroundColor: colors.secondaryContainer,
              }}>
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
          backgroundColor: schemeColor === 'dark' ? '#282831' : '#F1EDFA',
          borderTopWidth: 0,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Screen name="Home" component={Home} />
      <Screen name="Favorites" component={Favorites} />
    </Navigator>
  );
};
