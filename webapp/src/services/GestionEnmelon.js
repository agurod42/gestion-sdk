import axios from 'axios';

const API_URL = 'http://localhost:3004/api';

export default class GestionEnmelon {

    static login(username, password) {
        let req = this._request({
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
        return this._request({
            method: 'GET',
            url: `${API_URL}/careerSubjectsGraph?careerId=${careerId}`
        });
    }

    static tokenExists() {
        let token = localStorage.getItem('gestion-enmelon-token');
        return token != null && token.length > 0;
    }

    static _request(options) {
        let token = localStorage.getItem('gestion-enmelon-token');

        if (token != null && token.length > 0) {
            options.headers = {
                'x-gestion-enmelon-token': token
            }
        }
        
        let req = axios(options);

        req.catch(err => {
            if (err.response.data === 'Invalid token') {
                this.logout();
            }
        });

        return req;
    }

}