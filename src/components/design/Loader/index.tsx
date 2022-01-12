import React from 'react';
import { View, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { styles } from './styles';
import { useCustomTheme } from '../../../contexts/theme';

const Loader: React.FC = () => {
  const { colors, schemeColor } = useCustomTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={schemeColor === 'dark' ? 'light-content' : 'dark-content'}
        translucent
      />
      <LottieView
        source={require('../../../lottie/loader.json')}
        autoPlay
        duration={1000}
        style={styles.anim}
      />
    </View>
  );
};

export default Loader;
