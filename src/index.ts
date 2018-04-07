import Enmelon from './enmelon';
import GestionORT from './gestion/ort';

Enmelon.with(new GestionORT(), async (gestionenmelon: Enmelon) => {

    await gestionenmelon.login('194412', 'F3d320102');
    let careers = await gestionenmelon.careers();
    let subjects = await gestionenmelon.careerSubjects(careers[0].id);
    let subjectGraph = await gestionenmelon.careerSubjectsGraph(careers[0].id);

    console.log(subjectGraph);

});