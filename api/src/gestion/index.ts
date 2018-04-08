import { Career, Subject, SubjectDependency, SubjectRequirement } from '../enmelon/model';

export interface Gestion {

    init(): void;
    deinit(): void;
    login(username: String, password: String): void;
    logout(): void;
    isUserLoggedIn(): Promise<boolean>;
    careers(): Promise<Career[]>;
    careerSubjects(careerId: String): Promise<Subject[]>;
    subjectsRequirements(careerId: String, subjects: Subject[]): Promise<SubjectRequirement[]>;

}