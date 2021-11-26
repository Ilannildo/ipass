import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import { CategoriesButton } from '../../components/CategoriesButton';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useCustomTheme } from '../../contexts/theme';
import { Button } from '../../components/Button';
import { ColorButton } from '../../components/ColorButton';
import { savePassword } from '../../utils/storage';
import { useNavigation } from '@react-navigation/core';

type FormProps = {
  categorie: string;
  name: string;
  login: string;
  password: string;
  date: string;
  time: string;
  force: string;
  color: string;
};

type CategoriesProps = {
  key: string;
  title: string;
};
type ColorsProps = {
  key: string;
  value: string;
};

export const NewPassword: React.FC = () => {
  const { colors } = useCustomTheme();
  const [categoriesSelected, setCategoriesSelected] = useState<string>('app');
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesName, setCategoriesName] = useState<string>('Aplicativo');

  const [selectionColors, setSelectionColors] = useState<ColorsProps[]>([]);
  const [colorSelect, setColorSelect] = useState<string>('1');

  const [passwordVisble, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const [formData, setFormData] = useState<FormProps>({} as FormProps);
  const navigation = useNavigation();

  const handleSave = async () => {
    const result = await savePassword(formData);
    if (result) {
      console.log('Salvou com sucesso');
      navigation.goBack();
    } else {
      console.log('Falhou ao salvar');
    }
  };

  const handleChangeName = (text: string) => {
    setFormData({
      ...formData,
      name: text,
    });
  };
  const handleChangeLogin = (text: string) => {
    setFormData({
      ...formData,
      login: text,
    });
  };

  const handleChangePassword = (value: string) => {
    setFormData({
      ...formData,
      password: value,
      force: 'Forte',
    });
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(old => !old);
  };

  const handleSelectCategories = (categorie: CategoriesProps) => {
    setCategoriesSelected(categorie.key);
    setCategoriesName(categorie.title);
    setFormData({
      ...formData,
      categorie: categorie.key,
    });
  };

  const handleSelectColors = (color: ColorsProps) => {
    setFormData({
      ...formData,
      color: color.value,
    });
    setColorSelect(color.key);
  };

  useEffect(() => {
    const load = () => {
      setTimeout(() => {
        setCategories([
          {
            key: 'app',
            title: 'Aplicativo',
          },
          {
            key: 'site',
            title: 'Site',
          },
          {
            key: 'cartão',
            title: 'Cartão',
          },
          {
            key: 'teste',
            title: 'Teste',
          },
        ]);
        setSelectionColors([
          {
            key: '1',
            value: '#DEBDFF',
          },
          {
            key: '2',
            value: '#C5FFF4',
          },
          {
            key: '3',
            value: '#B9DCFF',
          },
          {
            key: '4',
            value: '#FFB4C1',
          },
          {
            key: '5',
            value: '#FFD3B4',
          },
        ]);
        setFormData({
          categorie: 'app',
          color: '#DEBDFF',
          date: '11 de nov de 2021',
          time: '19:25',
          login: '',
          name: '',
          password: '',
          force: '',
        });
        setLoading(false);
      }, 300);
    };

    load();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.areaList}>
        <Title style={[styles.title, { color: colors.onPrimaryContainer }]}>
          Selecione uma categoria
        </Title>
        <FlatList
          data={categories}
          keyExtractor={item => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoriesButton
              title={item.title}
              selected={item.key === categoriesSelected}
              onPress={() => handleSelectCategories(item)}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={styles.inputArea}>
          <TextInput
            label={`Nome do ${categoriesName}`}
            value={formData.name}
            mode="flat"
            placeholder={`Digite o nome do ${categoriesName}`}
            onChangeText={handleChangeName}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
            }}
            theme={{
              colors: {
                text: colors.onPrimaryContainer,
                placeholder: colors.onOutline,
              },
            }}
            underlineColor={colors.onOutline}
            activeUnderlineColor={colors.primary}
            selectionColor={colors.onPrimaryContainer}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label="Seu login"
            mode="flat"
            value={formData.login}
            placeholder="Digite seu login"
            onChangeText={handleChangeLogin}
            placeholderTextColor={colors.outline}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
            }}
            theme={{
              colors: {
                text: colors.onPrimaryContainer,
                placeholder: colors.onOutline,
              },
            }}
            underlineColor={colors.onOutline}
            activeUnderlineColor={colors.primary}
            selectionColor={colors.onPrimaryContainer}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label={'Sua senha'}
            mode="flat"
            placeholder="Digite sua senha master"
            onChangeText={handleChangePassword}
            placeholderTextColor={colors.outline}
            secureTextEntry={!passwordVisble}
            value={formData.password}
            returnKeyType="done"
            // onEndEditing={handleSubmit}
            style={{
              backgroundColor: colors.background,
            }}
            theme={{
              colors: {
                text: colors.onPrimaryContainer,
                placeholder: colors.onOutline,
              },
            }}
            underlineColor={colors.onOutline}
            activeUnderlineColor={colors.primary}
            selectionColor={colors.onPrimaryContainer}
            right={
              <TextInput.Icon
                name={passwordVisble ? 'eye-off' : 'eye'}
                onPress={togglePasswordVisible}
                color={colors.onPrimaryContainer}
                size={20}
              />
            }
            children={undefined}
            autoComplete={false}
          />
        </View>

        <View style={styles.selectColor}>
          <Title style={{ color: colors.onPrimaryContainer }}>
            Selecione uma cor
          </Title>
          <View style={styles.colorArea}>
            {selectionColors.map(item => (
              <ColorButton
                key={item.key}
                color={item.value}
                selected={item.key === colorSelect}
                onPress={() => handleSelectColors(item)}
              />
            ))}
          </View>
        </View>

        <View style={styles.btnArea}>
          <Button
            label="Salvar"
            onPress={handleSave}
            filled
            loading={loading}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaList: {
    width: '100%',
    marginTop: 40,
  },
  title: {
    marginBottom: 10,
    marginLeft: 30,
  },
  categoriesList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginBottom: 20,
    marginLeft: 30,
    paddingRight: 30,
  },
  inputArea: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
  },
  colorArea: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectColor: {
    marginTop: 40,
    marginBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
  },
  colorList: {
    height: 60,
    paddingBottom: 5,
    marginBottom: 20,
    paddingRight: 30,
  },
  btnArea: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 30,
    paddingRight: 30,
  },
});
