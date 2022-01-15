import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  areaList: {
    width: '100%',
    marginTop: 20,
  },
  areaListPass: {
    // width: '100%',
    marginTop: 50,
    marginBottom: 100,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: 16,
    marginLeft: 24,
  },
  categoriesList: {
    // height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 24,
    marginLeft: 24,
    paddingRight: 36,
  },
  listEmpty: {
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  animView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  anim: {
    // marginBottom: 10,
    width: 100,
    height: 100,
  },
});
