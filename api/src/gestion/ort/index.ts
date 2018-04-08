import puppeteer, { ConsoleMessage } from 'puppeteer';
import { Career, Subject, SubjectDependency, SubjectRequirement } from '../../enmelon/model';
import { Gestion } from '../';
import { convertObjMateriaToSubject, convertObjectToCareer } from './util';

const GESTION_API_URL = 'https://gestionapi.ort.edu.uy/ORTSecure';

export default class GestionORT implements Gestion {
    
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;
    private pageConsoleLogHandled: Boolean = false;
    private sessionToken: string = '';

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

    async login(username: string, password: string) {
        console.log('trying to login...');
        await this.page.goto('https://gestion.ort.edu.uy/general/vistas/login.html');
        await this.page.type('#codigo_de_persona', username);
        await this.page.type('#contraseña_persona', password);
        await this.page.click('#LoginButton');
        await this.page.waitForNavigation();
        console.log('login succeed');

        console.log('trying to get the session token...');
        this.sessionToken = await this.page.evaluate('sessionStorage.token');
        console.log('session token: ******');
    }

    async logout() {
    }

    async isUserLoggedIn(): Promise<boolean> {
        return Promise.resolve(this.sessionToken != null && this.sessionToken.length > 0);
    }

    async careers(): Promise<Career[]> {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/Titulos?estado=CHEQUEOPREVIAS`);
        return JSON.parse(res).map((i: any) => convertObjectToCareer(i));
    }

    async careerSubjects(careerId: string): Promise<Subject[]> {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/MateriaDelTitulo?idTitulo=${careerId}`);
        return JSON.parse(res).map((i: any) => convertObjMateriaToSubject(i.ObjMateria));
    }

    async subjectsRequirements(careerId: string, subjects: Subject[]): Promise<SubjectRequirement[]> {
        let reqs: any[] = subjects.map(subject => ({ method: 'GET', url: `${GESTION_API_URL}/PerfilAcademico/MateriaDelTitulo/PreviasDeMateria?idTitulo=${careerId}&idMateria=${subject.id}` }))
        let res = await this._pageAjaxRequests(reqs);

        let subjectsRequirements: SubjectRequirement[] = [];

        for (var i in res) {
            let subjectRequirements = new SubjectRequirement();

            JSON.parse(res[i]).forEach((partialRes: any) => {
                partialRes.ColPreviasRequisito.forEach((colPreviasRequisito: any) => {
                    colPreviasRequisito.ObjRequisitoPreviaAlumno.ColMateriasRequisito.forEach((i: any) => {
                        let subjectDependency = new SubjectDependency();
                        subjectDependency.subject = convertObjMateriaToSubject(i.ObjMateria);

                        if (partialRes.TipoRequisito === 'P') {
                            subjectRequirements.partial.push(subjectDependency);
                        }
                        else if (partialRes.TipoRequisito === 'T') {
                            subjectRequirements.total.push(subjectDependency);
                        }
                    });
                })
            });

            subjectsRequirements.push(subjectRequirements);
        }

        return Promise.resolve(subjectsRequirements);
    }

    private async _pageAjaxRequest(method: string, url: string) {
        let res = await this._pageAjaxRequests([{ method: method, url: url }]);
        return res[0];
    }

    private async _pageAjaxRequests(reqs: any[]) {
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

    private _pageConsoleLog(enable: boolean) {
        if (this.pageConsoleLogHandled) return;

        if (enable) {
            this.page.on('console', this._pageConsoleLogHandler);
            this.pageConsoleLogHandled = true;
        }
        else {
            this.page.removeListener('console', this._pageConsoleLogHandler)
            this.pageConsoleLogHandled = false;
        }
    }

    private _pageConsoleLogHandler(log: ConsoleMessage) {
        console.log(log.text());
    }

}