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
import CalendarStrip from 'react-native-calendar-strip';
// import { LineChart } from 'react-native-chart-kit';
import { Chart, Line, Area, VerticalAxis, HorizontalAxis } from 'react-native-responsive-linechart';

import {
  Header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, iOSDevice } from '@services/functions';
import { authAction, mainAction } from '@stores/actions';

export default ChartView = (props) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector(state => state.auth);
  const { charts, maxCount } = useSelector(state => state.main);

  const [area, setArea] = useState('ALL');

  const [fromDate, setFromDate] = useState(moment().weekday(1).format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState(moment().weekday(7).format('YYYY-MM-DD'));

  const [select, setSelect] = useState('anxiety');


  useEffect(() => {
    onSearch(area, fromDate, toDate);
  }, []);

  const onSearch = (a, f, t) => {
    setArea(a);
    setFromDate(f);
    setToDate(t);
    if (moment(f).isAfter(t)) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Please select dates again.' });
    } else {
      dispatch(mainAction.getCharts(props.navigation, {
        startDate: moment(`${f}T00:00:00`).utc(),
        endDate: moment(`${t}T23:59:59`).utc(),
        region: a
      }));
    }
  }

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header
        back
        right
        title='CHART'
        onBack={() => props.navigation.pop()}
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

        <CalendarStrip
          scrollerPaging={true}
          style={{ width: wp('100%') - 32, height: 100, paddingTop: 20, paddingBottom: 10 }}
          calendarHeaderStyle={{ color: Colors.white }}
          dateNumberStyle={{ color: Colors.white }}
          dateNameStyle={{ color: Colors.white }}
          leftSelector={<Icon type='material' name='arrow-back-ios' size={20} color={Colors.white} />}
          rightSelector={<Icon type='material' name='arrow-forward-ios' size={20} color={Colors.white} />}
          onWeekChanged={(start, end) => {
            setFromDate(moment(start).format('YYYY-MM-DD'));
            setToDate(moment(end).format('YYYY-MM-DD'));
            // onSearch(area, moment(start).format('YYYY-MM-DD'), moment(end).format('YYYY-MM-DD'));
          }}
        />
        <Chart
          style={{ height: 200, width: '100%', backgroundColor: Colors.dark }}
          xDomain={{ min: 0, max: 6 }}
          yDomain={{
            min: 0, max: parseInt(
              select === 'anxiety' ? maxCount?.anxiety :
                select === 'lonely' ? maxCount?.lonely :
                  select === 'depressed' ? maxCount?.depressed :
                    select === 'stressed' ? maxCount?.stressed :
                      maxCount?.grateful
            )
          }}
          padding={{ left: 50, top: 16, bottom: 30, right: 10 }}
        >
          <VerticalAxis tickCount={6} theme={{
            grid: {
              visible: true,
              stroke: {
                color: '#ccc',
                width: 0.5,
                opacity: 0.5,
              },
            },
            labels: {
              label: {
                dx: -20,
                color: Colors.white
              },
              formatter: (v) => v
            }
          }} />
          <HorizontalAxis tickCount={7} theme={{
            grid: {
              visible: true,
              stroke: {
                color: '#ccc',
                width: 0.5,
                opacity: 0.5,
              },
            },
            labels: {
              label: {
                dy: -20,
                color: Colors.white
              },
              formatter: (v) => v == 0 ? 'MON' : v == 1 ? 'TUS' : v == 2 ? 'WED' : v == 3 ? 'THU' : v == 4 ? 'FRI' : v == 5 ? 'SAT' : 'SUN'
            }
          }} />
          <Line data={
            select === 'anxiety' ? charts?.anxiety :
              select === 'lonely' ? charts?.lonely :
                select === 'depressed' ? charts?.depressed :
                  select === 'stressed' ? charts?.stressed :
                    charts?.grateful
          }
            smoothing="none"
            theme={{
              stroke: {
                color:
                  select === 'anxiety' ? 'red' :
                    select === 'lonely' ? 'green' :
                      select === 'depressed' ? 'blue' :
                        select === 'stressed' ? 'yellow' :
                          'indigo', width: 2
              }
            }} />
        </Chart>
        <View style={{ width: '100%', marginTop: 32 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
            onPress={() => setSelect('anxiety')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'red' }} />
              <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>Anxiety</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>{parseInt(charts?.anxiety[0]?.y) + parseInt(charts?.anxiety[1]?.y) + parseInt(charts?.anxiety[2]?.y) + parseInt(charts?.anxiety[3]?.y) + parseInt(charts?.anxiety[4]?.y + parseInt(charts?.anxiety[5]?.y) + parseInt(charts?.anxiety[6]?.y))}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
            onPress={() => setSelect('lonely')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'green' }} />
              <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>Loneliness</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>{parseInt(charts?.lonely[0]?.y) + parseInt(charts?.lonely[1]?.y) + parseInt(charts?.lonely[2]?.y) + parseInt(charts?.lonely[3]?.y) + parseInt(charts?.lonely[4]?.y + parseInt(charts?.lonely[5]?.y) + parseInt(charts?.lonely[6]?.y))}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
            onPress={() => setSelect('depressed')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'blue' }} />
              <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>Depression</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>{parseInt(charts?.depressed[0]?.y) + parseInt(charts?.depressed[1]?.y) + parseInt(charts?.depressed[2]?.y) + parseInt(charts?.depressed[3]?.y) + parseInt(charts?.depressed[4]?.y + parseInt(charts?.depressed[5]?.y) + parseInt(charts?.depressed[6]?.y))}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
            onPress={() => setSelect('stressed')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'yellow' }} />
              <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>Stressed/Pressure</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>{parseInt(charts?.stressed[0]?.y) + parseInt(charts?.stressed[1]?.y) + parseInt(charts?.stressed[2]?.y) + parseInt(charts?.stressed[3]?.y) + parseInt(charts?.stressed[4]?.y + parseInt(charts?.stressed[5]?.y) + parseInt(charts?.stressed[6]?.y))}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
              width: '100%',
              padding: 10,
            }}
            onPress={() => setSelect('grateful')}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: 'indigo' }} />
              <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>Grateful</Text>
            </View>
            <Text style={{ marginLeft: 10, fontSize: 12, fontWeight: '500', color: Colors.white }}>{parseInt(charts?.grateful[0]?.y) + parseInt(charts?.grateful[1]?.y) + parseInt(charts?.grateful[2]?.y) + parseInt(charts?.grateful[3]?.y) + parseInt(charts?.grateful[4]?.y + parseInt(charts?.grateful[5]?.y) + parseInt(charts?.grateful[6]?.y))}</Text>
          </TouchableOpacity>
        </View>
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