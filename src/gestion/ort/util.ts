import { Career, Subject } from "../../enmelon/model";

export function convertObjectToCareer(obj: any): Career {
    return {
        id: obj.IdTitulo,
        title: obj.NombreExtensoTitulo1
    }
}

export function convertObjMateriaToSubject(objMateria: any): Subject {
    return {
        id: objMateria.IdMateria,
        title: objMateria.Nombre,
        description: objMateria.Descripcion,
    }
}