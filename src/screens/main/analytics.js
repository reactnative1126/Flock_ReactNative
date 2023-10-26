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
import DatePicker from 'react-native-date-picker';

import {
  Header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { authAction, mainAction } from '@stores/actions';

export default Analytics = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { analytics } = useSelector(state => state.main);

  const [area, setArea] = useState('ALL');

  const [fromDate, setFromDate] = useState(moment().format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().format('YYYY-MM-DD'));
  const [from, setFrom] = useState(false);
  const [to, setTo] = useState(false);

  useEffect(() => {
    onSearch(area, fromDate, toDate);
  }, []);

  const onSearch = (a, f, t) => {
    setArea(a);
    setFromDate(f);
    setToDate(t);
    setFrom(false);
    setTo(false);
    if (moment(f).isAfter(t)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please select dates again.' });
    } else {
      dispatch(mainAction.getAnalytics(props.navigation, {
        startDate: moment(f).utc().format('YYYY-MM-DD'),
        endDate: moment(t).utc().format('YYYY-MM-DD'),
        region: a
      }));
    }
  }

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header
        back
        chart
        title='ANALYTICS'
        onBack={() => props.navigation.pop()}
        onChart={() => props.navigation.push('ChartView')}
      />
      <ScrollView contentContainerStyle={styles.content}>

        <View style={styles.viewDate}>
          <TouchableOpacity
            style={[styles.buttonOne, { backgroundColor: area === 'ALL' ? Colors.green : Colors.gray }]}
            onPress={() => onSearch('ALL', fromDate, toDate)}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.light }}>ALL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonOne, { backgroundColor: area === 'CA' ? Colors.green : Colors.gray }]}
            onPress={() => onSearch('CA', fromDate, toDate)}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.light }}>California</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonOne, { backgroundColor: area === 'HI' ? Colors.green : Colors.gray }]}
            onPress={() => onSearch('HI', fromDate, toDate)}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: Colors.light }}>Hawaii</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.viewDate, { marginTop: 16 }]}>
          <View style={{ width: '45%' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.light }}>From</Text>
          </View>
          <View style={{ width: '45%' }}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.light }}>To</Text>
          </View>
        </View>
        <View style={styles.viewDate}>
          <TouchableOpacity style={styles.viewOne} onPress={() => setFrom(true)}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.light }}>{fromDate}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewOne} onPress={() => setTo(true)}>
            <Text style={{ fontSize: 16, fontWeight: '500', color: Colors.light }}>{toDate}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.viewField, { marginTop: 32 }]} disabled>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.anxiety} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Anxiety / Anxious</Text>
          </View>
          <Text style={styles.textEmocon}>{analytics?.anxietyCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} disabled>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.lonely} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Lonely</Text>
          </View>
          <Text style={styles.textEmocon}>{analytics?.lonelyCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} disabled>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.sad} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Depressed / Sad</Text>
          </View>
          <Text style={styles.textEmocon}>{analytics?.depressedCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} disabled>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.stressed} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Stressed / Pressure</Text>
          </View>
          <Text style={styles.textEmocon}>{analytics?.stressedCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.viewField} disabled>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Icons.grateful} style={styles.imageEmocon} resizeMode='contain' />
            <Text style={styles.textEmocon}>Grateful</Text>
          </View>
          <Text style={styles.textEmocon}>{analytics?.gratefulCount}</Text>
        </TouchableOpacity>
      </ScrollView>
      <DatePicker
        key='from'
        modal
        mode='date'
        open={from}
        minimumDate={moment('2000-01-01').toDate()}
        date={moment(fromDate, 'YYYY-MM-DD').toDate()}
        onConfirm={(date) => onSearch(area, moment(date).format('YYYY-MM-DD'), toDate)}
        onCancel={() => setFrom(false)}
      />
      <DatePicker
        key='to'
        modal
        mode='date'
        open={to}
        maximumDate={moment().toDate()}
        date={moment(toDate, 'YYYY-MM-DD').toDate()}
        onConfirm={(date) => onSearch(area, fromDate, moment(date).format('YYYY-MM-DD'))}
        onCancel={() => setTo(false)}
      />
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
  viewDate: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonOne: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
    height: 25,
    borderRadius: 4
  },
  viewOne: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    width: '45%',
    height: 35,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors.light
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
});