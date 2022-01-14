import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 90,
    // backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 6,
    // justifyContent: 'space-around',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    // lineHeight: 24,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    // lineHeight: 24,
    letterSpacing: 0.1,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  footertext: {
    fontSize: 12,
    fontWeight: 'normal',
    // lineHeight: 20,
    letterSpacing: 0.25,
    marginLeft: 5,
  },
});
