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
import { PasswordCardLoading } from '../../components/ComponentsLoading/PasswordCardLoading';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/core';
import { RootStackParamList } from '../../routes/app.route';
import { StorageSchemaType } from '../../utils/storage';
import { maskDate, maskTime } from '../../utils/masks';
import { Ship } from '../../components/design/Ship';
import { Card } from '../../components/design/Card';
import { Fab } from '../../components/design/Fab';
import { Header } from '../../components/Header';
import { Results } from 'realm';
import { getRealm } from '../../services/realm';

interface CategoriesProps {
  key: string;
  title: string;
}

type newPassScreenProp = NativeStackNavigationProp<RootStackParamList>;

export const Home: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesSelected, setCategoriesSelected] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  const [storage, setStorage] = useState<Results<StorageSchemaType>>([] as any);

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
    const getStorage = async () => {
      setLoading(true);
      const realm = await getRealm();
      const data =
        categoriesSelected === 'all'
          ? realm.objects<StorageSchemaType>('StorageSchema')
          : realm
              .objects<StorageSchemaType>('StorageSchema')
              .filtered('categorie == $0', categoriesSelected);
      setStorage(data);
      try {
        data.addListener(() => {
          setStorage(data);
        });
      } catch (error) {
        console.log('Erro ao buscar storage');
      }
      setLoading(false);
      return () => {
        data.removeAllListeners();
        realm.close();
      };
    };
    // clearStoragePassword();
    getStorage();
  }, [categoriesSelected]);

  // useFocusEffect(
  //   useCallback(() => {
  //     setLoading(true);
  //     async function loadStorage() {
  //       const realm = await getRealm();
  //       const data =
  //         categoriesSelected === 'all'
  //           ? realm.objects<StorageSchemaType>('StorageSchema')
  //           : realm
  //               .objects<StorageSchemaType>('StorageSchema')
  //               .filtered('categorie == $0', categoriesSelected);
  //       setStorage(data);
  //       data.addListener(() => {
  //         setStorage(data);
  //         setLoading(false);
  //       });

  //       return () => {
  //         data.removeAllListeners();
  //         realm.close();
  //       };
  //     }

  //     loadStorage();
  //   }, [categoriesSelected]),
  // );

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

        <View style={styles.areaListPass}>
          {loading ? (
            <>
              <PasswordCardLoading />
              <PasswordCardLoading />
              <PasswordCardLoading />
              <PasswordCardLoading />
              <PasswordCardLoading />
            </>
          ) : (
            storage.map(item => (
              <Card
                key={item._id}
                categorie={item.categorie}
                color={item.color}
                date={maskDate(item.date)}
                label={item.name}
                onEdit={() => Alert.alert(`Editar item => ${item.name}`)}
                onView={() => console.log(`Visualizar ${item.name}`)}
                passwordForce={item.force}
                time={maskTime(item.time)}
              />
            ))
          )}
        </View>
        {storage.length === 0 && (
          <View style={styles.listEmpty}>
            <Text
              style={[styles.emptyText, { color: colors.onPrimaryContainer }]}>
              Não há nada por aqui 🥺
            </Text>
          </View>
        )}
      </ScrollView>
      <Fab onPress={() => navigation.navigate('NewPass')} />
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
});
