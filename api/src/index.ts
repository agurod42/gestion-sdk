import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import EnmelonPool from './enmelon-pool';

// handle process exit

process.on('SIGINT', async function() {
    console.log('deinitializating all instances...');
    await EnmelonPool.deinitAllInstances();
    console.log('all instances deinitialized');
    process.exit();
});

// api router
let apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    try {
        let enmelon = await EnmelonPool.instance(req.body.username);
        let enmelonToken = EnmelonPool.instanceToken(req.body.username);
        await enmelon.login(req.body.username, req.body.password);
        res.send(enmelonToken);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

apiRouter.get('/careers', async (req, res) => {
    try {
        let enmelon = await EnmelonPool.instanceFromToken(req.header('x-gestion-enmelon-token'));
        let body = await enmelon.careers();
        res.send(body);
    }
    catch (err) {
        res.status(400).send(err.message);
    }
});

apiRouter.get('/careerSubjectsGraph', async (req, res) => {
    try {
        let enmelon = await EnmelonPool.instanceFromToken(req.header('x-gestion-enmelon-token'));
        let body = await enmelon.careerSubjectsGraph(req.query.careerId);
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

app.listen(process.env.PORT || 3004, function () {
    console.log('gestion-enmelon ready to rock!');
});