const puppeteer = require('puppeteer');

const GESTION_API_URL = 'https://gestionapi.ort.edu.uy/ORTSecure';

module.exports = class GestionORT {
    
    constructor() {
        this.browser = null;
        this.page = null;
        this.pageConsoleHandled = false;
        this.sessionToken = '';
    }

    async init() {
        console.log('init');
        this.browser = await puppeteer.launch();
        this.page = await this.browser.newPage();
    }

    async deinit() {
        console.log('deinit');
        await this.page.close();
        await this.browser.close();
    }

    async login(username, password) {
        await this.page.goto('https://gestion.ort.edu.uy/general/vistas/login.html');
        await this.page.type('#codigo_de_persona', username);
        await this.page.type('#contraseña_persona', password);
        await this.page.type('#contraseña_persona', String.fromCharCode(13));
        
        try {
            await this.page.waitForSelector('#InicioBienvenida', { timeout: 2000 });
            this.sessionToken = await this.page.evaluate('sessionStorage.token');
            return this.sessionToken;
        }
        catch (ex) {
            console.log(ex);
        }
    }

    async logout() {
    }

    async isUserLoggedIn() {
        return this.sessionToken != null && this.sessionToken.length > 0;
    }

    async careers() {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/Titulos?estado=CHEQUEOPREVIAS`);
        return JSON.parse(res);
    }

    async careerSubjects(careerId) {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/MateriaDelTitulo?idTitulo=${careerId}`);
        return JSON.parse(res);
    }

    async _pageAjaxRequest(method, url) {
        let res = await this._pageAjaxRequests([{ method: method, url: url }]);
        return res[0];
    }

    async _pageAjaxRequests(reqs) {
        this._pageConsoleLog(true);

        let res = await this.page.evaluate(
            (reqs) => {
                let res = [];

                for (var i in reqs) {
                    var xhr = new XMLHttpRequest();
                    xhr.open(reqs[i].method, reqs[i].url, false);
                    xhr.setRequestHeader('x-token', sessionStorage.token);
                    xhr.send();

                    if (xhr.status == 200) {
                        res.push(xhr.responseText);
                    }
                    else {
                        res.push(new Error('err'));
                    }

                    console.log('req ' + i + ' completed');
                }
                
                return Promise.resolve(res);
            },
            reqs
        );

        this._pageConsoleLog(false);

        return res;
    }

    _pageConsoleLog(enable) {
        if (this.pageConsoleHandled) return;

        if (enable) {
            this.page.on('console', this._pageConsoleLogHandler);
            this.pageConsoleHandled = true;
        }
        else {
            this.page.removeListener('console', this._pageConsoleLogHandler)
            this.pageConsoleHandled = false;
        }
    }

    _pageConsoleLogHandler(log) {
        console.log(log.text());
    }

}