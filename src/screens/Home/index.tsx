import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import { useCustomTheme } from '../../contexts/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useFocusEffect } from '@react-navigation/core';
import { AppRoutesListParams } from '../../routes/app.route';
import { StorageSchemaType } from '../../utils/storage';
import { maskDate, maskTime } from '../../utils/masks';
import { Ship } from '../../components/design/Ship';
import { Card } from '../../components/design/Card';
import { useStorage } from '../../contexts/storage';
import { Fab } from '../../components/design/Fab';
import { Header } from '../../components/Header';
import LottieView from 'lottie-react-native';
import { Results } from 'realm';

interface CategoriesProps {
  key: string;
  title: string;
}

type navigationProps = NativeStackNavigationProp<AppRoutesListParams>;

export const Home: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const { loading, storage } = useStorage();
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string>('all');
  // const [loading, setLoading] = useState(true);

  // const [storage, setStorage] = useState<Results<StorageSchemaType>>([] as any);
  const [storageFiltered, setStorageFiltered] = useState<
    Results<StorageSchemaType>
  >([] as any);

  const navigation = useNavigation<navigationProps>();

  function handleCategoriesSelected(categorie: string) {
    setCategoriesSelected(categorie);
    if (categorie === 'all') {
      return setStorageFiltered(storage);
    }
    const filtered = storage.filtered('categorie == $0', categorie);
    setStorageFiltered(filtered);
  }

  useEffect(() => {
    async function fetchCategories() {
      setCategories([
        {
          key: 'all',
          title: 'Todos',
        },
        {
          key: 'app',
          title: 'Aplicativos',
        },
        {
          key: 'site',
          title: 'Sites',
        },
        {
          key: 'label',
          title: 'Label',
        },
        {
          key: 'teste',
          title: 'Teste',
        },
      ]);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    // const getStorage = async () => {
    //   setLoading(true);
    //   const realm = await getRealm();
    //   const data = realm
    //     .objects<StorageSchemaType>('StorageSchema')
    //     .sorted('date', true);
    //   setStorageFiltered(data);
    //   setStorage(data);
    //   try {
    //     console.log('Buscou novamente');
    //     data.addListener(() => {
    //       setStorageFiltered(data);
    //       setStorage(data);
    //     });
    //   } catch (error) {
    //     console.log('Erro ao buscar storage');
    //   }
    //   setLoading(false);
    //   return () => {
    //     data.removeAllListeners();
    //     realm.close();
    //   };
    // };
    // getStorage();
    setStorageFiltered(storage);
    setCategoriesSelected('all');
  }, [storage]);

  useFocusEffect(() => {});

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
          backgroundColor={colors.background}
          barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        />
        <Header />
        <View style={styles.areaList}>
          <Text style={[styles.title, { color: colors.onPrimaryContainer }]}>
            Categorias
          </Text>
          <FlatList
            data={categories}
            keyExtractor={item => String(item.key)}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            renderItem={({ item }) => (
              <Ship
                label={item.title}
                selected={item.key === categoriesSelected}
                icon
                onPress={() => {
                  handleCategoriesSelected(item.key);
                }}
              />
            )}
            contentContainerStyle={styles.categoriesList}
          />
        </View>

        {loading ? (
          <View style={styles.listEmpty}>
            <LottieView
              source={require('../../lottie/loader.json')}
              autoPlay
              duration={1000}
              style={styles.anim}
            />
          </View>
        ) : (
          <View style={styles.areaListPass}>
            {storageFiltered.map(item => (
              <Card
                key={item._id}
                categorie={item.categorie}
                color={item.color}
                date={maskDate(item.date)}
                label={item.name}
                description={item.description}
                onEdit={() => Alert.alert(`Editar item => ${item.name}`)}
                onDetail={() => {
                  navigation.navigate('Detail', {
                    _id: item._id,
                    categorie: item.categorie,
                    color: item.color,
                    date: item.date,
                    description: item.description,
                    force: item.force,
                    login: item.login,
                    name: item.name,
                    password: item.password,
                    time: item.time,
                  });
                }}
                passwordForce={item.force}
                time={maskTime(item.time)}
              />
            ))}
          </View>
        )}
        {storageFiltered.length === 0 && (
          <View style={styles.listEmpty}>
            <Text
              style={[styles.emptyText, { color: colors.onPrimaryContainer }]}>
              Não há nada por aqui 🥺
            </Text>
          </View>
        )}
      </ScrollView>
      <Fab onPress={() => navigation.navigate('Add')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  areaList: {
    width: '100%',
    marginTop: 20,
  },
  areaListPass: {
    // width: '100%',
    marginTop: 10,
    marginBottom: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
    marginLeft: 24,
  },
  categoriesList: {
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    marginLeft: 24,
    paddingRight: 36,
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
  animView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anim: {
    // marginBottom: 10,
    width: 100,
    height: 100,
  },
});
