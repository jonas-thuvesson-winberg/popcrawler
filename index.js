'use strict';

import express from 'express';
import { SizeController } from './controllers/index.js';

const app = express();
const port = process.env.PORT || 3500;

app.get('/sizes', (req, res) => {
  SizeController.getSizesAvailable(req, res);
});

app.listen(port);

console.log('Node application running on port ' + port);
