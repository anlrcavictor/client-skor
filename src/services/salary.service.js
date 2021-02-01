import axios from 'axios';

const API_URL = 'http://localhost:8080/salary/v1';

class SalaryService {

    salaries() {
        return axios.get(API_URL);
    }

}

export default new SalaryService();
