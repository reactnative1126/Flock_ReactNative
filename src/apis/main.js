import { Urls } from '@configs';
import { Http } from '@services/http';
import { Functions, toURL } from '@services/functions';

export const apiSetLocation = (params) => {
    return Http.post(Urls.SET_LOCATION, {
        uid: params.uid,
        lat: params.latitude,
        lng: params.longitude,
        region: params.region
    });
};

export const apiSetFeel = (params) => {
    return Http.post(Urls.SET_FEEL, {
        uid: params.uid,
        feeling_type: params.type,
        feeling_value: params.status,
    });
};

export const apiGetLocations = (params) => {
    return Http.post(Urls.GET_LOCATIONS, {
        feeling_type: params.feeling_type,
        feeling_value: params.feeling_value,
    });
};

export const apiGetAnalytics = (params) => {
    return Http.post(Urls.GET_ANALYTICS, {
        startDate: params.startDate,
        endDate: params.endDate,
        region: params.region
    });
};

export const apiGetCharts = (params) => {
    return Http.post(Urls.GET_CHARTS, {
        startDate: params.startDate,
        endDate: params.endDate,
        region: params.region
    });
};