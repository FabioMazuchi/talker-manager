const express = require('express');
const bodyParser = require('body-parser');
const talkerDb = require('./talkerDb');
const generateToken = require('./utils/generateToken');
const validateLogin = require('./middlewares/validateLogin');
const authToken = require('./middlewares/authToken');
const { validNameAge, validTalk, validRate } = require('./middlewares/validateTalker');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (requ, res) => {
  res.status(HTTP_OK_STATUS).send();
});

app.post('/login', validateLogin, (req, res) => {
  res.json({ token: generateToken() });
});

app.get('/talker', async (req, res) => {
  const result = await talkerDb.listAll();
  return res.json(result);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const result = await talkerDb.findById(Number(id));
  if (result) return res.json(result);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.delete('/talker/:id', authToken, async (req, res) => {
  await talkerDb.deleteTalker(req.params.id);
  return res.status(204).end();
});

app.use(authToken, validNameAge, validTalk, validRate);

app.post('/talker', async (req, res) => {
  const newTalker = await talkerDb.addTalker(req.body);
  return res.status(201).json(newTalker);
});

app.put('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await talkerDb.updateTalker(id, req.body);
  return res.json({ id: Number(id), ...req.body });
});

app.listen(PORT, () => {
  console.log('Online');
});
