const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const GestionPool = require('./gestion-pool');

// handle process exit

process.on('SIGINT', async function() {
    console.log('deinitializating all instances...');
    await GestionPool.deinitAllInstances();
    console.log('all instances deinitialized');
    process.exit();
});

// api router
let apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    try {
        let gestion = await GestionPool.instance(req.body.username);
        let gestionToken = GestionPool.instanceToken(req.body.username);
        await gestion.login(req.body.username, req.body.password);
        res.send(gestionToken);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

apiRouter.get('/careers', async (req, res) => {
    try {
        let gestion = await GestionPool.instanceFromToken(req.header('x-gestion-api-token'));
        let body = await gestion.careers();
        res.send(body);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

apiRouter.get('/careerSubjectsGraph', async (req, res) => {
    try {
        let gestion = await GestionPool.instanceFromToken(req.header('x-gestion-api-token'));
        let body = await gestion.careerSubjectsGraph(req.query.careerId);
        res.send(body);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

// webapp router
let webappRouter = express.static(__dirname + '/../../webapp/build');

// app definition
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', apiRouter);
app.use('/webapp', webappRouter);

app.get('/', (req, res) => res.redirect('/webapp'));

app.listen(process.env.PORT || 3004, function () {
    console.log('gestion-api ready to rock!');
});