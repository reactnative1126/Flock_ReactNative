import axios from 'axios';
import { Functions } from '@services/functions';

export class Http {
  // Get
  static get(
    url,
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Functions.bearerToken}`
    }) {
    return axios({
      url,
      method: 'GET',
      headers,
      async: true,
      crossDomain: true,
      responseType: 'json',
      createXHR: () => new XMLHttpRequest()
    });
  }
  // Post
  static post(
    url,
    data,
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Functions.bearerToken}`
    }) {
    return axios({
      url,
      method: 'POST',
      data,
      headers,
      async: true,
      crossDomain: true,
      responseType: 'json',
      createXHR: () => new XMLHttpRequest()
    });
  }
  // Put
  static put(
    url,
    data,
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Functions.bearerToken}`
    }) {
    return axios({
      url,
      method: 'PUT',
      data,
      headers,
      async: true,
      crossDomain: true,
      responseType: 'json',
      createXHR: () => new XMLHttpRequest()
    });
  }
  // Delete
  static delete(
    url,
    data,
    headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Functions.bearerToken}`
    }) {
    return axios({
      url,
      method: 'DELETE',
      data,
      headers,
      async: true,
      crossDomain: true,
      responseType: 'json',
      createXHR: () => new XMLHttpRequest()
    });
  }
}
