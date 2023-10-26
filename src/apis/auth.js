import { Urls } from '@configs';
import { Http } from '@services/http';
import { Functions, toURL } from '@services/functions';

export const apiSignIn = (params) => {
    return Http.post(Urls.SIGN_IN, {
        uid: params.uid,
        token: 'params.token'
    });
};

export const apiSignUp = (params) => {
    return Http.post(Urls.SIGN_UP, {
        uid: params.uid,
        token: 'params.token',
        email: params.email,
        fullname: params.fullname
    });
};
