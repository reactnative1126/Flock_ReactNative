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

export default First = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    Geolocation.getCurrentPosition(async (pos) => {
      const apiKey = 'AIzaSyAgEQLD_85i6zvchmQHVT1Zp3dI08xzR1U'; // Replace with your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.coords?.latitude},${pos.coords?.longitude}&key=${apiKey}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const addressComponents = data?.results[0]?.address_components;
          var state = '';
          for (let component of addressComponents) {
            if (component.types.includes('administrative_area_level_1')) {
              state = component.short_name;
            }
          }
          dispatch(mainAction.setLocation(props.navigation, {
            uid: userInfo?.uid,
            latitude: pos.coords?.latitude,
            longitude: pos.coords?.longitude,
            region: state
          }));
        });
    })
  }, []);


  const onStatus = (type) => {
    var message = '';
    if (type == 'anxiety') message = 'Are you feeling anxiety/anxious today?';
    else if (type === 'depressed') message = 'Are you feeling depressed/sad today?';
    else if (type === 'stressed') message = 'Are you feeling stressed/pressure today?';
    else if (type === 'lonely') message = 'Are you feeling lonely today?';
    else message = 'Is there something you are grateful for today?';

    Alert.alert(message, ``, [
      {
        text: `No`,
        onPress: () => {
          dispatch(mainAction.setFeel(props.navigation, {
            uid: userInfo?.uid,
            type: type,
            status: 'no'
          }));
        },
        style: `cancel`
      }, {
        text: `Yes`,
        onPress: () => {
          dispatch(mainAction.setFeel(props.navigation, {
            uid: userInfo?.uid,
            type: type,
            status: 'yes'
          }));
        }
      }
    ])
  }

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header
        left
        setting
        title='CHECK IN'
        onSetting={() => props.navigation.push('Setting')}
      />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.textTop}>{'How are you feeling today?'}</Text>

        <TouchableOpacity style={styles.viewField} onPress={() => onStatus('anxiety')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.anxiety} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Anxiety / Anxious</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} onPress={() => onStatus('lonely')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.lonely} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Lonely</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} onPress={() => onStatus('depressed')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.sad} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Depressed / Sad</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} onPress={() => onStatus('stressed')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.stressed} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Stressed / Pressure</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} onPress={() => onStatus('grateful')}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.grateful} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Grateful</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.textBottom}>{'\"Feelings are something you have; not something you are.\"\n--Shannon L. Alder'}</Text>
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
    paddingVertical: 8,
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