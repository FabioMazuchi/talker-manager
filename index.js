const express = require('express');
const bodyParser = require('body-parser');
const talkerDb = require('./talkerDb');
const generateToken = require('./generateToken');
const validateLogin = require('./validateLogin');

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

app.listen(PORT, () => {
  console.log('Online');
});
