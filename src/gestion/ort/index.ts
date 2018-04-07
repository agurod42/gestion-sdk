import puppeteer from 'puppeteer';
import { Career, Subject, SubjectDependency, SubjectRequirement } from '../../enmelon/model';
import { Gestion } from '../';
import { convertObjMateriaToSubject, convertObjectToCareer } from './util';

const GESTION_API_URL = 'https://gestionapi.ort.edu.uy/ORTSecure';

export default class GestionORT implements Gestion {
    
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;
    private sessionToken: String = '';

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

    async login(username: String, password: String) {
        console.log('trying to login...');
        await this.page.goto('https://gestion.ort.edu.uy/general/vistas/login.html');
        await this.page.type('#codigo_de_persona', '194412');
        await this.page.type('#contraseña_persona', 'F3d320102');
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
        await this.page.goto('https://gestion.ort.edu.uy/general/vistas/principal.html');
        return !/login\.html$/.test(this.page.url());
    }

    async careers(): Promise<Career[]> {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/Titulos?estado=CHEQUEOPREVIAS`);
        return JSON.parse(res).map((i: any) => convertObjectToCareer(i));
    }

    async careerSubjects(careerId: String): Promise<Subject[]> {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/MateriaDelTitulo?idTitulo=${careerId}`);
        return JSON.parse(res).map((i: any) => convertObjMateriaToSubject(i.ObjMateria));
    }

    async subjectRequirements(careerId: String, subjectId: String): Promise<SubjectRequirement> {
        let res = await this._pageAjaxRequest('GET', `${GESTION_API_URL}/PerfilAcademico/MateriaDelTitulo/PreviasDeMateria?idTitulo=${careerId}&idMateria=${subjectId}`);
        let subjectRequirements: any = new SubjectRequirement();
        let subjectRequirementType: any = { 'P': 'partial', 'T': 'total' };

        JSON.parse(res).forEach((partialRes: any) => {
            partialRes.ColPreviasRequisito.forEach((colPreviasRequisito: any) => {
                colPreviasRequisito.ObjRequisitoPreviaAlumno.ColMateriasRequisito.forEach((i: any) => {
                    let subjectDependency = new SubjectDependency();
                    subjectDependency.subject = convertObjMateriaToSubject(i.ObjMateria);
                    subjectRequirements[subjectRequirementType[partialRes.TipoRequisito]].push(subjectDependency);
                });
            })
        })

        return Promise.resolve(subjectRequirements);
    }

    async _pageAjaxRequest(method: String, url: String) {
        return await this.page.evaluate(
            (method, url) => {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.open(method, url, false);
                xmlhttp.setRequestHeader('x-token', sessionStorage.token);
                xmlhttp.send();

                if (xmlhttp.status == 200) {
                    return Promise.resolve(xmlhttp.responseText);
                }
                else {
                    return Promise.reject('err');
                }
            },
            method, 
            url
        );
    }

}