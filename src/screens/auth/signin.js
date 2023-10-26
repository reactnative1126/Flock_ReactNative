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
  header
} from '@components';
import { Images, Icons, Fonts, Colors, Themes } from '@configs';
import { isLog, isEmpty, isEmail, iOSDevice } from '@services/functions';
import { authAction } from '@stores/actions';

export default SignIn = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

  const onEmail = (value) => {
    setEmail(value);
    setErrorEmail('');
  }

  const onPassword = (value) => {
    setPassword(value);
    setErrorPassword('');
  }

  const onSignIn = () => {
    let statusEmail;
    let statusPassword;

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

    if (statusEmail && statusPassword) {
      dispatch(authAction.signIn(props.navigation, {
        email,
        password
      }));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Header left right title='SIGN IN' />
      <ScrollView contentContainerStyle={styles.content}>
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

        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.blue }]}
          onPress={() => onSignIn()}
        >
          <Text style={[styles.textButton, { color: Colors.light }]}>SIGN IN</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.white }]}
          onPress={() => Toast.show({ type: 'success', text1: 'Google SignIn', text2: 'Comming soon' })}
        >
          <Image source={Icons.google} style={styles.imageButton} />
          <Text style={[styles.textButton, { color: Colors.gray }]}>SIGNIN IN WITH GOOGLE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#597BC4' }]}
          onPress={() => Toast.show({ type: 'success', text1: 'Facebook SignIn', text2: 'Comming soon' })}
        >
          <Image source={Icons.facebook} style={styles.imageButton} />
          <Text style={[styles.textButton, { color: Colors.white }]}>SIGNIN IN WITH FACEBOOK</Text>
        </TouchableOpacity> */}

        <View style={styles.viewBottom}>
          <Text style={styles.textBottom}>Don't have account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.textLink}>Create a new account</Text>
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