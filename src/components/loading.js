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
  ActivityIndicator,
  Image,
  View,
} from 'react-native';

import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { athenaAction } from '@stores/actions';

export default Loading = (props) => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.athena);

  return (
    loading ? (
      <View style={styles.container}>
        {/* <Image source={Icons.loading} style={styles.indicator} /> */}
        <ActivityIndicator size={'large'} color={Colors.green} />
      </View>
    ) : <View />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.white,
    opacity: 0.5
  },
  indicator: {
    width: 150,
    height: 150
  },
});