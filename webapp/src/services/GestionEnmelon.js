import axios from 'axios';

const API_URL = 'http://localhost:3004/api';

export default class GestionEnmelon {

    static login(username, password) {
        let req = axios({
            method: 'POST',
            url: `${API_URL}/login`,
            data: {
                username: username,
                password: password
            },
        });

        req.then(res => {
            localStorage.setItem('gestion-enmelon-token', res);
        });

        return req;
    }

    static careerSubjectsGraph() {
        return axios({
            method: 'GET',
            url: `${API_URL}/careerSubjectsGraph`,
            data: {
                
            },
            json: true
        });
    }

}