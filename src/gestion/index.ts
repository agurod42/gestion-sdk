import { Career, Subject, SubjectDependency, SubjectRequirement } from '../enmelon/model';

export interface Gestion {

    init(): void;
    deinit(): void;
    login(username: String, password: String): void;
    logout(): void;
    careers(): Promise<Career[]>;
    careerSubjects(careerId: String): Promise<Career[]>;
    subjectRequirements(careerId: String, subjectId: String): Promise<SubjectRequirement>;

}