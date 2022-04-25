const express = require('express');
const bodyParser = require('body-parser');
const { readFile, generatorPassword } = require('./utils');
const validEmail = require('./middlewares/validEmail.js');
const validPassword = require('./middlewares/validPassword');
const validToken = require('./middlewares/validToken');
const validTalker = require('./middlewares/validTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_requ, res) => {
  const response = await readFile();
  res.status(HTTP_OK_STATUS).json(response);
});

app.post('/talker', validToken, validTalker, (_req, _res) => {
  
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const response = await readFile();

  const filterId = response.find((r) => r.id === Number(id));
  
  if (!filterId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(filterId);
});

app.post('/login', validEmail, validPassword, (req, res) => {
  const token = generatorPassword();
  
  res.status(200).json({ token });
});

app.listen(PORT, () => {
  console.log('Online');
});
