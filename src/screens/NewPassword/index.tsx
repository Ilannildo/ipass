import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextInput, Title } from 'react-native-paper';
import { useCustomTheme } from '../../contexts/theme';
import { CategoriesButton } from '../Home/components/CategoriesButton';
import { Button } from '../../components/Button';

type FormProps = {
  categorie: string;
  name: string;
  login: string;
  password: string;
  createAt: string;
  color: string;
};

export const NewPassword: React.FC = () => {
  const { colors } = useCustomTheme();
  const [categoriesSelected, setCategoriesSelected] = useState<string>('app');
  const [categoriesName, setCategoriesName] = useState<string>('Aplicativo');
  const [passwordVisble, setPasswordVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormProps>({} as FormProps);

  const handleChangeName = (text: string) => {
    setFormData({
      ...formData,
      name: text,
    });
  };

  const handleChangePassword = (value: string) => {
    setFormData({
      ...formData,
      password: value,
    });
  };

  const togglePasswordVisible = () => {
    setPasswordVisible(old => !old);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.areaList}>
        <Title style={[styles.title, { color: colors.onPrimaryContainer }]}>
          Selecione uma categoria
        </Title>
        <FlatList
          data={[
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
          ]}
          keyExtractor={item => String(item.key)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <CategoriesButton
              title={item.title}
              selected={item.key === categoriesSelected}
              onPress={() => {
                setCategoriesSelected(item.key);
                setCategoriesName(item.title);
              }}
            />
          )}
          contentContainerStyle={styles.categoriesList}
        />

        <View style={styles.inputArea}>
          <TextInput
            label={`Nome do ${categoriesName}`}
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
                placeholder: colors.outline,
              },
            }}
            underlineColor={colors.outline}
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
            placeholder="Digite seu login"
            onChangeText={handleChangeName}
            placeholderTextColor={colors.outline}
            returnKeyType="next"
            style={{
              backgroundColor: colors.background,
            }}
            theme={{
              colors: {
                text: colors.onPrimaryContainer,
                placeholder: colors.outline,
              },
            }}
            underlineColor={colors.outline}
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
                placeholder: colors.outline,
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
        </View>

        <View style={styles.btnArea}>
          <Button
            label="Salvar"
            onPress={() => console.log('Salvar nova senha => ', formData)}
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
    marginLeft: 25,
  },
  categoriesList: {
    height: 40,
    justifyContent: 'center',
    paddingBottom: 5,
    marginBottom: 20,
    marginLeft: 25,
    paddingRight: 25,
  },
  inputArea: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 25,
    paddingRight: 25,
  },
  btnArea: {
    marginTop: 50,
    marginBottom: 10,
    marginLeft: 25,
    paddingRight: 25,
  },
});
