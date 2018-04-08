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
            }
        });

        req.then(res => {
            localStorage.setItem('gestion-enmelon-token', res.data);
        });

        return req;
    }

    static logout() {
        localStorage.removeItem('gestion-enmelon-token');
        return Promise.resolve();
    }

    static careerSubjectsGraph(careerId) {
        return axios({
            method: 'GET',
            url: `${API_URL}/careerSubjectsGraph`,
            data: {
                careerId: careerId
            },
            headers: {
                'x-gestion-enmelon-token': localStorage.getItem('gestion-enmelon-token')
            }
        });
    }

    static tokenExists() {
        let token = localStorage.getItem('gestion-enmelon-token');
        return token != null && token.length > 0;
    }

}