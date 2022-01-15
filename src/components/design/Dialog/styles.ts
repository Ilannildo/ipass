import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
    maxWidth: 312,
    width: '100%',
    margin: 48,
    elevation: 10,
    borderRadius: 28,
    padding: 8,
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
