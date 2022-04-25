const express = require('express');
const bodyParser = require('body-parser');
const readFile = require('./utils');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_request, response) => {
  const res = await readFile();
  console.log(res);
  response.status(HTTP_OK_STATUS).json(res);
});

app.listen(PORT, () => {
  console.log('Online');
});
