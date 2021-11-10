import React from 'react';
import { View, Text, StyleSheet, Pressable, Modal } from 'react-native';
import { useCustomTheme } from '../../contexts/theme';

type Props = {
  title: string;
  message: string;
  visible: boolean;
  onConfirmText: string;
  onCancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const Alert: React.FC<Props> = ({
  title,
  message,
  visible,
  onConfirmText,
  onCancelText,
  onConfirm,
  onCancel,
}) => {
  const { colors } = useCustomTheme();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      statusBarTranslucent
      onRequestClose={() => {
        onCancel();
      }}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.backdrop }]}
        onPress={() => onCancel()}
      />
      <View style={styles.content}>
        <View
          style={[styles.androidAlertBox, { backgroundColor: colors.surface }]}>
          <Text style={[styles.androidTitle, { color: colors.onSurface }]}>
            {title || 'Message'}
          </Text>
          <Text style={[styles.androidMessage, { color: colors.onSurface }]}>
            {message || 'Teste mensagem'}
          </Text>

          <View style={styles.buttons}>
            <Pressable style={styles.btn} onPress={onCancel}>
              <Text style={[styles.btnText, { color: colors.primary }]}>
                {onCancelText || 'Cancelar'}
              </Text>
            </Pressable>
            <Pressable style={styles.btn} onPress={onConfirm}>
              <Text style={[styles.btnText, { color: colors.primary }]}>
                {onConfirmText || 'Confirmar'}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.32,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  androidAlertBox: {
    maxWidth: 280,
    width: '100%',
    margin: 48,
    elevation: 24,
    borderRadius: 2,
  },
  androidTitle: {
    marginLeft: 24,
    marginRight: 24,
    marginTop: 24,
    marginBottom: 10,
    fontSize: 21,
    fontWeight: 'bold',
  },
  androidMessage: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
    fontSize: 16,
    fontWeight: 'normal',
  },
  buttons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  btn: {
    margin: 8,
    padding: 10,
  },
  btnText: {
    fontSize: 15,
    fontWeight: '500',
  },
});
