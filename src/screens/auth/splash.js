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
  Image,
  View,
  Text
} from 'react-native';

import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { authAction } from '@stores/actions';

export default Splash = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      userInfo ? props.navigation.navigate('Main') : props.navigation.navigate('Auth');
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Image source={Images.logo} style={styles.imageLogo} />
      <Text style={styles.textTitle}>Flock</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark
  },
  imageLogo: {
    marginTop: -100,
    width: 200,
    height: 200
  },
  textTitle: {
    marginTop: -40,
    fontSize: 40,
    fontWeight: 'bold',
    color: Colors.white
  }
});