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
    alignItems: 'center',
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
    // lineHeight: 20,
    letterSpacing: 0.1,
  },
  itemRight: {
    height: 32,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 32,
    left: 0,
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  contentBottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnCopy: {
    // backgroundColor: '#000',
    padding: 4,
    marginLeft: 16,
  },
});
