import React from 'react';
import { View, StyleSheet } from 'react-native';

export const PasswordCardLoading: React.FC = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#FFFFFF' }]}>
      <View style={styles.left}>
        <View style={[styles.leftTop, { backgroundColor: '#EDEDED' }]} />
        <View style={[styles.title, { backgroundColor: '#EDEDED' }]} />
        <View style={styles.footer}>
          <View style={[styles.item, { opacity: 0.5 }]}>
            {/* <MaterialIcons name="date-range" size={10} color="#EDEDED" /> */}
            <View style={[styles.footertext, { backgroundColor: '#EDEDED' }]} />
          </View>
          <View style={styles.item}>
            {/* <MaterialIcons name="access-time" size={10} color="#EDEDED" /> */}
            <View style={[styles.footertext, { backgroundColor: '#EDEDED' }]} />
          </View>
        </View>
      </View>

      <View style={styles.right}>
        <View style={[styles.rightEditBtn, { backgroundColor: '#EDEDED' }]} />
        <View style={styles.rightFooter}>
          <View style={[styles.item, { opacity: 0.5 }]}>
            {/* <MaterialIcons name="lock-outline" size={12} color="#EDEDED" /> */}
            <View style={[styles.footertext, { backgroundColor: '#EDEDED' }]} />
          </View>
          <View
            style={[styles.passwordForce, { backgroundColor: '#EDEDED' }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 350,
    height: 100,
    maxHeight: 150,
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    justifyContent: 'space-between',
    width: '50%',
  },
  leftTop: {
    width: 70,
    height: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    opacity: 0.5,
  },
  leftTopText: {
    fontSize: 10,
  },
  title: {
    width: 100,
    height: 25,
    borderRadius: 3,
  },
  footer: {
    justifyContent: 'space-between',
  },
  footertext: {
    width: 70,
    height: 6,
    borderRadius: 2,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    justifyContent: 'space-between',
    width: '50%',
    alignItems: 'flex-end',
  },
  rightEditBtn: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightFooter: {
    alignItems: 'center',
  },
  passwordForce: {
    width: 75,
    height: 6,
    borderRadius: 2,
  },
});
