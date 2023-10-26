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
  ScrollView,
  TouchableOpacity,
  Image,
  View,
  Text,
  Alert
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {
  Header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { authAction, mainAction } from '@stores/actions';

export default Setting = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);

  const onSignOut = () => {
    dispatch(authAction.signOut(props.navigation));
  };

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header
        back
        right
        title='SETTINGS'
        onBack={() => props.navigation.pop()}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity style={styles.viewField} onPress={() => props.navigation.replace('Analytics')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type='material-community' name='google-analytics' size={25} color={Colors.light} />
            <Text style={styles.textEmocon}>Analytics</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} onPress={() => onSignOut()}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon type='material-community' name='logout' size={25} color={Colors.light} />
            <Text style={styles.textEmocon}>Logout</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 16,
    alignItems: 'center'
  },
  textTop: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: '600',
    color: Colors.light
  },
  viewField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light
  },
  imageEmocon: {
    width: 60,
    height: 60,
  },
  textEmocon: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light
  },
  buttonYes: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  textYes: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light
  },
  buttonNo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  },
  textNo: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.light
  },
  textBottom: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: '500',
    color: Colors.light
  }
});