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
  Text
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, PROVIDER_GOOGLE } from 'react-native-maps';

import {
  Header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes, Polygon } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { authAction, mainAction } from '@stores/actions';

export default Home = (props) => {
  const dispatch = useDispatch();
  const { locations } = useSelector(state => state.main);

  const { feeling_type, feeling_value } = props.route.params;
  const [hawaii, setHawaii] = useState(false);
  const [hi, setHi] = useState(0);
  const [ca, setCa] = useState(0);

  const images = [Images.bird1, Images.bird2, Images.bird3, Images.bird4, Images.bird5]

  const [position, setPosition] = useState({
    latitude: 36.1387,
    longitude: -120.3601,
    latitudeDelta: 10,
    longitudeDelta: 10
  });

  useEffect(() => {
    dispatch(mainAction.getLocations(props.navigation, {
      feeling_type: feeling_type,
      feeling_value: feeling_value
    }));
  }, []);

  useEffect(() => {
    var hii = 0;
    var caa = 0;
    locations?.map((location, index) => {
      if (location?.region === 'CA') {
        caa = caa + 1;
      } else {
        hii = hii + 1;
      }
    });
    setHi(hii);
    setCa(caa);
  }, [locations]);

  useEffect(() => {
    setPosition(hawaii ? {
      latitude: 22.0000,
      longitude: -159.5450,
      latitudeDelta: 0.55,
      longitudeDelta: 0.55
    } : {
      latitude: 36.5,
      longitude: -119.5,
      latitudeDelta: 10,
      longitudeDelta: 10
    })
  }, [hawaii]);

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header
        back
        // logout
        locale
        hawaii={hawaii}
        title='MAP'
        onBack={() => props.navigation.goBack()}
        onHawaii={() => setHawaii(!hawaii)}
      />
      <View style={styles.content}>
        <View style={styles.viewText}>
          <Text style={styles.text}>{`${hawaii ? hi : ca} people near you are ${feeling_value == 'yes' ? 'also' : ''} feeling ${feeling_type == 'stressed' ? 'stressed/pressured' :
            feeling_type == 'anxiety' ? 'anxiety/anxious' :
              feeling_type == 'depressed' ? 'depressed/sad' : feeling_type
            } today.`}</Text>
        </View>
        <MapView
          region={position}
          style={styles.mapView}
          // scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          provider={Platform.OS == 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        >
          {locations?.map((location, index) => {
            var i = Math.floor(Math.random() * 50);
            return (
              <Marker key={`location${index}`}
                anchor={{ x: 0.5, y: 0.5 }}
                coordinate={{
                  latitude: location.region === 'CA' ? Polygon.CA[i][0] : Polygon.HI[i][0],
                  longitude: location.region === 'CA' ? Polygon.CA[i][1] : Polygon.HI[i][1]
                }}>
                {/* <View style={[styles.viewMarker, { borderColor: Colors.green }]} /> */}
                <Image source={images[Math.floor(Math.random() * 4)]} style={{ width: 20, height: 20, transform: [{ rotate: '30deg' }] }} resizeMode='contain' />
              </Marker>
            )
          })}
        </MapView>

        <View style={[styles.viewText, { paddingBottom: 30 }]}>
          <Text style={styles.text}>{
            feeling_type == 'anxiety' ? 'You are not alone, 264 million people worldwide struggle with anxiety daily.' :
              feeling_type == 'depressed' ? 'Even though it may feel like it, you are not alone. 280 million people worldwide struggle with depression.' :
                feeling_type == 'lonely' ? 'You are not alone, 1.7 billion people worldwide feel lonely on any given day.' :
                  feeling_type == 'stressed' ? 'This is very normal, over 243 million adults and teens in the US report experiencing stress that affects their mental health.' :
                    'Scientific research suggests that recognizing daily sources of gratitude can lead to a longer life.'
          }</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark
  },
  content: {
    height: hp('100%') - 100,
    justifyContent: 'space-between'
  },
  viewText: {
    width: '100%',
    padding: 8,
    backgroundColor: Colors.dark,
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: Colors.light
  },
  mapView: {
    width: wp('100%'),
    height: hp('100%') - 280
  },
  viewMarker: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#2EE7E9',
    backgroundColor: Colors.light,
    shadowColor: Colors.dark,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});