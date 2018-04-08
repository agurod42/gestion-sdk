import { Career, Subject, SubjectDependency, SubjectRequirement } from '../enmelon/model';
import { Gestion } from '../gestion';

export default class Enmelon {
    
    private cache: any = {
        careerSubjectsGraph: {}
    };
    
    private gestion: Gestion;

    constructor(gestion: Gestion) {
        this.gestion = gestion;
    }

    async init() {
        await this.gestion.init();
    }
    
    async deinit() {
        await this.gestion.deinit();
    }

    async login(username: string, password: string) {
        if (await this.gestion.isUserLoggedIn()) {
            console.log('User already logged in');
            return;
        }

        await this.gestion.login(username, password);
    }

    async logout() {
        await this.gestion.logout();
    }

    async careers(): Promise<Career[]> {
        return await this.gestion.careers();
    }

    async careerSubjects(careerId: string): Promise<Subject[]> {
        return await this.gestion.careerSubjects(careerId);
    }

    async careerSubjectsGraph(careerId: string): Promise<any> {
        if (this.cache.careerSubjectsGraph[careerId]) {
            return Promise.resolve(this.cache.careerSubjectsGraph[careerId]);
        }

        let subjects = await this.gestion.careerSubjects(careerId);
        let subjectsRequirements = await this.gestion.subjectsRequirements(careerId, subjects);
        let subjectsLinks: any[] = [];

        for (var i in subjects) {
            subjectsRequirements[i].total.forEach((subjectDependency) => {
                subjectsLinks.push({
                    source: subjectDependency.subject.id,
                    target: subjects[i].id
                });
            });
        }

        let careerSubjectsGraph = {
            links: subjectsLinks,
            nodes: subjects
        };

        this.cache.careerSubjectsGraph[careerId] = careerSubjectsGraph;

        return careerSubjectsGraph;
    }

    async subjecstRequirements(careerId: string, subjects: Subject[]): Promise<SubjectRequirement[]> {
        return await this.gestion.subjectsRequirements(careerId, subjects);
    }

    async careerDiagram() {

    }

    async careerTitle() {
        
    }

}