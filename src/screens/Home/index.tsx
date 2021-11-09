import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Alert } from '../../components/Alert';
import { useCustomTheme } from '../../contexts/theme';
import { CategoriesButton } from './components/CategoriesButton';
import { Header } from './components/Header';

interface CategoriesProps {
  key: string;
  title: string;
}

export const Home: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  // const {filteredCategories, setFilteredCategories} = useState([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string>('all');

  const navigation = useNavigation();

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
      <Alert
        title="Usar impressão digital?"
        message="Deseja habilitar sua Digital para realizar ações dentro do app?"
        visible={true}
      />
      <StatusBar
        backgroundColor={colors.background}
        barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
      />
      <Header />
      <View style={styles.area}>
        {/* <SearchInput placeholder="Pesquise aqui..." /> */}
      </View>

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
  },
});
