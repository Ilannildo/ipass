import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    width: '100%',
    marginTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    marginTop: 5,
  },
  inputArea: {
    paddingHorizontal: 24,
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
  },
  passArea: {
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  passItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 24,
  },
  slideArea: {
    width: '100%',
    marginTop: 20,
  },
});
