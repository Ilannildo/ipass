import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { useCustomTheme } from '../../contexts/theme';
import { Button } from '../../components/design/Button';
import { ColorButton } from '../../components/ColorButton';
import { savePassword } from '../../utils/storage';
import { useNavigation } from '@react-navigation/core';
import { passwordForce } from '../../utils/roles';
import { Ship } from '../../components/design/Ship';

type FormProps = {
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

export const NewPassword: React.FC = () => {
  const { colors } = useCustomTheme();
  const [categoriesSelected, setCategoriesSelected] = useState<string>('app');
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [categoriesName, setCategoriesName] = useState<string>('Aplicativo');

  const [selectionColors, setSelectionColors] = useState<ColorsProps[]>([]);
  const [colorSelect, setColorSelect] = useState<number>(1);

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
  const handleChangeDescription = (text: string) => {
    setFormData({
      ...formData,
      description: text,
    });
  };

  const handleChangePassword = (value: string) => {
    const force = passwordForce(value);
    setFormData({
      ...formData,
      password: value,
      force:
        force < 30 ? 'Fraca' : force >= 30 && force < 60 ? 'Média' : 'Forte',
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
      color: color.key,
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
        const date = new Date();
        setFormData({
          categorie: 'app',
          color: 1,
          date: date.toString(),
          time: date.getTime().toString(),
          login: '',
          description: '',
          name: '',
          password: '',
          force: '',
        });
        setLoading(false);
      }, 300);
    };

    load();
  }, [colors]);

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
            mode="outlined"
            placeholder={`Digite o nome do ${categoriesName}`}
            onChangeText={handleChangeName}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
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
            selectionColor={colors.primary}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label="Descrição"
            mode="outlined"
            value={formData.description}
            placeholder="Faça uma breve descrição... ✍️"
            onChangeText={handleChangeDescription}
            placeholderTextColor={colors.outline}
            autoCorrect={false}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
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
            selectionColor={colors.primary}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label="Seu login"
            mode="outlined"
            value={formData.login}
            placeholder="Digite seu login"
            onChangeText={handleChangeLogin}
            placeholderTextColor={colors.outline}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
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
            selectionColor={colors.primary}
            children={undefined}
            autoComplete={false}
          />
        </View>
        <View style={styles.inputArea}>
          <TextInput
            label={'Sua senha'}
            mode="outlined"
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
                placeholder: colors.outline,
                primary: colors.primary,
              },
            }}
            underlineColor={colors.outline}
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
