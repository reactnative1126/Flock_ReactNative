import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export class Functions {
  static clientId = 'waGiFOvU969D2xl60c_vOvEKTcbPiA0BXcgiC_PeDKk';
  static bearerToken = 'v2/RjRsQXRUQWpyQ3dndjZESFpUMmZNQWozU2NZdEFTdlQvMzk3NDgwNzM5L2N1c3RvbWVyLzQvZE41T2UwTzJ4UkJ2T1F4WUJZeXQ4UnVUN3lpWW9ncmdKNG9TUlM4QmdlSTZPaWdSQ0x1ajBKS3V0elYzaEhXS25kci1kaHNwLUt2WHhjRWlNSFVXTTFaT3JYZHJvMmpuMW9BUGltUkpDVXRReTQ0WUpqSWxwYXhSNnZranFTbldsdnhoOXdHTVlYR2Y2cXUzRE1FQmJTeWxPeFQ2N3JqdTkxSVBRVGxBaGRtNlZSYzhwSmtyeUZkN0lwU3BJUnN3cjZBdVRGRnVxSENWc2FuOEotcWQyZy9GTU5lTDhOTVFvajQ3T29feVJNWmpB';
}

export const navOptionHandler = () => ({
  headerShown: false
});

export const toURL = ({ url, id, query }) => {
  let newURL = id ? `${url}/${id}${query ? '?' : ''}` : url + '?';
  let keys = Object.keys(query || {});
  keys.map((key) => {
    let value = query[key];
    if (value != undefined || value != null) {
      if (typeof value === 'object' && value.length) {
        for (let i = 0; i < value.length; i++) {
          newURL += `${key}=${value[i]}&`;
        }
      } else {
        newURL += `${key}=${value}&`;
      }
    }
  });

  if (newURL.includes('&')) {
    let lastIndex = newURL.lastIndexOf('&');
    newURL = newURL.substring(0, lastIndex);
  }
  return newURL;
};

export const isLog = (type, message) => {
  if (type === 1) {
    console.log(`\x1b[31mError: `, `\x1b[37m${message}`);
  } else if (type === 2) {
    console.log(`\x1b[32mSuccess: `, `\x1b[37m${message}`);
  } else if (type === 3) {
    console.log(`\x1b[33mInfo: `, `\x1b[37m${message}`);
  } else if (type === 4) {
    console.log(`\x1b[35mAthena: `, `\x1b[37m${message}`);
  } else if (type === 5) {
    console.log(`\x1b[36mQueen: `, `\x1b[37m${message}`);
  }
};

export const isEmpty = (data) => {
  return !data || data == undefined || data == null ||
    (typeof data === 'string' && data == '') ||
    (typeof data === 'array' && data.length == 0);
};

export const isPrice = (amount, currency) => {
  return `${(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: currency
  })}`
};

export const isEmail = (email) => {
  let email_ = email.trim();
  var expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return expression.test(String(email_).toLowerCase());
};

export const shortString = (data, length) => {
  return data?.length > length ? `${data.substring(0, length)}...` : data
};

export const iOSDevice = () => {
  return Platform.OS === 'ios' && (
    DeviceInfo.getModel() === 'iPhone X' ||
    DeviceInfo.getModel() === 'iPhone XS' ||
    DeviceInfo.getModel() === 'iPhone XS Max' ||
    DeviceInfo.getModel() === 'iPhone XR' ||
    DeviceInfo.getModel() === 'iPhone 11' ||
    DeviceInfo.getModel() === 'iPhone 11 Pro' ||
    DeviceInfo.getModel() === 'iPhone 11 Pro Max' ||
    DeviceInfo.getModel() === 'iPhone 12 mini' ||
    DeviceInfo.getModel() === 'iPhone 12' ||
    DeviceInfo.getModel() === 'iPhone 12 Pro' ||
    DeviceInfo.getModel() === 'iPhone 12 Pro Max' ||
    DeviceInfo.getModel() === 'iPhone 13 mini' ||
    DeviceInfo.getModel() === 'iPhone 13' ||
    DeviceInfo.getModel() === 'iPhone 13 Pro' ||
    DeviceInfo.getModel() === 'iPhone 13 Pro Max'
  )
};

