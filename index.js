'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const membreRoutes = require('./routes/membre-routes');
const machineRoutes = require('./routes/machine-routes');
const panneRoutes = require('./routes/panne-routes');
const stepRoutes = require('./routes/step-routes');
const tacheRoutes = require('./routes/tache-routes');
const journee = require('./routes/journee-routes');
const qrqc = require('./routes/qrqc-routes');
const alerte = require('./routes/alerte-routes');
const piece = require('./routes/piece-routes');
const form = require('./routes/Form-routes');
const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/api',journee.routes);
app.use('/api',alerte.routes);
app.use('/api',form.routes);
app.use('/api',qrqc.routes);
app.use('/api',piece.routes);
app.use('/api', membreRoutes.routes);
app.use('/api',machineRoutes.routes);
app.use('/api',panneRoutes.routes);
app.use('/api',stepRoutes.routes);
app.use('/api',tacheRoutes.routes);



app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));