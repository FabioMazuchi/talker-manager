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

app.post('/login', validEmail, validPassword, (req, res) => {
  const token = generatorPassword();
  
  res.status(200).json({ token });
});

app.get('/talker', async (_requ, res) => {
  const response = await readFile();
  res.status(HTTP_OK_STATUS).json(response);
});

app.get('/talker/search', validToken, async (req, res) => {
  const { q } = req.query;

  const response = await readFile();
  if (!q) return res.status(200).json(response);

  const filter = response.filter(({ name }) => name.includes(q));

  res.status(200).json(filter);
});

app.post('/talker',
  validToken, validName, validAge, validTalk, validRate, validDate, async (req, res) => {
  const { body } = req;

  const fileContent = await readFile();

  const obj = generateObj(body, 5);
  fileContent.push(obj);

  const result = JSON.stringify(fileContent);
  await writeFile(result);
  
  res.status(201).json(obj);
});

app.put('/talker/:id',
  validToken, validName, validAge, validTalk, validRate, validDate, async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const array = [];

  const obj = generateObj(body, Number(id));

  array.push(obj);  
  
  const result = JSON.stringify(array);
  await writeFile(result);
  res.status(200).json(obj);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const response = await readFile();

  const filterId = response.find((r) => r.id === Number(id));
  
  if (!filterId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  
  res.status(200).json(filterId);
});

app.delete('/talker/:id', validToken, async (req, res) => {
  const { id } = req.params;
  const array = [];

  array.push({ id });  
  
  const result = JSON.stringify(array);
  await writeFile(result);
  
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
