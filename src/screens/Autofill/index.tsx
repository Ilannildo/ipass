import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, Text, View } from 'react-native';
import { useStorage } from '../../contexts/storage';
import { useCustomTheme } from '../../contexts/theme';
import LottieView from 'lottie-react-native';

import { AutoFillBridge } from '../../services/autofillbridge';
import { Header } from '../../components/Header';
import { styles } from './styles';
import { Card } from '../../components/design/Card';
import { maskDate, maskTime } from '../../utils/masks';

export const Autofill: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  const { loading, storage } = useStorage();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setMounted(false);
    }, 500);
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
          backgroundColor={colors.background}
          barStyle={schemeColor === 'light' ? 'dark-content' : 'light-content'}
        />
        <Header disable={true} />

        {loading || mounted ? (
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
            {storage.map(item => (
              <Card
                key={item._id}
                categorie={item.categorie}
                color={item.color}
                date={maskDate(item.date)}
                label={item.name}
                description={item.description}
                onEdit={() => {}}
                onDetail={async () =>
                  await AutoFillBridge.completeAutoFill(
                    item.login,
                    item.password,
                    item.name,
                  )
                }
                passwordForce={item.force}
                time={maskTime(item.time)}
              />
            ))}
          </View>
        )}
        {storage.length === 0 && (
          <View style={styles.listEmpty}>
            <Text
              style={[styles.emptyText, { color: colors.onPrimaryContainer }]}>
              Não há nada por aqui 🥺
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
