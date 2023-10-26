import React, { Fragment, useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import { Icon } from 'react-native-elements';
import moment from 'moment';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';

import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { athenaAction } from '@stores/actions';

export default Header = (props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      {props.left && <View style={styles.buttonIcon} />}
      {props.back &&
        <TouchableOpacity style={styles.buttonIcon} onPress={props.onBack}>
          <Icon type='material' name='arrow-back' size={25} color={Colors.light} />
        </TouchableOpacity>}
      <TouchableOpacity onPress={props.onHome}>
        <Text style={styles.textTitle}>{props.title}</Text>
      </TouchableOpacity>
      <View style={styles.viewRight}>
        {props.logout &&
          <TouchableOpacity style={styles.buttonIcon} onPress={props.onLogout}>
            <Icon type='material' name='logout' size={25} color={Colors.light} />
          </TouchableOpacity>}
        {props.locale &&
          <TouchableOpacity style={styles.buttonIcon} onPress={props.onHawaii}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: Colors.light }}>{!props.hawaii ? 'HI' : 'CA'}</Text>
          </TouchableOpacity>}
        {props.setting &&
          <TouchableOpacity style={styles.buttonIcon} onPress={props.onSetting}>
          <Icon type='material' name='settings' size={25} color={Colors.light} />
          </TouchableOpacity>}
        {props.chart &&
          <TouchableOpacity style={styles.buttonIcon} onPress={props.onChart}>
          <Icon type='material' name='bar-chart' size={25} color={Colors.light} />
          </TouchableOpacity>}
        {props.right && <View style={styles.buttonIcon} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 16,
    width: wp('100%'),
    height: iOSDevice() ? 100 : 60,
    backgroundColor: Colors.dark,
    shadowColor: Colors.light,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
    elevation: 1,
    zIndex: 999
  },
  textTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light
  },
  viewRight: {
    flexDirection: 'row',
  },
  buttonIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30
  }
});