import React, { useCallback, useEffect, useState } from 'react';
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
import { FAB } from 'react-native-paper';
import { Results } from 'realm';
import { PasswordCardLoading } from '../../components/ComponentsLoading/PasswordCardLoading';
import { CategoriesButton } from '../../components/CategoriesButton';
import { PasswordCard } from '../../components/PasswordCard';
import { RootStackParamList } from '../../routes/app.route';
import { StorageSchemaType } from '../../utils/storage';
import { Header } from '../../components/Header';
import { getRealm } from '../../services/realm';
import { maskDate, maskTime } from '../../utils/masks';

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
      ]);
    }
    fetchCategories();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      async function loadStorage() {
        const realm = await getRealm();
        const data =
          categoriesSelected === 'all'
            ? realm.objects<StorageSchemaType>('StorageSchema')
            : realm
                .objects<StorageSchemaType>('StorageSchema')
                .filtered('categorie == $0', categoriesSelected);
        setStorage(data);
        data.addListener(() => {
          setStorage(data);
          setLoading(false);
        });

        return () => {
          data.removeAllListeners();
          realm.close();
        };
      }

      loadStorage();
    }, [categoriesSelected]),
  );

  // useEffect(() => {
  //   setLoading(true);
  //   async function loadStorage() {
  //     const realm = await getRealm();
  //     const data =
  //       categoriesSelected === 'all'
  //         ? realm.objects<StorageSchemaType>('StorageSchema')
  //         : realm
  //             .objects<StorageSchemaType>('StorageSchema')
  //             .filtered('categorie == $0', categoriesSelected);
  //     setStorage(data);
  //     data.addListener(() => {
  //       setStorage(data);
  //       setLoading(false);
  //     });

  //     return () => {
  //       data.removeAllListeners();
  //       realm.close();
  //     };
  //   }

  //   loadStorage();
  // }, [categoriesSelected]);

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
              <PasswordCard
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
    paddingHorizontal: 10,
    marginTop: 20,
  },
  areaList: {
    width: '100%',
    marginTop: 20,
  },
  areaListPass: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 100,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 25,
  },
  categoriesList: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 5,
    marginLeft: 25,
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
