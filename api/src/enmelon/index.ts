import { Career, Subject, SubjectDependency, SubjectRequirement } from '../enmelon/model';
import { Gestion } from '../gestion';

export default class Enmelon {
    
    private gestion: Gestion;

    private constructor(gestion: Gestion) {
        this.gestion = gestion;
    }

    static async with(gestion: Gestion, fn: (enmelon: Enmelon) => any) {
        await gestion.init();
        await fn(new Enmelon(gestion));
        await gestion.deinit();
    }
    
    async login(username: String, password: String) {
        await this.gestion.login(username, password);
    }

    async logout() {
        await this.gestion.logout();
    }

    async careers(): Promise<Career[]> {
        return await this.gestion.careers();
    }

    async careerSubjects(careerId: String): Promise<Subject[]> {
        return await this.gestion.careerSubjects(careerId);
    }

    async careerSubjectsGraph(careerId: String): Promise<any> {
        let subjects = await this.gestion.careerSubjects(careerId);
        let subjectsRequirements = await this.gestion.subjectsRequirements(careerId, subjects);
        let subjectsLinks: any[] = [];

        for (var i in subjects) {
            subjectsRequirements[i].total.forEach((subjectDependency) => {
                subjectsLinks.push({
                    from: subjectDependency.subject.id,
                    to: subjects[i].id
                });
            });
        }

        return {
            nodes: subjects,
            edges: subjectsLinks
        };
    }

    async subjecstRequirements(careerId: String, subjects: Subject[]): Promise<SubjectRequirement[]> {
        return await this.gestion.subjectsRequirements(careerId, subjects);
    }

    async careerDiagram() {

    }

    async careerTitle() {
        
    }

}