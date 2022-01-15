import React from 'react';
import { View, Pressable, Modal } from 'react-native';
import { useCustomTheme } from '../../../contexts/theme';
import { styles } from './styles';

type Props = {
  visible: boolean;
  onDismiss: () => void;
};

export const AlertDialog: React.FC<Props> = ({
  visible,
  onDismiss,
  children,
}) => {
  const { colors } = useCustomTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {
        onDismiss();
      }}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.backdrop }]}
        onPress={() => onDismiss()}
      />
      <View style={styles.content}>
        <View
          style={[
            styles.androidAlertBox,
            { backgroundColor: colors.surfaceVariant },
          ]}>
          {children}
        </View>
      </View>
    </Modal>
  );
};
