import { Career, Subject, SubjectDependency, SubjectRequirement } from '../enmelon/model';

export interface Gestion {

    init(): void;
    deinit(): void;
    login(username: string, password: string): void;
    logout(): void;
    isUserLoggedIn(): Promise<boolean>;
    careers(): Promise<Career[]>;
    careerSubjects(careerId: string): Promise<Subject[]>;
    subjectsRequirements(careerId: string, subjects: Subject[]): Promise<SubjectRequirement[]>;

}