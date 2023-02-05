

import { ApiEnpoints } from '@constants/api';
import Source from 'models/Source';
import Topic from 'models/Topic';



import HttpClient from './HttpClient';

const PlatformService = {

    getTopics: async () => {
        try {
            const response = await HttpClient.get(ApiEnpoints.topics.getTopic());
            const { data } = response;
            return data as Topic[];
        } catch (e) {
            return [];
        }
    },
    getSources: async () => {
        try {
            const response = await HttpClient.get(ApiEnpoints.topics.getSources());
            const { data } = response;
            return data as Source[];
        } catch (e) {
            return [];
        }
    },
};

export default PlatformService;
