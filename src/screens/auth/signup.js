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
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  View,
  Text
} from 'react-native';

import {
  Header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, isEmail, iOSDevice } from '@services/functions';
import { authAction } from '@stores/actions';

export default SignUp = (props) => {
  const dispatch = useDispatch();

  const [fullname, setFullname] = useState('');
  const [errorFullname, setErrorFullname] = useState('');
  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errorConfirm, setErrorConfirm] = useState('');

  const onFullname = (value) => {
    setFullname(value);
    setErrorFullname('');
  };

  const onEmail = (value) => {
    setEmail(value);
    setErrorEmail('');
  }

  const onPassword = (value) => {
    setPassword(value);
    setErrorPassword('');
  }

  const onConfirm = (value) => {
    setConfirm(value);
    setErrorConfirm('');
  }

  const onSignUp = () => {
    let statusFullname;
    let statusEmail;
    let statusPassword;
    let statusConfirm;

    if (isEmpty(fullname)) {
      statusFullname = false;
      setErrorFullname('Required field');
    } else if (fullname?.length < 2) {
      statusFullname = false;
      setErrorFullname('Enter more 2 characters');
    } else {
      statusFullname = true;
      setErrorFullname('');
    }

    if (isEmpty(email)) {
      statusEmail = false;
      setErrorEmail('Required field');
    } else if (!isEmail(email)) {
      statusEmail = false;
      setErrorEmail('Invalid Email');
    } else {
      statusEmail = true;
      setErrorEmail('');
    }

    if (isEmpty(password)) {
      statusPassword = false;
      setErrorPassword('Required field');
    } else if (password?.length < 8) {
      statusPassword = false;
      setErrorPassword('Enter more 8 characters');
    } else {
      statusPassword = true;
      setErrorPassword('');
    }

    if (isEmpty(confirm)) {
      statusConfirm = false;
      setErrorConfirm('Required field');
    } else if (password !== confirm) {
      statusConfirm = false;
      setErrorConfirm('Not matched');
    } else {
      statusConfirm = true;
      setErrorConfirm('');
    }

    if (statusFullname && statusEmail && statusPassword && statusConfirm) {
      dispatch(authAction.signUp(props.navigation, {
        fullname,
        email,
        password
      }));
    }
  }

  return (
    <View style={styles.container} >
      <StatusBar hidden />
      <Header left right title='SIGN UP' />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.viewField}>
          <Text style={styles.textTitle}>User Name*</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(value) => onFullname(value)}
          />
          <Text style={styles.textError}>{errorFullname}</Text>
        </View>

        <View style={styles.viewField}>
          <Text style={styles.textTitle}>Email*</Text>
          <TextInput
            autoCapitalize='none'
            keyboardType='email-address'
            style={styles.inputField}
            onChangeText={(value) => onEmail(value)}
          />
          <Text style={styles.textError}>{errorEmail}</Text>
        </View>

        <View style={styles.viewField}>
          <Text style={styles.textTitle}>Password*</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputField}
            onChangeText={(value) => onPassword(value)}
          />
          <Text style={styles.textError}>{errorPassword}</Text>
        </View>

        <View style={styles.viewField}>
          <Text style={styles.textTitle}>Confirm*</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputField}
            onChangeText={(value) => onConfirm(value)}
          />
          <Text style={styles.textError}>{errorConfirm}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.blue }]}
          onPress={() => onSignUp()}
        >
          <Text style={[styles.textButton, { color: Colors.light }]}>SIGN UP</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.white }]}
          onPress={() => Toast.show({ type: 'success', text1: 'Google SignUp', text2: 'Comming soon' })}
        >
          <Image source={Icons.google} style={styles.imageButton} />
          <Text style={[styles.textButton, { color: Colors.gray }]}>SIGNUP IN WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#597BC4' }]}
          onPress={() => Toast.show({ type: 'success', text1: 'Facebook SignUp', text2: 'Comming soon' })}
        >
          <Image source={Icons.facebook} style={styles.imageButton} />
          <Text style={[styles.textButton, { color: Colors.white }]}>SIGNUP IN WITH FACEBOOK</Text>
        </TouchableOpacity> */}

        <View style={styles.viewBottom}>
          <Text style={styles.textBottom}>Already have a account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.textLink}>Sign in</Text>
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
    alignItems: 'center',
    paddingTop: 50,
  },
  viewField: {
    marginBottom: 16,
    width: '100%',
    paddingHorizontal: 16
  },
  textTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.light
  },
  inputField: {
    marginTop: 4,
    paddingHorizontal: 8,
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: Colors.light,
    borderRadius: 8,
    color: Colors.light
  },
  textError: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
    color: Colors.red
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    width: wp('100%') - 32,
    height: 40,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textButton: {
    fontSize: 16,
    fontWeight: '700',
  },
  imageButton: {
    marginRight: 16,
    width: 25,
    height: 25
  },
  viewBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  textBottom: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.light
  },
  textLink: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light,
  }
});