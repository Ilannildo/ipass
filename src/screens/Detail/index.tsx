import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './styles';

export const Detail: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text>Detail</Text>
      </ScrollView>
    </View>
  );
};

export default Detail;
