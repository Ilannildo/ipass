import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { FAB } from 'react-native-paper';
import { CategoriesButton } from './components/CategoriesButton';
import { Header } from './components/Header';
import { PasswordCard } from './components/PasswordCard';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/app.route';
import { useNavigation } from '@react-navigation/core';

interface CategoriesProps {
  key: string;
  title: string;
}

type newPassScreenProp = NativeStackNavigationProp<RootStackParamList>;

export const Home: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  // const {filteredCategories, setFilteredCategories} = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string>('all');

  const navigation = useNavigation<newPassScreenProp>();

  function handleCategoriesSelected(categorie: string) {
    setCategoriesSelected(categorie);
  }

  useEffect(() => {
    async function fetchCategories() {
      setCategories([
        {
          key: 'all',
          title: 'Todos',
        },
        {
          key: 'used',
          title: 'Mais usadas',
        },
        {
          key: 'card',
          title: 'Cartão',
        },
        {
          key: 'social',
          title: 'Social',
        },
        {
          key: 'app',
          title: 'Aplicativos',
        },
      ]);
    }

    fetchCategories();
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}>
      <ScrollView>
        <StatusBar
          backgroundColor={colors.inverseOnSurface}
          barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        />
        <Header />
        <View style={styles.area} />
        <View style={styles.areaList}>
          <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
            Categorias
          </Text>
          <FlatList
            data={categories}
            keyExtractor={item => String(item.key)}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoriesButton
                title={item.title}
                selected={item.key === categoriesSelected}
                onPress={() => {
                  handleCategoriesSelected(item.key);
                }}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        <View style={styles.areaListPass}>
          <PasswordCard
            label="Facebook"
            categorie="Aplicativo"
            date="16 de nov de 2021"
            time="16:39"
            color="#AAFFEF"
            onView={() => console.log('Visualizar')}
            onEdit={() => console.log('Editar')}
            passwordForce="Fraca"
          />
          {/* <View style={styles.listEmpty}>
            <Text
              style={[styles.emptyText, { color: colors.onPrimaryContainer }]}>
              Nada por aqui 🥺
            </Text>
          </View> */}
        </View>
      </ScrollView>
      <FAB
        style={[styles.fab, { backgroundColor: colors.primary }]}
        icon="plus"
        color={colors.onPrimary}
        onPress={() => navigation.navigate('NewPass')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 20,
  },
  areaList: {
    width: '100%',
    marginTop: 20,
  },
  areaListPass: {
    width: '100%',
    marginTop: 10,
    marginHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 30,
  },
  categoriesList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginLeft: 32,
    paddingRight: 32,
  },
  listEmpty: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
