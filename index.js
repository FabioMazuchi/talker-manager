const express = require('express');
const bodyParser = require('body-parser');
const talkerDb = require('./talkerDb');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (requ, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (req, res) => {
  const result = await talkerDb.listAll();
  return res.json(result);
});

app.listen(PORT, () => {
  console.log('Online');
});
