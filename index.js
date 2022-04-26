const express = require('express');
const bodyParser = require('body-parser');
const { readFile, generatorPassword, generateObj, writeFile } = require('./utils');
const validEmail = require('./middlewares/validEmail.js');
const validPassword = require('./middlewares/validPassword');
const validToken = require('./middlewares/validToken');
const validName = require('./middlewares/validName');
const validAge = require('./middlewares/validAge');
const validDate = require('./middlewares/validDate');
const validRate = require('./middlewares/validRate');
const validTalk = require('./middlewares/validTalk');

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

app.post('/talker',
  validToken, validName, validAge, validTalk, validRate, validDate, async (req, res) => {
  const { body } = req;
  const array = [];
  
  const obj = generateObj(body);
  array.push(obj);
  // const file = await readFile();
  // file.push(obj);
  const result = JSON.stringify(array);
  writeFile(result);
  
  res.status(201).json(obj);
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
