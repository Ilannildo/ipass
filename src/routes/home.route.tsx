import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConfigurationRoutes } from './configuration.routes';
import { Add } from '../screens/Add';
import { useCustomTheme } from '../contexts/theme';
import Detail from '../screens/Detail';
import { Edit } from '../screens/Edit';
import { AppTabsRoutes } from './app.tabs.routes';

const { Navigator, Screen } = createNativeStackNavigator();

export type AppRoutesListParams = {
  Home: undefined;
  ConfigurationRoutes: undefined;
  Add: undefined;
  Detail: {
    _id?: number;
    categorie: string;
    name: string;
    login: string;
    description: string;
    password: string;
    date: string;
    time: string;
    force: string;
    color: number;
  };
  Edit: {
    _id?: number;
    categorie: string;
    name: string;
    login: string;
    description: string;
    password: string;
    date: string;
    time: string;
    force: string;
    color: number;
  };
};

export const HomeRoutes: React.FC = () => {
  const { colors } = useCustomTheme();

  return (
    <Navigator>
      <Screen
        name="Tab"
        component={AppTabsRoutes}
        options={{
          headerShown: false,
        }}
      />
      <Screen
        name="ConfigurationRoutes"
        component={ConfigurationRoutes}
        options={{
          animation: 'fade_from_bottom',
          headerShown: false,
        }}
      />
      <Screen
        name="Add"
        component={Add}
        options={{
          title: 'Adicionar',
          headerTitleAlign: 'center',
          animation: 'slide_from_bottom',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Detalhes',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          animation: 'fade_from_bottom',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />
      <Screen
        name="Edit"
        component={Edit}
        options={{
          title: 'Editar',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          animation: 'slide_from_left',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.onSurface,
        }}
      />
    </Navigator>
  );
};
