import axios from 'axios';

const API_URL = 'http://localhost:8080/score/v1';

class UserService {

    register(user) {
        return axios.post(API_URL, user);
    }

    cities() {
        return axios.get(API_URL);
    }

}

export default new UserService();
