import React, { useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { TextInput, Title } from 'react-native-paper';
import { Loader } from '../../components/design/Loader';
import { useCustomTheme } from '../../contexts/theme';
import { Button } from '../../components/design/Button';
import { ColorButton } from '../../components/ColorButton';
// import { updatePassword } from '../../utils/storage';
import { useNavigation } from '@react-navigation/core';
import { passwordForce } from '../../utils/roles';
import { Ship } from '../../components/design/Ship';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppRoutesListParams } from '../../routes/app.route';
import { useStorage } from '../../contexts/storage';

type FormProps = {
  _id: number;
  categorie: string;
  name: string;
  description: string;
  login: string;
  password: string;
  date: string;
  time: string;
  force: string;
  color: number;
};

type CategoriesProps = {
  key: string;
  title: string;
};
type ColorsProps = {
  key: number;
  value: string;
};

export const Edit: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const route = useRoute();
  const {
    _id,
    categorie,
    name,
    description,
    login,
    password,
    date,
    time,
    force,
    color,
  } = route.params as FormProps;

  const [categoriesSelected, setCategoriesSelected] =
    useState<string>(categorie);
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesName, setCategoriesName] = useState<string>('');

  const [selectionColors, setSelectionColors] = useState<ColorsProps[]>([]);
  const [colorSelect, setColorSelect] = useState<number>(color);

  const [passwordVisble, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<FormProps>({} as FormProps);
  const { updatePassword } = useStorage();

  const navigation =
    useNavigation<NativeStackNavigationProp<AppRoutesListParams>>();

  const handleSave = async () => {
    if (
      !formData.categorie ||
      !formData.color ||
      !formData.date ||
      !formData.force ||
      !formData.login ||
      !formData.name ||
      !formData.password ||
      !formData.time
    ) {
      ToastAndroid.show('Você não informou as informações necessárias', 1000);
    } else {
      try {
        const result = await updatePassword(formData);
        if (result) {
          ToastAndroid.show('Sua senha foi alterada com sucesso', 500);
          navigation.navigate('Home');
        } else {
          console.log('Falhou ao salvar');
        }
      } catch (error) {
        console.log('Teste error =>', error);
      }
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
  const handleChangeDescription = (text: string) => {
    setFormData({
      ...formData,
      description: text,
    });
  };

  const handleChangePassword = (value: string) => {
    const force1 = passwordForce(value);
    setFormData({
      ...formData,
      password: value,
      force:
        force1 < 30 ? 'Fraca' : force1 >= 30 && force1 < 60 ? 'Média' : 'Forte',
    });
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(old => !old);
  };

  const handleSelectCategories = (categorie1: CategoriesProps) => {
    setCategoriesSelected(categorie1.key);
    setCategoriesName(categorie1.title);
    setFormData({
      ...formData,
      categorie: categorie1.key,
    });
  };

  const handleSelectColors = (color1: ColorsProps) => {
    setFormData({
      ...formData,
      color: color1.key,
    });
    setColorSelect(color1.key);
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
            key: 1,
            value: colors.color1,
          },
          {
            key: 2,
            value: colors.color2,
          },
          {
            key: 3,
            value: colors.color3,
          },
          {
            key: 4,
            value: colors.color4,
          },
          {
            key: 5,
            value: colors.color5,
          },
        ]);
        setFormData({
          _id,
          categorie,
          color,
          date,
          time,
          login,
          description,
          name,
          password,
          force,
        });
        setLoading(false);
      }, 300);
    };

    load();
  }, [
    _id,
    colors,
    categorie,
    color,
    date,
    time,
    login,
    description,
    name,
    password,
    force,
  ]);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Loader />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.areaList}>
            <Title style={[styles.title, { color: colors.onSurface }]}>
              Selecione uma categoria
            </Title>
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
                  onPress={() => handleSelectCategories(item)}
                  icon
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
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primaryContainer}
                children={undefined}
                autoComplete={false}
              />
            </View>
            <View style={styles.inputArea}>
              <TextInput
                label="Endereço na internet (URL)"
                mode="flat"
                value={`${formData.description}`}
                placeholder="Digite uma url se tiver...✍️"
                onChangeText={handleChangeDescription}
                placeholderTextColor={colors.outline}
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
                keyboardType="url"
                style={{
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primaryContainer}
                children={undefined}
                autoComplete={false}
                left={<TextInput.Affix text="https://www." />}
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
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                style={{
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primaryContainer}
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
                style={{
                  backgroundColor:
                    schemeColor === 'dark'
                      ? 'rgba(158, 163, 255, 0.03)'
                      : 'rgba(77, 81, 189, 0.03)',
                }}
                theme={{
                  colors: {
                    text: colors.onSurface,
                    placeholder: colors.outline,
                    primary: colors.primary,
                  },
                }}
                underlineColor={colors.outline}
                activeUnderlineColor={colors.primary}
                selectTextOnFocus
                selectionColor={colors.primaryContainer}
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
              <Text
                style={[
                  styles.passwordForce,
                  { color: colors.onPrimaryContainer },
                ]}>
                {'Força da sua senha: '}
                <Text
                  style={{
                    color:
                      formData.force === 'Fraca'
                        ? colors.error
                        : formData.force === 'Média'
                        ? colors.warning
                        : colors.success,
                  }}>
                  {formData.force}
                </Text>
              </Text>
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
              <Button label="Salvar" onPress={handleSave} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  areaList: {
    width: '100%',
    marginTop: 30,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 16,
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
  passwordForce: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 10,
  },
});
