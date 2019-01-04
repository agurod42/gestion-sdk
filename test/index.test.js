/**
 * @jest-environment node
 */

const gestion = require('../src');

const BASE64_REGEX = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;

require('dotenv').config();

beforeAll(async () => {
    await gestion.iniciarSesion(process.env.GESTION_USERNAME, process.env.GESTION_PASSWORD);
});

describe('/', () => {

    test('foto', async () => {
        expect(await gestion.foto()).toEqual(expect.stringMatching(BASE64_REGEX));
    });
    
});

describe('/certificados', () => {

    const ID_TITULO = 2001; // Ingeniería en Sistemas

    test('cert195PDF', async () => {
        expect(await gestion.certificados.cert195PDF(ID_TITULO)).toEqual(expect.stringMatching(BASE64_REGEX));
    });

});

describe('/cursos', () => {

    const ID_PRODUCTO =   378; // Ingeniería en Sistemas
    const ID_COMIENZO =  1213; // Taller Febrero - Marzo 2019
    const ID_OFERTA   = 43627; // Taller de Ética y legislación

    test('comienzos', async () => {
        expect(await gestion.cursos.comienzos(ID_PRODUCTO)).toContainEqual(expect.objectContaining({ IdComienzo: expect.anything() }));
    });

    test('inscripciones', async () => {
        expect(await gestion.cursos.inscripciones()).toContainEqual(expect.objectContaining({ Carrera: expect.anything(), IdOferta: expect.anything() }));
    });

    test('ofertasCreditos', async () => {
        expect(await gestion.cursos.ofertasCreditos(ID_PRODUCTO, ID_COMIENZO, ID_OFERTA)).toEqual(expect.objectContaining({ ColOfertas: expect.anything() }));
    });

    test('ofertasPorProducto', async () => {
        expect(await gestion.cursos.ofertasPorProducto(ID_PRODUCTO, ID_COMIENZO)).toContainEqual(expect.objectContaining({ IdOferta: expect.anything() }));
    });

    test('productos', async () => {
        expect(await gestion.cursos.productos()).toContainEqual(expect.objectContaining({ IdProducto: expect.anything() }));
    });

});

describe('/dictados', () => {

    const ID_DICTADO = 51155; // Arquitectura de software en la práctica

    // Por el momento no tengo evaluaciones abiertas ni a rendir, por lo que los siguientes dos tests no se pueden ejecutar

    // test('listarConEvaluacionesAbiertas', async () => {
    //     expect(await sdk.dictados.listarConEvaluacionesAbiertas()).toContainEqual(expect.objectContaining({ Id: expect.anything(), ObjMateria: expect.anything() }));
    // });
    
    // test('listarConEvaluacionesARendir', async () => {
    //     expect(await sdk.dictados.listarConEvaluacionesARendir()).toContainEqual(expect.objectContaining({ Id: expect.anything(), ObjMateria: expect.anything() }));
    // });

    test('listarConEvaluacionesRendidas', async () => {
        expect(await gestion.dictados.listarConEvaluacionesRendidas()).toContainEqual(expect.objectContaining({ Id: expect.anything(), ObjMateria: expect.anything() }));
    });

    test('listarConMateriasActivas', async () => {
        expect(await gestion.dictados.listarConMateriasActivas()).toContainEqual(expect.objectContaining({ Id: expect.anything(), ObjMateria: expect.anything() }));
    });

    test('evaluaciones', async () => {
        expect(await gestion.dictados.evaluaciones(ID_DICTADO)).toEqual(expect.objectContaining({ ColEvaluaciones: expect.anything(), IdDictado: expect.anything() }));
    });

});

describe('/entregaDigital', () => {

    const ID_ENTREGA_DIGITAL = 113558;

    test('equipo', async () => {
        expect(await gestion.entregaDigital.equipo(ID_ENTREGA_DIGITAL)).toEqual(expect.objectContaining({ IdEquipoEvaluacion: expect.anything() }));
    });

});

describe('/examenes', () => {

    const ID_PRODUCTO = 378; // Ingeniería en Sistemas

    test('calendario', async () => {
        expect(await gestion.examenes.calendario(ID_PRODUCTO)).toContainEqual(expect.objectContaining({ IdExamen: expect.anything() }));
    });

    test('listarAbiertos', async () => {
        expect(await gestion.examenes.listarAbiertos()).toContainEqual(expect.objectContaining({ IdExamen: expect.anything() }));
    });

    // Por el momento no tengo exámenes a rendir, por lo que el siguiente test no se puede ejecutar

    // test('listarARendir', async () => {
    //     expect(await sdk.examenes.listarARendir()).toContainEqual(expect.objectContaining({ IdExamen: expect.anything() }));
    // });

    test('listarRendidos', async () => {
        expect(await gestion.examenes.listarRendidos()).toContainEqual(expect.objectContaining({ IdExamen: expect.anything() }));
    });

});

describe('/pagos', () => {

    test('carritos', async () => {
        expect(await gestion.pagos.carritos()).toEqual(expect.objectContaining({ ColCarritos: expect.anything() }));
    });

    test('movimientos', async () => {
        expect(await gestion.pagos.movimientos()).toEqual(expect.objectContaining({ Renglones: expect.anything() }));
    });

    test('saldoActual', async () => {
        expect(await gestion.pagos.saldoActual()).toEqual(expect.objectContaining({ Saldo: expect.anything() }));
    });

});

describe('/perfilAcademico', () => {

    const ID_TITULO  = 2001; // Ingeniería en Sistemas
    const ID_MATERIA = 6455; // Arquitectura de software en la práctica

    test('creditos', async () => {
        expect(await gestion.perfilAcademico.creditos()).toContainEqual(expect.objectContaining({ IdDictado: expect.anything(), IdExamen: expect.anything(), ResultadoCtaCteAcd: expect.anything() }));
    });

    test('materiasDelTitulo', async () => {
        expect(await gestion.perfilAcademico.materiasDelTitulo(ID_TITULO)).toContainEqual(expect.objectContaining({ ObjMateria: expect.anything() }));
    });

    test('previasDeMateria', async () => {
        expect(await gestion.perfilAcademico.previasDeMateria(ID_TITULO, ID_MATERIA)).toContainEqual(expect.objectContaining({ ColPreviasRequisito: expect.anything() }));
    });

    test('titulos', async () => {
        expect(await gestion.perfilAcademico.titulos()).toContainEqual(expect.objectContaining({ IdTitulo: expect.anything() }));
    });

});