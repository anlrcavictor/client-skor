import axios from 'axios';

const API_URL = 'http://localhost:8080/city/v1';

class CityService {

    cities() {
        return axios.get(API_URL);
    }

}

export default new CityService();
