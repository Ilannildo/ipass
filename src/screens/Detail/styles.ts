import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: '500',
    letterSpacing: 0.1,
  },
  // icon: { opacity: 0.5 },
  content: {
    paddingHorizontal: 24,
  },
  contentItem: {
    borderBottomWidth: 0.5,
    paddingBottom: 16,
    paddingTop: 16,
  },
  contentTop: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#000',
  },
  contentMiddle: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    paddingBottom: 16,
    paddingTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contentBottom: {
    marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  itemTitle: {
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  itemText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  itemRight: {
    // width: 123,
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
